import Image from "next/image";

interface SidebarProps{
    children: React.ReactNode;
}


interface SidebarProps{
  children: React.ReactNode;
}

export function Sidebar({ children }: SidebarProps) {
  return (
    <aside className="w-40 h-full bg-white border-r border-gray-200 shadow-sm">
      {/* Logo section with centering */}
      <div className="p-6 border-b border-gray-100 flex items-center justify-center">
        <Image 
          src="/images/app_logo.jpg"
          width={100}
          height={100}
          alt="Logo"
        />
      </div>

      {/* Navigation section */}
      <nav className="p-4 space-y-1">
        {children}
      </nav>
    </aside>
  )
}