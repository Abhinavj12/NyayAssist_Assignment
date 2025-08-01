import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Protect dashboard routes
        if (req.nextUrl.pathname.startsWith("/dashboard")) {
          return !!token
        }
        if (req.nextUrl.pathname.startsWith("/profile")) {
          return !!token
        }
        return true
      },
    },
  },
)

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
}
