
"use server";

import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";



import { auth, currentUser } from '@clerk/nextjs/server'

export default async function Page() {
  // Get the userId from auth() 
  const { userId } = await auth()

  console.log(userId)

  const user = await currentUser()
  // Use `user` to render user details 
}

export async function handleSubmit(formData) {
  const { userId } = await auth(); 

  console.log(userId)
  
  console.log("Retrieved User ID:", userId);

  if (!userId) {
    console.log("User ID is not available. Ensure the user is authenticated.")
    redirect("/sign-in");
    return;
  }

  const username = formData.get("username");
  const profileImageUrl = formData.get("profile_image_url");
  const bio = formData.get("bio");

  try {
    // Insert data into the database
    console.log(userId,username)
    await db.query(
      `INSERT INTO users (clerk_id, username, profile_image_url, bio)
       VALUES ($1, $2, $3, $4)`,
      [userId, username, profileImageUrl, bio]
    );

    
    revalidatePath(`/post`);
     redirect(`/post`);
    // revalidatePath (`/post/${userId}`);
    // redirect (`/post/${userId}`);

    // redirect("/");
  } catch (error) {
    console.error("Error inserting profile data:", error);
  }
}