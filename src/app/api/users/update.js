import { db } from '../../../dbConnection';

export const PUT = async (req) => {
  try {
    const { clerk_id, bio } = await req.json();
    const query = 'UPDATE users SET bio = $1 WHERE clerk_id = $2 RETURNING *';
    const values = [bio, clerk_id];
    const { rows } = await db.query(query, values);

    return new Response(JSON.stringify(rows[0]), { status: 200 });
  } catch (error) {
    console.error('Error updating user:', error);
    return new Response('Error updating user', { status: 500 });
  }
};
