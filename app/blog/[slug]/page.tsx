import { notFound } from 'next/navigation';
import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
/* eslint-disable react/no-unescaped-entities */

interface RichTextDocument {
  nodeType: string;
  data: any;
  content: any[];
}

interface BlogPostFields {
  title: string;
  slug: string;
  content: RichTextDocument;
}

interface BlogPost {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    revision: number;
  };
  fields: BlogPostFields;
}

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const entries = (await client.getEntries({
    content_type: 'pageBlogPost',
    'fields.slug': slug,
  })) as { items: BlogPost[] };

  if (entries.items.length === 0) return null;
  return entries.items[0];
}

export const revalidate = 60;

// Define props as a plain object and then wrap it with Promise.resolve to satisfy the expected type.
export default async function BlogPostPage({ params }: { params: { slug: string } }): Promise<JSX.Element> {
  const resolvedParams = await Promise.resolve(params);
  const post = await getBlogPost(resolvedParams.slug);
  if (!post) {
    notFound();
  }
  return (
    <article className="p-8">
      <h1 className="text-3xl font-bold mb-4">{post.fields.title}</h1>
      <div className="text-lg text-gray-700">
        {documentToReactComponents(post.fields.content)}
      </div>
    </article>
  );
}
