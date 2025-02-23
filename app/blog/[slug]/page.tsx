import React, { JSX } from 'react'; // ✅ Remove duplicate JSX import
import { notFound } from 'next/navigation';
import { createClient, Entry, EntrySkeletonType } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import type { Document } from '@contentful/rich-text-types';
import { BLOCKS } from '@contentful/rich-text-types';

// ✅ Define BlogPostSkeleton properly
interface BlogPostSkeleton extends EntrySkeletonType {
  contentTypeId: 'pageBlogPost';
  fields: {
    title: string;
    slug: string;
    content?: Document | null;
  };
}

export type BlogPost = Entry<BlogPostSkeleton>;

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const entries = await client.getEntries<BlogPostSkeleton>({
    content_type: 'pageBlogPost',
    'fields.slug': slug,
  });

  return entries.items.length > 0 ? entries.items[0] : null;
}

export const revalidate = 60;

interface BlogPageProps {
  params: { slug: string };
}

export default async function BlogPostPage({ params }: BlogPageProps): Promise<JSX.Element> {
  const post = await getBlogPost(params.slug);
  if (!post) {
    notFound();
  }

  // ✅ Correct empty document initialization
  const emptyDocument: Document = {
    nodeType: BLOCKS.DOCUMENT,
    data: {},
    content: [],
  };

  const validDocument: Document = post.fields.content ?? emptyDocument;

  return (
    <article className="p-8">
      <h1 className="text-3xl font-bold mb-4">
        {post.fields?.title ?? 'Untitled Post'}
      </h1>
      <div className="text-lg text-gray-700">
        {documentToReactComponents(validDocument)}
      </div>
    </article>
  );
}

// ✅ Ensure Next.js generates correct static paths
export async function generateStaticParams() {
  const entries = await client.getEntries<BlogPostSkeleton>({
    content_type: 'pageBlogPost',
  });

  return entries.items.map((post) => ({ slug: post.fields.slug }));
}
