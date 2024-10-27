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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-purple-200 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Create Your Profile</h1>
      <form action={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Enter your username"
          required
          className="border border-gray-300 rounded-md p-2 mb-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label htmlFor="profile_image_url" className="block text-sm font-medium text-gray-700 mb-2">Profile Image URL:</label>
        <input
          type="text"
          name="profile_image_url"
          id="profile_image_url"
          placeholder="Paste your profile image URL"
          className="border border-gray-300 rounded-md p-2 mb-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">Biography:</label>
        <textarea
          name="bio"
          id="bio"
          placeholder="Tell us about yourself"
          className="border border-gray-300 rounded-md p-2 mb-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>

        <button
          type="submit"
          className="border-4 border-blue-400 bg-white-400 text-rose-400 font-semibold p-2 rounded-md hover:bg-blue-400 hover:text-white transition duration-300"
        >
          Submit Profile
        </button>
      </form>
    </div>
  );
}
