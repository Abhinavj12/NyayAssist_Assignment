"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "./Header"
import { Sidebar } from "./Sidebar"
import { cn } from "@/lib/utils"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className={cn("flex-1 transition-all duration-300 ease-in-out", "lg:ml-64", "pt-16")}>
          <div className="container mx-auto p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
