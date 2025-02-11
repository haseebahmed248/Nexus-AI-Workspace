'use client'
import { Header } from '@/components/ui/layout/Header'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation';


function AdminHeaderContent() {
    const { data: session, status } = useSession();    
    const router = useRouter();

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    return (
        <Header 
            username={session?.user?.name || ''}
            role={session?.user?.role || ''}
            headerText='Admin Dashboard'
            onSignOut={() => signOut()}
        />
    );
}

export default AdminHeaderContent;