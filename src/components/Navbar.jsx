import Link from "next/link";
import {
  UserButton,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/dbConnection"; 

export default async function Navbar() {
  const { userId } = auth();
  let hasProfile = false;

  if (userId) {
    
    const profile = await db.query(
      `SELECT * FROM user WHERE clerk_id = $1`,
      [userId]
    );
    hasProfile = profile.rows.length > 0;
  }

  const links = [
    { name: "Home", href: "/" },
    { name: "Our-story", href: "/our-story" },
  
  ];

  return (
    <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4 sticky top-0 z-50 shadow-lg text-white flex justify-between items-center">
      
      <div className="flex gap-5">
        {links.map((link, index) => (
          <div key={index} className="transform transition-transform hover:scale-110 active:scale-95">
            <Link href={link.href} className="hover:text-yellow-300 transition-colors">
              {link.name}
            </Link>
          </div>
        ))}

        
        <SignedIn>
          <div className="transform transition-transform hover:scale-110 active:scale-95">
            <Link
              href={hasProfile ? "/Post" : "/create-profile"}
              className="hover:text-yellow-300 transition-colors"
            >
              Post
            </Link>
          </div>
        </SignedIn>
      </div>

     
      <div className="text-blue-800 flex items-center space-x-4">
        <h1 className="text-white">{userId ? `Hello, ${userId}` : " Welcome!"}</h1>
      
        
        <SignedIn>
          <UserButton />
        </SignedIn>
        
        <SignedOut>
          <SignInButton mode="modal">Sign-In</SignInButton>
          <SignUpButton mode="modal">Register</SignUpButton>
        </SignedOut>
      </div>
    </div>
  );
}
