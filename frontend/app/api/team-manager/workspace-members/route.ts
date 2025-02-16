import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const token = await getToken({ req: req as any });
    if (!token)
      return NextResponse.json({ error: "UnAuthenticated " }, { status: 401 });
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/team-manager//getWorkspaceMember/1`,
      {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
      }
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { error: "Failed to Fetch workspaces" },
      { status: 500 }
    );
  }
}
