
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/dbConnection";
// import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ErrorPage from "@/components/ErrorPage";


export default async function UserProfilePage() {
  // Authenticate and fetch current user data
  const { userId } = await auth();
  const user = await currentUser();

  // Fetch additional user information from the database
  const { rows } = await db.query(
    `SELECT * FROM users WHERE clerk_id = $1`,
    [userId]
  );
  const userProfile = rows[0];

  // send an error if user profile does not exist

  if (!userProfile) {
    return <ErrorPage errorMessage="User profile not found" />;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <div className="user-profile">
        <Image
          src={userProfile.profile_image_url || "/default-profile.png"}
          alt="Profile"
          width={150}
          height={150}
        />
        <h2>Welcome, {user?.firstName} {user?.lastName}</h2>
        <p>Email: {user?.emailAddresses[0]?.emailAddress}</p>

        <h3>Bio</h3>
        <p>{userProfile.bio}</p>

        {/* To edit user bio */}
        <Link href="/profile/edit">
        <button className="bg-blue-500 text-white px-6 py-2 rounded-md
         hover:bg-blue-600 transition duration-200 mt-4">
            Edit Bio </button>
        </Link>
      </div>
    </div>
  );
}
