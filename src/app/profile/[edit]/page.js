// app/profile/edit/page.js
import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function EditBioPage() {
  const { userId } = await auth();

  // Fetch current bio from the database
  const { rows } = await db.query(
    `SELECT bio FROM users WHERE clerk_id = $1`,
    [userId]
  );
  const userBio = rows[0]?.bio;


  if (!userBio) return redirect("/profile");


  async function handleBioUpdate(formData) {
    "use server";
    const newBio = formData.get("bio");

    // Update bio in the database
    await db.query(
      `UPDATE users SET bio = $1 WHERE clerk_id = $2`,
      [newBio, userId]
    );

    
    revalidatePath("/profile");
    redirect("/profile");
  }

  return (
    <div>
      <h1>Edit Bio</h1>
      <form action={handleBioUpdate} method="post">
        <textarea
          name="bio"
          defaultValue={userBio || ""}
          placeholder="Update your bio..."
          className="border-2 border-gray-300 rounded-md p-3 w-full text-gray-800 resize-none"
          rows="4"
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-200 mt-4"
        >
          Save Bio
        </button>
      </form>
    </div>
  );
}
