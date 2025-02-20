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

interface BlogPost {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    revision: number;
    // Contentful returns the content type as a nested object.
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

/*
  Next.js sometimes expects the props in dynamic routes to be a Promise.
  Since Next.js actually passes { params: { slug: string } }, we force a type conversion.
*/
export default async function BlogPostPage(
  props: { params: { slug: string } }
): Promise<JSX.Element> {
  // Coerce the incoming props to the expected type
  const { params } = props as unknown as { params: Promise<{ slug: string }> };
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
