import React from 'react';
import { notFound } from 'next/navigation';
import { createClient, Entry } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import type { Document } from '@contentful/rich-text-types';

interface BlogPostFields {
  title: string;
  slug: string;
  content: Document;
}

// Define BlogPost as the Contentful Entry for BlogPostFields,
// and add a property "contentTypeId" to the sys object.
export type BlogPost = Entry<BlogPostFields> & {
  sys: Entry<BlogPostFields>['sys'] & { contentTypeId: string };
};

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
  
  // Extract the raw post and add a "contentTypeId" property by reading sys.contentType.sys.id.
  const rawPost = entries.items[0] as Entry<BlogPostFields>;
  const post: BlogPost = {
    ...rawPost,
    sys: {
      ...rawPost.sys,
      contentTypeId: (rawPost.sys.contentType as { sys: { id: string } }).sys.id,
    },
  };
  return post;
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
  return (
    <article className="p-8">
      <h1 className="text-3xl font-bold mb-4">{post.fields.title}</h1>
      <div className="text-lg text-gray-700">
        {documentToReactComponents(post.fields.content)}
      </div>
    </article>
  );
}
