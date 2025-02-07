import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("user")?.value; 

  const protectedRoutes = ["/components/productDetail/[id]", "/Pages/admin", "/Pages/Checkout"];

  if (protectedRoutes.includes(req.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL("/components/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
    matcher: ["/components/productDetail/[id]", "/Pages/admin", "/Pages/Checkout"],
  };
  