import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  //token will exists if user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET })

  const { pathname } = req.nextUrl
  //if foolowing is true allow the requiest
  // 1) if its a request for next auth session
  // 2) if token exists
  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next()
  }

  // redirect them to login if they do not have token and are requesting a protected route
  if (!token && pathname !== '/login') {
    return NextResponse.redirect('/login')
  }
}
