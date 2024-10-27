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
    { name: "Our Story", href: "/our-story" },
  ];

  return (
    <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4 sticky top-0 z-50 shadow-lg text-white flex justify-between items-center">
     
      <div className="flex gap-5">
        {links.map((link) => (
          <div key={link.name} className="transform transition-transform hover:scale-110 active:scale-95">
            <Link href={link.href} className="hover:text-yellow-300 transition-colors font-semibold">
              {link.name}
            </Link>
          </div>
        ))}
        
        <SignedIn>
          <div className="flex gap-5">
            {hasProfile ? (
              <>
                <Link href="/post" className="hover:text-yellow-300 transition-colors font-semibold">
                  Post
                </Link>
                <Link href={`/users/${userId}`} className="hover:text-yellow-300 transition-colors font-semibold">
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link href="/create-profile" className="hover:text-yellow-300 transition-colors font-semibold">
                  Create Profile
                </Link>
                <Link href="/post" className="hover:text-yellow-300 transition-colors font-semibold">
                  Post
                </Link>
                <Link href={`/profile`} className="hover:text-yellow-300 transition-colors font-semibold">
                  Profile
                </Link>
              </>
            )}
          </div>
        </SignedIn>
      </div>

      
      <div className="flex items-center space-x-4">
        <h1 className="text-white font-medium">{userId ? `Hello, ${userId}` : "Welcome!"}</h1>
        
        <SignedIn>
          <UserButton className="bg-white text-blue-500 rounded-full hover:bg-gray-200 transition-colors" />
        </SignedIn>
        
        <SignedOut>
          <div className="flex space-x-4">
            <SignInButton mode="modal" className="bg-white text-blue-500 rounded-md px-4 py-2 hover:bg-gray-200 transition-colors">
              Sign In
            </SignInButton>
            <SignUpButton mode="modal" className="bg-white text-blue-500 rounded-md px-4 py-2 hover:bg-gray-200 transition-colors">
              Register
            </SignUpButton>
          </div>
        </SignedOut>
      </div>
    </div>
  );
}
