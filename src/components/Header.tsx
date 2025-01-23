"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, User, LogOut, Bell, Briefcase, Users, Sun, Moon, Menu } from "lucide-react"
import { useAuth } from "./AuthProvider"
import { useTheme } from "./ThemeProvider"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

export default function Header() {
  const { user, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className="bg-white dark:bg-zinc-950 shadow-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-extrabold text-gray-800 dark:text-white">
            DigiBazar
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex space-x-6">
              <Link
                href="/discover"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition"
              >
                Discover
              </Link>
              <Link 
                href="/jobs" 
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition"
              >
                <Briefcase className="inline-block mr-2" size={18} />
                Jobs
              </Link>
              <Link 
                href="/hire" 
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition"
              >
                Hire
              </Link>
              <Link
                href="/collaborate"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition"
              >
                <Users className="inline-block mr-2" size={18} />
                Collaborate
              </Link>
            </nav>
            <form className="relative w-64">
              <Input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-full rounded-full bg-gray-100 dark:bg-zinc-800 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <Search 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" 
                size={20} 
              />
            </form>
            {user ? (
              <>
                <Link
                  href="/notifications"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition"
                >
                  <Bell size={22} />
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800">
                    <DropdownMenuItem>
                      <Link href={`/user/${user.username}`} className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/settings" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout} className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button asChild variant="default">
                  <Link href="/upload">Upload</Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild variant="default">
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        {isMenuOpen && (
          <div className="mt-4 md:hidden">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/discover"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition"
              >
                Discover
              </Link>
              <Link 
                href="/jobs" 
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition"
              >
                <Briefcase className="inline-block mr-2" size={18} />
                Jobs
              </Link>
              <Link 
                href="/hire" 
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition"
              >
                Hire
              </Link>
              <Link
                href="/collaborate"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition"
              >
                <Users className="inline-block mr-2" size={18} />
                Collaborate
              </Link>
            </nav>
            <div className="mt-4 space-y-4">
              {user ? (
                <>
                  <Button asChild className="w-full" variant="default">
                    <Link href="/upload">Upload</Link>
                  </Button>
                  <Button variant="outline" className="w-full" onClick={logout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button asChild className="w-full" variant="default">
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
