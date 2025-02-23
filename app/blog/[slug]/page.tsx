/* import { notFound } from 'next/navigation';
import { createClient, Entry } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import type { Document } from '@contentful/rich-text-types';

interface BlogPostFields {
  title: string;
  slug: string;
  content: Document;
  excerpt: string;
}

export type BlogPost = Entry<BlogPostFields> & {
  sys: {
    id: string;
    type: string;
    contentType: {
      sys: {
        id: string;
        linkType: string;
        type: string;
      };
    };
    contentTypeId: string;
  };
};

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

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPostPage({
  params,
}: BlogPostPageProps): Promise<JSX.Element> {
  const post = await getBlogPost(params.slug);
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
*/