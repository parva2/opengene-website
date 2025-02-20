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
 * Contentful returns sys as an object that includes a nested contentType object.
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

/**
 * Define the props type as a union so that params may be either a plain object or a Promise.
 */
type PageProps = { params: { slug: string } } | { params: Promise<{ slug: string }> };

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

export default async function BlogPostPage({ params }: PageProps): Promise<JSX.Element> {
  // Resolve params whether it's a plain object or a Promise
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
