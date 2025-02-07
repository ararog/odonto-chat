import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from 'jose'

type JWT = {
  userId: string;
}

const allowedOrigins = [
  "http://localhost:5173",
  "http://odontochat.loclx.io",
  "https://odontochat.loclx.io"
]

export async function middleware(req:NextRequest) {
  const res = NextResponse.next();

  const origin = req.headers.get("origin");
  if (! origin)
    return res;

  if (allowedOrigins.includes(origin)) {
    res.headers.append('Access-Control-Allow-Origin', origin);
    res.headers.append('Access-Control-Allow-Credentials', "true")
    res.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT')
    res.headers.append(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
    )

    if (req.method === 'OPTIONS') {
      return res;
    }
  }

  if(! req.url.includes('/graphql')) {
    const authorization = req.headers.get('authorization');
    if (!authorization) {
      console.error("Missing authorization header");
      return new NextResponse(JSON.stringify({ errors: { auth: ["Could not authenticate"] } }), { status: 401 });
    }

    if (! process.env.API_SECRET) {
      console.error("Missing auth secret");
      return new NextResponse(JSON.stringify({ errors: { auth: ["Could not authenticate"] } }), { status: 401 });
    }

    const token = authorization?.split(" ");
    if (token.length !== 2) {
      console.error("Missing auth token");
      return new NextResponse(JSON.stringify({ errors: { auth: ["Could not authenticate"] } }), { status: 401 });
    }

    const { payload } = await jwtVerify(token[1], 
      new TextEncoder().encode(process.env.API_SECRET),
      {
        algorithms: ['HS256'],
      });
    if(payload) {
      const jwt = payload as JWT;
      res.headers.set("user", jwt.userId);
    } else {
      console.error("Invalid token");
      return new NextResponse(JSON.stringify({ errors: { auth: ["Could not authenticate"] } }), { status: 401 });
    }
  }

  return res;
}