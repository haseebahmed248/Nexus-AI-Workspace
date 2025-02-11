'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

interface SidebarLinkProps{
    href: string,
    icon?: React.ReactNode,
    children: React.ReactNode
}

export function SidebarLink({ href, icon, children }: SidebarLinkProps) {
    const pathname = usePathname();
    const isActive = pathname === href;
  
    return (
      <Link
        href={href}
        className={`
          flex items-center gap-3 px-2 py-3 rounded-lg transition-all
          ${isActive 
            ? 'bg-blue-50 text-blue-600 font-medium shadow-sm' 
            : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
          }
        `}
      >
        {icon && (
          <span className="w-5 h-5 flex items-center justify-center">
            {icon}
          </span>
        )}
        <span className="font-medium leading-none">{children}</span>
      </Link>
    )
  }