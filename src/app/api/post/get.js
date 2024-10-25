import { db } from '../../../dbConnection';

export const POST = async (req) => {
  try {
    const { clerk_id } = await req.json();
    const query = 'SELECT * FROM post WHERE up_clerk_id = $1 ORDER BY created_at DESC';
    const { rows } = await db.query(query, [clerk_id]);

    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return new Response('Error fetching posts', { status: 500 });
  }
};
