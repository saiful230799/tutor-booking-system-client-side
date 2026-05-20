// src/app/api/auth/[...better-auth]/route.js
import { NextResponse } from "next/server";

const handler = async (request) => {
  const url = new URL(request.url);
  
  const backendUrl = `http://localhost:8000${url.pathname}${url.search}`;

  const headers = new Headers(request.headers);
  headers.set("host", "localhost:8000"); 

  try {
    const response = await fetch(backendUrl, {
      method: request.method,
      headers: headers,
      body: request.method !== "GET" && request.method !== "HEAD" ? await request.text() : undefined,
      redirect: "manual",
    });

    const responseHeaders = new Headers(response.headers);
    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("Proxy error to backend:", error);
    return NextResponse.json({ error: "Backend proxy failed" }, { status: 500 });
  }
};

export { handler as GET, handler as POST };