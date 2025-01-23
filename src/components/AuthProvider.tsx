"use client"

import React, { createContext, useState, useContext, useEffect } from "react"

type User = {
  id: string
  username: string
  email: string
  profilePicture?: string
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  signup: (username: string, email: string, password: string) => Promise<void>
  resetPassword: (email: string) => Promise<void>
  socialLogin: (provider: "google" | "facebook" | "adobe") => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch("/api/auth/session", { credentials: "include" })
        if (res.ok) {
          const data = await res.json()
          setUser(data.user)
        }
      } catch (err) {
        console.error("Failed to fetch session:", err)
      }
    }

    fetchSession()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      })

      if (!res.ok) {
        throw new Error("Invalid email or password")
      }

      const data = await res.json()
      setUser(data.user)
    } catch (err) {
      console.error("Login error:", err)
      throw err
    }
  }

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" })
      setUser(null)
    } catch (err) {
      console.error("Logout error:", err)
    }
  }

  const signup = async (username: string, email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || "Failed to register user")
      }

      const data = await res.json()
      setUser(data.user)
    } catch (err) {
      console.error("Signup error:", err)
      throw err
    }
  }

  const resetPassword = async (email: string) => {
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (!res.ok) {
        throw new Error("Failed to send reset password email")
      }

      console.log(`Password reset email sent to ${email}`)
    } catch (err) {
      console.error("Reset password error:", err)
      throw err
    }
  }

  const socialLogin = async (provider: "google" | "facebook" | "adobe") => {
    try {
      const res = await fetch(`/api/auth/social-login?provider=${provider}`, {
        method: "GET",
        credentials: "include",
      })

      if (!res.ok) {
        throw new Error("Failed social login")
      }

      const data = await res.json()
      setUser(data.user)
    } catch (err) {
      console.error("Social login error:", err)
      throw err
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, resetPassword, socialLogin }}>
      {children}
    </AuthContext.Provider>
  )
}