/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { notFound } from 'next/navigation';
import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import type { Document } from '@contentful/rich-text-types';

interface BlogPostFields {
  title: string;
  slug: string;
  content: Document;
}

/**
 * This interface reflects the Contentful response.
 * Instead of a standalone "contentTypeId", Contentful returns a nested contentType object.
 */
interface BlogPost {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    revision: number;
    contentType: { sys: { id: string } };
  };
  fields: BlogPostFields;
}

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const entries = await client.getEntries<BlogPostFields>({
    content_type: 'pageBlogPost',
    'fields.slug': slug,
  });
  if (entries.items.length === 0) return null;
  return entries.items[0] as BlogPost;
}

export const revalidate = 60;

/**
 * Due to a known mismatch in Next.js's dynamic route types,
 * we annotate the props as `any` here. This is a temporary workaround.
 */
export default async function BlogPostPage(props: any): Promise<JSX.Element> {
  const { slug } = props.params as { slug: string };
  if (typeof slug !== 'string') {
    notFound();
  }
  const post = await getBlogPost(slug);
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
