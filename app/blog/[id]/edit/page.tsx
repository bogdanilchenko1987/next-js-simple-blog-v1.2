import { getPostsById } from "@/services/getPosts";
import { Metadata } from "next";
import { updatePost } from "../../actions";
import Link from "next/link";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = await getPostsById(id);

  return {
    title: `Profile of: ${post.title}`,
  };
}

export default async function Profile({ params }: Props) {
  const { id } = await params;
  const post = await getPostsById(id);

  return (
    <div>
      <h2>
        Profile of: <i>{post.title}</i>
      </h2>
      <Link href={`/blog/${post.id}`}>Back to post</Link>
      <br />
      <br />

      <form className="form" action={updatePost}>
        <input
          type="text"
          placeholder="title"
          required
          name="title"
          defaultValue={post.title}
        />
        <textarea
          placeholder="content"
          required
          name="body"
          defaultValue={post.body}
          rows={5}
          cols={5}
        />
        <input type="hidden" name="id" value={post.id} />
        <div>
          <input type="submit" value="Update post" />
        </div>
      </form>
    </div>
  );
}
