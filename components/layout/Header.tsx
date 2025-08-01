"use client"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./ThemeToggle"
import { UserMenu } from "./UserMenu"
import { Menu, CheckSquare } from "lucide-react"

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="flex h-16 items-center px-4">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick}>
          <Menu className="h-6 w-6" />
        </Button>

        <div className="flex items-center space-x-2 lg:ml-0 ml-2">
          <CheckSquare className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">TodoApp</span>
        </div>

        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  )
}
