import { db } from '../../../dbConnection';

export const POST = async (req) => {
  try {
    const { title, content, up_clerk_id } = await req.json();
    const query = `
      INSERT INTO post (title, content, up_clerk_id) 
      VALUES ($1, $2, $3) RETURNING *`;
    const values = [title, content, up_clerk_id];
    const { rows } = await db.query(query, values);

    return new Response(JSON.stringify(rows[0]), { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return new Response('Error creating post', { status: 500 });
  }
};
