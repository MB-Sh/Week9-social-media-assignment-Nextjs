// app/create-profile/page.js

"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { handleSubmit } from "@/app/create-profile/action"; 

export default function CreateProfilePage() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/sign-in");
    }
  }, [isSignedIn, router]);

  if (!isSignedIn) return null;

  return (
    <>
      <h1>Create Your Profile</h1>
      <form action={handleSubmit} className="flex flex-col items-center">
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        name="username"
        id="username"
        placeholder="Enter your username"
        required
        className="text-orange-600"
      />

      <label htmlFor="profile_image_url">Profile Image URL:</label>
      <input
        type="text"
        name="profile_image_url"
        id="profile_image_url"
        placeholder="Paste your profile image URL"
        className="text-orange-600"
      />

      <label htmlFor="bio">Biography:</label>
      <textarea
        name="bio"
        id="bio"
        placeholder="Tell us about yourself"
        className="text-orange-600"
      ></textarea>

      <button
        type="submit"
        className="border-rose-400 border-4 bg-yellow-400 text-rose-400 p-2 m-4"
      >
        Submit Profile
      </button>
    </form>
    </>
  );
}