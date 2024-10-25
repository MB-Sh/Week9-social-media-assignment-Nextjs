import { db } from '../../../dbConnection';

export const POST = async (req) => {
  try {
    const { username } = await req.json();
    const query = 'SELECT * FROM users WHERE username = $1';
    const { rows } = await db.query(query, [username]);

    if (rows.length === 0) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(rows[0]), { status: 200 });
  } catch (error) {
    console.error('Error fetching user:', error);
    return new Response('Error fetching user', { status: 500 });
  }
};
