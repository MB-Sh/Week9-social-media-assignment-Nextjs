
import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/dbConnection";
import Image from "next/image";
import { redirect } from "next/navigation";
import BackButton from "@/components/BackButton";
import ErrorPage from "@/components/ErrorPage";

export default async function PostIdPage({ params }) {
  const { userId } = await auth(); 
  const postId = await params.id; 

  // Query to fetch post details by ID
  const post = await db.query(
    `SELECT post.*, users.username, users.profile_image_url 
     FROM post 
     JOIN users ON post.up_clerk_id = users.clerk_id 
     WHERE post.id = $1`, [postId]
  );

  const postData = post.rows[0];

  
  if (!postData) {
    return <ErrorPage/>
  }

  const userProfile = await db.query(
    `SELECT * FROM users WHERE clerk_id = $1`, [postData.up_clerk_id]
  );

  if (userProfile.rows.length === 0) return redirect("/create-profile");

  return (
    <div>
      <div className="user-profile">
        <Image
          src={userProfile.rows[0].profile_image_url}
          alt="Profile"
          width={150}
          height={150}
        />
        <h1>{userProfile.rows[0].username}</h1>
        <p>{userProfile.rows[0].bio}</p>
      </div>

      <div className="post-detail">
        <h2>{postData.title}</h2>
        <p>{postData.content}</p>
        <p>Posted by: {postData.username}</p>
      </div>
      <BackButton/>
    </div>
  );
}
