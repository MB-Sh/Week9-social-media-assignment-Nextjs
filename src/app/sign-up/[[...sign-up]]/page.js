import { SignUp } from "@clerk/nextjs"; 
import { db } from "@/utils/dbConnection"; 
import { auth } from "@clerk/nextjs/server";

// This function handles the user sign-up on the server
async function handleUserSignUp() {
  const { userId } = await auth(); // Get the userId from Clerk

  if (userId) {
    try {
      // Check if the user exists in the users table
      const userExists = await db.query(
        `SELECT * FROM users WHERE clerk_id = $1`,
        [userId]
      );

      // If the user does not exist, insert a new row
      if (userExists.rowCount === 0) {
        await db.query(
          `INSERT INTO users (clerk_id, username, profile_image_url, bio)
           VALUES ($1, $2, $3, $4)`,
          [userId, 'NewUser', 'https://example.com/default-profile.jpg', 'New user bio'] // Default values
        );
        console.log("New user inserted into the database.");
      } else {
        console.log("User already exists in the database.");
      }

    } catch (error) {
      console.error("Error inserting user into the database:", error);
    }
  }
}

export default async function SignUpPage() {
  // Handle the server-side user sign-up logic
  await handleUserSignUp();

  return (
    <>
      <h1>Sign-up to access this page</h1>
      {/* Render the Clerk SignUp component with afterSignUpUrl to redirect */}
      <SignUp forceRedirectUrl="/create-profile" />
    </>
  );
}
