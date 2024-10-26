// app/create-profile/actions.js

"use server";

import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// import { auth } from "@clerk/nextjs/server";


import { auth, currentUser } from '@clerk/nextjs/server'

export default async function Page() {
  // Get the userId from auth() -- if null, the user is not signed in
  const { userId } = await auth()

  console.log(userId)

  // Get the Backend API User object when you need access to the user's information
  const user = await currentUser()
  // Use `user` to render user details or create UI elements
}

export async function handleSubmit(formData) {
  const { userId } = await auth(); // Fetch user ID from Clerk

  console.log(userId)
  // Log the userId to verify it’s being retrieved
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

    // Revalidate the path and redirect
    revalidatePath(`/profile/${userId}`);
    redirect("/");
  } catch (error) {
    console.error("Error inserting profile data:", error);
  }
}