import AdminHeaderContent from '@/components/features/admin/header/AdminHeaderContent';
import { AdminSidebarContent } from '@/components/features/admin/sidebar/AdminSidebarContent'
import { Sidebar } from '@/components/ui/layout/Sidebar'
import React from 'react'

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50"> {/* Add bg-gray-50 to base */}
      {/* Fixed header with shadow */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <AdminHeaderContent />
      </header>

      <div className="flex flex-1">
        {/* Sidebar with better height handling */}
        <div className="fixed h-screen">
          <Sidebar>
            <AdminSidebarContent />
          </Sidebar>
        </div>

        {/* Main content with proper margin and padding */}
        <main className="ml-64 flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout;