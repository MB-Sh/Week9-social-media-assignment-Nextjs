// app/create-profile/page.js

"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ProfileForm from "./ProfileForm";

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
      <ProfileForm />
    </>
  );
}
