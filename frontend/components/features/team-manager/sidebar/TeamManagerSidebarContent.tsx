'use client'

import { SidebarLink } from "@/components/ui/navigation/SidebarLink";
import { Home, User, Workflow } from 'lucide-react'

export function TeamManagerSidebarContent({ slug }: { slug: string }){
    return(
        <nav className="space-y-2">
            <SidebarLink href={`/team-manager/workspace/${slug}/dashboard`} icon={<Home />}>
                Dashboard
            </SidebarLink>  
            <SidebarLink href={`/team-manager/workspace/${slug}/tasks`} icon={<Workflow />}>
                Tasks
            </SidebarLink>   
        </nav>
    )
}