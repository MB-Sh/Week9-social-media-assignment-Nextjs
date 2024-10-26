import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'



//set up a public route homepage and a protected post page

const isProtectedRoute =createRouteMatcher (["/post(.*)"])

// if the protected route match is in the request, protect with authentication
export default clerkMiddleware(async(auth,req)=>{
    if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
    //the matcher will find matches for public and private(it will trigger authentication) route
  
    // the matcher uses regex to find matches.
    matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}