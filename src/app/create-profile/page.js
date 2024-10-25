//!You can nest this route in any other route, if you want. The user should only see this route after being redirected from the sign-up page
//The sign-up page needs the following elements:
//connection with db
//auth() and userId
//a form to collect the user's profile data
//sql query to insert the user's data into the database
//we need to redirect the user to the homepage once they submit the profile form
//A suggestion: you could have a try and catch for your sql query
// export default function createProfilePage() {
//     return (
//       <>
//         <h1>Create Profile Page</h1>
//       </>
//     );
//   }


import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache"; 
import { redirect } from "next/navigation"; 
import { auth } from "@clerk/nextjs/server";

export default function CreateProfilePage() {
  // Handle form submission to the database
  async function handleSubmit(formValues) {
    "use server"; // Use server actions in Next.js

    // Extract current userId from Clerk
    const { userId } = auth();

    
    const formData = {
      username: formValues.get("username"),
      profile_image_url: formValues.get("profile_image_url"),
      bio: formValues.get("bio"),
    };

    console.log(formData); 

    // Insert the user profile data into the "user" table in the database
    await db.query(
      `INSERT INTO user (clerk_id, username, profile_image_url, bio)
       VALUES ($1, $2, $3, $4)`,
      [userId, formData.username, formData.profile_image_url, formData.bio]
    );

    // Revalidate the profile path (optional)
    revalidatePath(`/profile/${userId}`);

    // Redirect to the homepage after submission
    redirect("/");
  }

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
