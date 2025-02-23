/* import React from 'react';
import { createClient, Entry } from 'contentful';
import Link from 'next/link';

export const revalidate = 60;

interface BlogPostFields {
  title: string;
  slug: string;
  excerpt: string;
}

// Our BlogPost type is based on Contentful's Entry type for BlogPostFields.
// Note that Contentful's sys object includes a nested contentType property.
// We later "add" a contentTypeId property extracted from sys.contentType.sys.id.
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
    contentTypeId: string; // Ensure contentTypeId is included
  };
};

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export default async function BlogPage(): Promise<JSX.Element> {
  // Pass the full BlogPost type as generic so that the returned items have sys and fields.
  const entries = await client.getEntries<BlogPost>({
    content_type: 'pageBlogPost',
  });
  // Map over the returned items to add contentTypeId
  const posts = entries.items.map((rawPost) => ({
    ...rawPost,
    sys: {
      ...rawPost.sys,
      contentTypeId: (rawPost.sys.contentType as { sys: { id: string } }).sys.id,
    },
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
*/