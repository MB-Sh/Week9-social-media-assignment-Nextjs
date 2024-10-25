import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/dbConnection";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from 'next/navigation'; 
import Image from "next/image";

export default async function UserPage() {
  const { userId } = auth(); 
  const user = await currentUser(); 

 
  const userInfo = await db.query(`SELECT * FROM users WHERE clerk_id = $1`, [userId]);

  // Check if userInfo exists
  if (!userInfo.rows.length) {
    // Redirect to error page if the user is not found
    redirect('/error'); 
  }

  const profile = userInfo.rows[0];

  // Optional chaining to handle missing data
  return (
    <div className="bg-gray-100 min-h-screen py-10 px-6">
      <h1 className="text-4xl font-bold mb-4">User Profile</h1>
      <h2 className="text-2xl">Welcome, {profile.username}!</h2>
      <p className="text-lg">Email: {user?.emailAddresses[0]?.email}</p>
      <p className="text-lg">Bio: {profile.bio}</p>
      {profile.profile_image_url && (
        <Image
          src={profile.profile_image_url}
          alt={`${profile.username}'s profile`}
          width={100}
          height={100}
          className="rounded-full"
        />
      )}
      {/* Render posts associated with the user */}
      <h3 className="text-xl mt-6">Your Posts</h3>
      <ul>
        {/* Fetch and display user's posts */}
        {/* Replace with actual posts fetching logic */}
        <li>No posts yet.</li>
      </ul>
    </div>
  );
}
