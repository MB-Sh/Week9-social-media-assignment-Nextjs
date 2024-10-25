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

export default async function UserProfilePage({ params }) {
  const res = await fetch(`/api/users/get`, {
    method: 'POST',
    body: JSON.stringify({ username: params.username }),
    cache: 'no-store',
  });
  const dbUser = await res.json();

  const postsRes = await fetch('/api/post/get', {
    method: 'POST',
    body: JSON.stringify({ clerk_id: dbUser.clerk_id }),
    cache: 'no-store',
  });
  const posts = await postsRes.json();

  return (
    <div>
      <Image src={dbUser.profile_image_url} alt="Profile" />
      <h1>{dbUser.username}</h1>
      <p>{dbUser.bio}</p>
      <h2>Posts</h2>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
