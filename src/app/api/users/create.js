import { db } from '../../../dbConnection';

export const POST = async (req) => {
  try {
    const { clerk_id, username, profile_image_url, bio } = await req.json();
    const query = `
      INSERT INTO users (clerk_id, username, profile_image_url, bio) 
      VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [clerk_id, username, profile_image_url, bio];
    const { rows } = await db.query(query, values);

    return new Response(JSON.stringify(rows[0]), { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return new Response('Error creating user', { status: 500 });
  }
};

