import React from 'react';
import { createClient } from 'contentful';
import Link from 'next/link';

export const revalidate = 60;

interface BlogPostFields {
  title: string;
  slug: string;
  excerpt: string;
}

/**
 * Defines a blog post as returned in the blog index.
 * The sys object includes a nested contentType property.
 */
interface BlogPost {
  sys: {
    id: string;
    contentType: { sys: { id: string } };
  };
  fields: BlogPostFields;
}

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export default async function BlogPage(): Promise<JSX.Element> {
  const entries = await client.getEntries<BlogPostFields>({
    content_type: 'pageBlogPost',
  });
  const posts = entries.items as BlogPost[];

  return (
    <section className="p-8 min-h-[80vh]">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.sys.id}
            className="bg-white p-4 rounded shadow hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{post.fields.title}</h2>
            <p className="text-gray-600 mb-4">{post.fields.excerpt}</p>
            <Link
              href={`/blog/${post.fields.slug}`}
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
