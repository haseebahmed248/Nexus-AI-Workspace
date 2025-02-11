'use client'
import { Header } from '@/components/ui/layout/Header'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';


function TeamManagerHeaderContent() {
    const { data: session, status } = useSession();    
    const router = useRouter();

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    return (
        <Header 
            username={session?.user?.name || ''}
            role={session?.user?.role || ''}
            headerText='Team-Manager'
            onSignOut={() => signOut()}
        />
    );
}

export default TeamManagerHeaderContent;