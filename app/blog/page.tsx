import React from 'react';
import { createClient, Entry, EntrySkeletonType } from 'contentful';
import Link from 'next/link';
import type { JSX } from 'react';

export const revalidate = 60;

// Extend Contentful's EntrySkeletonType properly
interface BlogPostSkeleton extends EntrySkeletonType {
  contentTypeId: 'pageBlogPost';
  fields: {
    title: string;
    slug: string;
    excerpt: string;
  };
}

export type BlogPost = Entry<BlogPostSkeleton>;

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export default async function BlogPage(): Promise<JSX.Element> {
  const entries = await client.getEntries<BlogPostSkeleton>({
    content_type: 'pageBlogPost',
  } as Record<string, any>);

  const posts = entries.items.map((rawPost) => ({
    ...rawPost,
    sys: rawPost.sys,
  })) as BlogPost[];

  return (
    <section className="p-8 min-h-[80vh]">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.sys.id}
            className="bg-white p-4 rounded shadow hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">
              {String(post.fields?.title ?? 'Untitled Post')} {/* ✅ Fix ReactNode */}
            </h2>
            <p className="text-gray-600 mb-4">
              {String(post.fields?.excerpt ?? 'No excerpt available')} {/* ✅ Fix ReactNode */}
            </p>
            <Link
              href={`/blog/${post.fields?.slug ?? '#'}`} // ✅ Avoid undefined URLs
              className="inline-block px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800"
            >
              Read More
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
