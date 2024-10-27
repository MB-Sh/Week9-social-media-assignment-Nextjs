
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { revalidatePath } from "next/cache"; 
import { useAuth } from "@clerk/nextjs";

export default function AddPostForm() {
  const router = useRouter();
  const { userId } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting post:", { title, content });

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    const response = await fetch(`/api/post/${userId}`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      setTitle("");
      setContent("");
      
      router.push(`/post`); 
      revalidatePath(`/post`); 
     
    } else {
      alert("Failed to add post");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <input
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post Title"
        required
        className="border-2 border-gray-300 rounded-md p-3 w-full text-gray-800"
      />
      <textarea
        name="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Post Content"
        required
        className="border-2 border-gray-300 rounded-md p-3 w-full text-gray-800 resize-none"
        rows="4"
      ></textarea>
      <button
        type="submit"
        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-200"
      >
        Add Post
      </button>
    </form>
  );
}
