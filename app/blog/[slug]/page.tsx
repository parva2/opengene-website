import React from "react";
import { notFound } from "next/navigation";
import { createClient, Entry, EntrySkeletonType } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { Document } from "@contentful/rich-text-types";
import { BLOCKS } from "@contentful/rich-text-types";

// ✅ Import React Types
import type { FC } from "react";

interface BlogPostSkeleton extends EntrySkeletonType {
  contentTypeId: "pageBlogPost";
  fields: {
    title?: string; // ✅ Made optional to prevent runtime errors
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
    content_type: "pageBlogPost",
    "fields.slug": slug, // ✅ Fixed query issue
  } as Record<string, any>);

  return entries.items.length > 0 ? entries.items[0] : null;
}

export const revalidate = 60;

// ✅ Define expected props structure correctly for Next.js
interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

// ✅ Fix params issue by explicitly typing it as a Promise
const BlogPostPage: FC<BlogPageProps> = async ({ params }) => {
  const resolvedParams = await params; // ✅ Ensure params is awaited properly

  const post = await getBlogPost(resolvedParams.slug);
  if (!post) {
    notFound();
  }

  // ✅ Define an empty document fallback
  const emptyDocument: Document = {
    nodeType: BLOCKS.DOCUMENT,
    data: {},
    content: [],
  };

  // ✅ Ensure valid `Document` for `documentToReactComponents`
  const validDocument: Document =
    post.fields?.content && typeof post.fields.content === "object" && "nodeType" in post.fields.content
      ? (post.fields.content as unknown as Document) // ✅ Convert to `unknown` first, then `Document`
      : emptyDocument;

  return (
    <article className="p-8">
      <h1 className="text-3xl font-bold mb-4">
        {post.fields?.title ? String(post.fields.title) : "Untitled Post"}
      </h1>
      <div className="text-lg text-gray-700">
        {documentToReactComponents(validDocument)}
      </div>
    </article>
  );
};

export default BlogPostPage;

// ✅ Required for Next.js App Router to correctly handle dynamic paths
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const entries = await client.getEntries<BlogPostSkeleton>({
    content_type: "pageBlogPost",
  } as Record<string, any>);

  return entries.items.map((post) => ({ slug: post.fields.slug }));
}
