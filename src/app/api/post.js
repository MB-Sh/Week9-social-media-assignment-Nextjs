import { unstable_cache } from 'next/cache';
import { db } from '@/lib/db';

const getCachedPosts = unstable_cache(
  async () => {
    const { rows } = await db.query(`
      SELECT post.id, post.title, post.content, users.username, users.profile_image_url 
      FROM post 
      JOIN users ON post.up_clerk_id = users.clerk_id 
      ORDER BY post.created_at DESC
    `);
    return rows;
  },
  ['posts'],
  { revalidate: 3600, tags: ['posts'] }
);

export default async function handler(req, res) {
  try {
    const posts = await getCachedPosts();
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch posts' });
  }
}
