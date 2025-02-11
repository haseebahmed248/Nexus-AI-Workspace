"use client";
import TeamManagerHeaderContent from "@/components/features/team-manager/header/TeamManagerHeaderContent";
import { TeamManagerSidebarContent } from "@/components/features/team-manager/sidebar/TeamManagerSidebarContent";
import { Sidebar } from "@/components/ui/layout/Sidebar";
import UserModal from "@/components/ui/modal/UserModal";
import React, { useEffect } from "react";

function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  useEffect(() => {
    const fetchSlug = async () => {
      const slug = await params;
      console.log("slug", slug);
    };
    fetchSlug();
  }, []);
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <TeamManagerHeaderContent />
      </header>

      <div className="flex flex-1 relative">
        <div className="fixed h-screen">
          <Sidebar>
            <TeamManagerSidebarContent slug={params.slug} />
          </Sidebar>
        </div>
        <main className="ml-40 flex-1 p-8">{children}</main>
        <UserModal />
      </div>
    </div>
  );
}

export default Layout;
