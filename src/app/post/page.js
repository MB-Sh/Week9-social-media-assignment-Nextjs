import { auth } from '@clerk/nextjs/server';
import { db } from '@/utils/dbConnection';
import { unstable_cache } from 'next/cache';
import Link from 'next/link';
import Image from 'next/image';
import { SignIn } from "@clerk/nextjs";
import { redirect } from 'next/navigation';

export default async function PostPage() {
    const { userId } =await auth();
  
    const userProfile = await db.query('SELECT * FROM users WHERE clerk_id = $1', [userId]);
    const posts = await db.query(
      `SELECT post.*, users.username, users.profile_image_url 
       FROM post 
       JOIN users ON post.up_clerk_id = users.clerk_id 
       ORDER BY post.created_at DESC`
    );
  
    if (userProfile.rows.length === 0) return redirect('/create-profile');
  
    return (
      <div>
        <div className="user-profile">
          <Image src={userProfile.rows[0].profile_image_url} alt="Profile" width={150} height={150} />
          <h1>{userProfile.rows[0].username}</h1>
          <p>{userProfile.rows[0].bio}</p>
        </div>
        <div className="posts-list">
          <h2>All Posts</h2>
          {posts.rows.map((post) => (
            <div key={post.id} className="post">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <p>by {post.username}</p>
            </div>
          ))}
          <form method="POST" action="/api/add-post">
            <input name="title" placeholder="Post Title" required />
            <textarea name="content" placeholder="Post Content" required />
            <button type="submit">Add Post</button>
          </form>
        </div>
      </div>
    );
  }