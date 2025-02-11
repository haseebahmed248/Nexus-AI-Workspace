import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const token = await getToken({ req: req as any });
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/getUsers`, {
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
    });
    console.log('response: ',response);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}