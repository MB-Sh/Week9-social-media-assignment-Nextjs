import Link from 'next/link'; 
import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/dbConnection";
import AddPostForm from "@/components/AddPostForm";
import Image from "next/image";
import { redirect } from "next/navigation";
import PostSelect from '@/components/PostSelect';

export default async function PostPage() {
  const { userId } = await auth();

  const userProfile = await db.query("SELECT * FROM users WHERE clerk_id = $1", [userId]);
  const posts = await db.query(
    `SELECT post.*, users.username, users.profile_image_url 
     FROM post 
     JOIN users ON post.up_clerk_id = users.clerk_id 
     ORDER BY post.created_at DESC`
  );

  if (userProfile.rows.length === 0) return redirect("/create-profile");

  return (
    <div className="max-w-3xl mx-auto p-6">
    
      <div className="flex flex-col items-center bg-grey shadow-lg rounded-lg p-6 mb-6">
        <Image
          src={userProfile.rows[0].profile_image_url || "/default-avatar.png"}
          alt="Profile"
          width={150}
          height={150}
          className="rounded-full border-2 border-gray-300 mb-4"
        />
        <h1 className="text-2xl font-semibold text-gray-800">{userProfile.rows[0].username}</h1>
        <p className="text-gray-600 text-center mt-2">{userProfile.rows[0].bio}</p>
      </div>

      <div className="posts-list bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">All Posts</h2>

        <PostSelect posts={posts.rows} />

        {posts.rows.map((post) => (
          <div key={post.id} className="post bg-gray-50 p-4 rounded-lg mb-4 hover:shadow-md transition-shadow duration-200">
            <h3 className="text-lg font-semibold text-blue-600">
              <Link href={`/post/${post.id}`} className="hover:underline">
                {post.title}
              </Link> 
            </h3>
            <p className="text-gray-700 mt-2">{post.content}</p>
            <p className="text-sm text-gray-500 mt-2">by {post.username}</p>
          </div>
        ))}

        <AddPostForm /> 
      </div>
    </div>
  );
}
