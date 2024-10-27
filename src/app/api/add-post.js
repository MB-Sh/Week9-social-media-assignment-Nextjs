import { auth } from '@clerk/nextjs/server';
import { db } from '@/utils/dbConnection';
import { redirect } from 'next/navigation';

// export default async function handler(req, res) {
//   const { userId } = await auth();

//   if (!userId) return res.status(401).json({ error: 'Unauthorized' });

//   const { title, content } = req.body;

//   try {
//     await db.query(
//       `INSERT INTO post (title, content, up_clerk_id) VALUES ($1, $2, $3)`,
//       [title, content, userId]
//     );
//     res.redirect('/post');
//   } catch (error) {
//     console.error('Error adding post:', error);
//     res.status(500).json({ error: 'Failed to add post' });
//   }
// }
export default async function handler(req, res) {
    // Allow only POST requests
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }
  
    // Get the Clerk auth object from the request
    const { userId } = getAuth(req);
  
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: You must be signed in to add a post." });
    }
  
    const { title, content } = req.body;
  
   
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required." });
    }
  
    try {
   
      const result = await db.query(
        `INSERT INTO post (title, content, up_clerk_id) VALUES ($1, $2, $3) RETURNING *`,
        [title, content, userId]
      );
  
      
      res.status(201).json({ post: result.rows[0] });
    } catch (error) {
      console.error("Error adding post:", error);
      res.status(500).json({ message: "Failed to add post" });
    }
  }