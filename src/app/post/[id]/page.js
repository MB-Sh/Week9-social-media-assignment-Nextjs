

// // export default async function PostPage({ params }) {
// //   let post = null;

// //   try {
// //     const response = await fetch(process.env.NEXT_PUBLIC_URL + "/api/post/get", {
// //       method: "POST",
// //       body: JSON.stringify({ postId: params.id }),
// //       cache: "no-store",
// //     });
// //     post = await response.json();
// //   } catch (error) {
// //     console.error("Error fetching post:", error);
// //     post = { text: "Failed to load post" };
// //   }

// //   return (
// //     <div className="max-w-xl mx-auto border-r border-l min-h-screen">
// //       <div className="flex items-center space-x-2 py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
// //         <Link href="/" className="hover:bg-gray-100 rounded-full p-2">
          
// //         </Link>
// //         <h2 className="sm:text-lg">Back</h2>
// //       </div>

// //       {!post && <h2 className="text-center mt-5 text-lg">Post not found</h2>}

// //       {post && <Post post={post} />}
      
// //     </div>
// //   );
// // }
// export default async function PostPage({ params }) {
//   const res = await fetch('/api/post/get', {
//     method: 'POST',
//     body: JSON.stringify({ postId: params.id }),
//     cache: 'no-store',
//   });
//   const post = await res.json();

//   return (
//     <div>
//       {post ? (
//         <>
//           <h1>{post.title}</h1>
//           <p>{post.content}</p>
//         </>
//       ) : (
//         <p>Post not found</p>
//       )}
//     </div>
//   );
// }
