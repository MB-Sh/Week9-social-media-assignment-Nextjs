// import { currentUser } from '@clerk/nextjs';
import Image from 'next/image';
// import Link from 'next/link';


// export default async function UserPage({ params }) {
//   const { username } = params;

//   const resUser = await fetch(`${process.env.URL}/api/users/get`, {
//     method: 'POST',
//     body: JSON.stringify({ username }),
//     cache: 'no-store',
//   });
//   const user = await resUser.json();

//   const resPosts = await fetch(`${process.env.URL}/api/posts/get`, {
//     method: 'POST',
//     body: JSON.stringify({ clerk_id: user.clerk_id }),
//     cache: 'no-store',
//   });
//   const posts = await resPosts.json();

//   return (
//     <div>
//       <h1>{user.username}</h1>
//       <Image src={user.profile_image_url} alt="Profile Image" />
//       <p>{user.bio}</p>

//       <h2>Posts</h2>
//       {posts.length === 0 ? (
//         <p>No posts found.</p>
//       ) : (
//         posts.map((post) => (
//           <div key={post.id}>
//             <h3>{post.title}</h3>
//             <p>{post.content}</p>
//             <Link href={`/posts/${post.id}`}>View Post</Link>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

import { db } from '@/utils/dbConnection';

export async function getServerSideProps({ params }) {
  const userId = params.userId;
  const { rows: userPosts } = await db.query(
    `SELECT * FROM post WHERE up_clerk_id = $1 ORDER BY created_at DESC`,
    [userId]
  );

  return {
    props: {
      userPosts,
    },
  };
}

export default function UserProfile({ userPosts }) {
  return (
    <div className="bg-gray-100 min-h-screen py-10 px-6">
      <h1 className="text-4xl font-bold text-center mb-8">User Posts</h1>
      <div className="grid gap-6 max-w-4xl mx-auto">
        {userPosts.map((post) => (
          <div key={post.id} className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{post.title}</h2>
            <p className="text-gray-600">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
