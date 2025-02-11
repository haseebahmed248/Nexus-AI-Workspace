import { SidebarLink } from "@/components/ui/navigation/SidebarLink";
import { Home, Layers, ShieldPlus, User } from 'lucide-react'

export function AdminSidebarContent(){
    return(
        <nav className="space-y-2">
            <SidebarLink href="/admin/dashboard" icon={<Home />}>
                Dashboard
            </SidebarLink>  
            <SidebarLink href="/admin/add-admin" icon={<ShieldPlus />}>
                Add-Admin
            </SidebarLink>  
            <SidebarLink href="/admin/users" icon={<User />}>
                Users
            </SidebarLink>   
            <SidebarLink href="/admin/work-spaces" icon={<Layers />}>
                Workspaces
            </SidebarLink>   
        </nav>
    )
}