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
