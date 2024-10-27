import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define protected routes (e.g., /post and /create-profile)
const isProtectedRoute = createRouteMatcher(["/post(.*)", "/create-profile(.*)"]);

// Protect routes based on match
export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect(); // Requires authentication for protected routes
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
// import { NextResponse } from "next/server";
// import { db } from './utils/dbConnection';


// // Define protected routes
// const isProtectedRoute = createRouteMatcher(["/post(.*)", "/create-profile(.*)"]);

// export default clerkMiddleware(async (auth, req) => {
//   const { userId } = auth;

//   // If this is a protected route, ensure the user is authenticated
//   if (isProtectedRoute(req)) {
//     await auth.protect(); 

//     // If authenticated, check if the user has a completed profile
//     if (userId) {
//       const profile = await db.query(`SELECT * FROM users WHERE clerk_id = $1`, [userId]);
//       const hasProfile = profile.rows.length > 0;

//       // If user has no profile, redirect to create-profile page
//       if (!hasProfile && req.nextUrl.pathname !== '/create-profile') {
//         return NextResponse.redirect(new URL('/create-profile', req.url));
//       }

//       // If the user has a profile and is accessing /create-profile, redirect them to /post instead
//       if (hasProfile && req.nextUrl.pathname === '/create-profile') {
//         return NextResponse.redirect(new URL('/post', req.url));
//       }
//     }
//   }
//   return NextResponse.next();
// });

// export const config = {
//   matcher: [
//     // Avoid applying middleware to Next.js internals and static files
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
//   runtime: "nodejs",
// };
