import { notFound } from 'next/navigation';
import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
/* eslint-disable react/no-unescaped-entities */

interface RichTextDocument {
  nodeType: string;
  data: any;
  content: any[];
}

interface BlogPost {
  sys: { id: string };
  fields: {
    title: string;
    slug: string;
    content: RichTextDocument;
  };
}

// Allow params to be either a plain object or a Promise that resolves to one.
interface PageProps {
  params: { slug: string } | Promise<{ slug: string }>;
}

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const entries = await client.getEntries<BlogPost>({
    content_type: 'pageBlogPost',
    'fields.slug': slug,
  });
  if (entries.items.length === 0) return null;
  return entries.items[0];
}

export const revalidate = 60;

export default async function BlogPostPage({ params }: PageProps): Promise<JSX.Element> {
  // Await params in case it's a promise; if it's a plain object, this resolves immediately.
  const resolvedParams = await params;
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
