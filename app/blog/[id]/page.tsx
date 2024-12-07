import { getPostsById } from "@/services/getPosts";
import { Metadata } from "next";
import Link from "next/link";
import { deletePost } from "../actions";

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = await getPostsById(id);

  return {
    title: post.title,
  };
}

export default async function Post({ params }: Props) {
  const { id } = await params;
  const post = await getPostsById(id);

  return (
    <>
      <Link href={`/blog`}>Back to blog</Link>
      <br />
      <br />
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <form action={deletePost.bind(null, id)}>
        <input type="submit" value="delete post" />
      </form>
      <b>
        <Link href={`/blog/${post.id}/edit`}>Edit post</Link>
      </b>
    </>
  );
}
