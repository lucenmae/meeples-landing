"use client"

import { Moon, Sun } from "lucide-react"
import { useRouter } from "next/navigation"
import { Session } from "next-auth"
import { signOut } from "next-auth/react"
import { useTheme } from "next-themes"
import { useCallback,useEffect, useState } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import Sidebar from "../layout/Sidebar"

import AddGameDialog from "./AddGameDialog"
import GameManagement from "./GameManagement"

interface DashboardProps {
  session: Session
}

export default function Dashboard({ session }: DashboardProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isLargeScreen, setIsLargeScreen] = useState(false)
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isAddGameModalOpen, setIsAddGameModalOpen] = useState(false)
  const router = useRouter()

  const toggleSidebar = useCallback(() => {
    if (isLargeScreen) {
      setIsSidebarMinimized(prev => !prev);
    } else {
      setIsSidebarOpen(prev => !prev);
    }
  }, [isLargeScreen]);

  useEffect(() => {
    setMounted(true)
    const checkScreenSize = () => {
      const largeScreen = window.innerWidth >= 1024;
      setIsLargeScreen(largeScreen);
      setIsSidebarOpen(largeScreen);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [])

  const handleAddGame = () => {
    setIsAddGameModalOpen(true);
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  if (!mounted) return null

  const toggleButtonClass = "p-2 rounded-md bg-meeple-primary border-2 border-black hover:translate-x-1 hover:-translate-y-1 transition-transform duration-200 text-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]";

  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
        toggleSidebar={toggleSidebar}
        isMinimized={isSidebarMinimized}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="sticky top-0 z-30 bg-meeple-secondary border-b-5 shadow-[5px_5px_0px_#000] border-meeple-shadow">
          <div className="flex items-center justify-between px-4 py-2 max-w-7xl mx-auto">
            {/* Left side - currently empty */}
            <div></div>
            
            {/* Moon/Sun toggle and Avatar */}
            <div className="flex items-center space-x-4">
              {/* <Button 
                variant="outline" 
                size="icon" 
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={`${toggleButtonClass} ${theme === "dark" ? "bg-meeple-secondary" : "bg-white"}`}
              >
                {theme === "dark" ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6 " />}
              </Button> */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="p-0 bg-meeple-primary border-2 border-black rounded-md hover:translate-x-1 hover:-translate-y-1 transition-transform duration-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                    <Avatar className="h-full w-full rounded-none">
                      <AvatarImage src={session.user.image || ""} alt={session.user.name || ""} className="object-cover" />
                      <AvatarFallback className="rounded-none">{session.user.name?.[0] || "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-meeple-primary border-2 border-black rounded-md shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="flex items-center justify-start gap-2 p-2 border-b-2 border-black">
                    <div className="flex flex-col space-y-1 leading-none">
                      {session.user.name && <p className="font-medium">{session.user.name}</p>}
                      {session.user.email && (
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                          {session.user.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <DropdownMenuItem onSelect={() => router.push("/dashboard")} className="hover:bg-meeple-shadow hover:text-white">
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => router.push("/dashboard/settings")} className="hover:bg-meeple-shadow hover:text-white">
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-meeple-shadow hover:text-white"
                    onSelect={(event) => {
                      event.preventDefault()
                      handleLogout()
                    }}
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {/* <button
              onClick={toggleSidebar}
              className={toggleButtonClass}
            >
              <Menu className="w-6 h-6" />
            </button> */}
          </div>
        </header>
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <GameManagement onAddGame={handleAddGame} />
            <AddGameDialog 
              open={isAddGameModalOpen} 
              onOpenChange={setIsAddGameModalOpen}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
