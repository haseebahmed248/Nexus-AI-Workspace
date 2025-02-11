import { error } from "console";
import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server";



export async function GET(req: Request){
    try {
        const token = await getToken({req: req as any});
        if(!token){
            return NextResponse.json({error: 'Unauthorized'}, {status:401});
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/getTeamManagers`,{
            headers:{
                Authorization: `Bearer ${token.accessToken}`
            }
        })
        const data = await response.json();
        console.log('team managers', data);
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch team-managers' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const token = await getToken({req: req as any});
        if(!token){
            return NextResponse.json({error: 'Unauthorized'},{status:401});
        }

        // Read and parse the request body
        const manager = await req.json();
        console.log('data: ', manager);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/assignTeamManager`,
            {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token.accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(manager.data)
            }   
        );
        
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.log('error ', error);
        return NextResponse.json({error: 'Failed to assign team-manager'}, {status: 500});
    }
}