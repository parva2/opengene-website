import React from 'react';
import { notFound } from 'next/navigation';
import { createClient, Entry, EntrySkeletonType } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import type { Document } from '@contentful/rich-text-types';
import { BLOCKS } from '@contentful/rich-text-types'; // ✅ Import BLOCKS for Contentful types
import type { JSX } from 'react';

// Define BlogPostSkeleton properly
interface BlogPostSkeleton extends EntrySkeletonType {
  contentTypeId: 'pageBlogPost';
  fields: {
    title: string;
    slug: string;
    content?: Document | null; // ✅ Allow optional content
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
    ...(slug ? { 'fields.slug': slug } : {}), // ✅ Fixed query syntax
  } as Record<string, any>);

  if (entries.items.length === 0) return null;

  return entries.items[0];
}

export const revalidate = 60;

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}): Promise<JSX.Element> {
  const post = await getBlogPost(params.slug);
  if (!post) {
    notFound();
  }

  // ✅ Define an empty document fallback
  const emptyDocument: Document = {
    nodeType: BLOCKS.DOCUMENT,
    data: {},
    content: [],
  };

  // ✅ Ensure valid `Document` before rendering
  const validDocument: Document =
    post.fields?.content && typeof post.fields.content === 'object' && 'nodeType' in post.fields.content
      ? (post.fields.content as unknown as Document)
      : emptyDocument;

  return (
    <article className="p-8">
      <h1 className="text-3xl font-bold mb-4">
        {String(post.fields?.title ?? 'Untitled Post')}
      </h1>
      <div className="text-lg text-gray-700">
        {documentToReactComponents(validDocument)}
      </div>
    </article>
  );
}
