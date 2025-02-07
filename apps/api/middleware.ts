import { NextRequest } from "next/server";
import { middleware as apiMiddleware } from "@/middleware";

export async function middleware(req:NextRequest) {
  return apiMiddleware(req)
}

export const config = {
  matcher: '/:path*',
}