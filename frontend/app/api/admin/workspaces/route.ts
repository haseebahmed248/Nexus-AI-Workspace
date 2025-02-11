import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(req: Request){
    try {
        const token = await getToken({ req: req as any });
        console.log('token',token);
        if(!token) return NextResponse.json({error: 'UnAuthenticated '},{status:401});
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/getWorkSpaces`,{
            headers:{
                Authorization: `Bearer ${token.accessToken}`
            }
        })
        
        const data = await response.json();
        console.log('workspaces',data)
        return NextResponse.json(data);
    } catch (error) {
     return NextResponse.json({error: 'Failed to Fetch workspaces'},{status:500})   
    }
}