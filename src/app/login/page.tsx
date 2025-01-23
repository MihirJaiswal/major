"use client"

import { useState } from "react"
import { useAuth } from "../../components/AuthProvider"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { FaFacebook, FaGoogle, FaGithub  , FaSpinner } from "react-icons/fa"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { login, socialLogin, resetPassword } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      // Basic validation
      if (!email || !password) {
        throw new Error("Email and password are required")
      }

      if (!validateEmail(email)) {
        throw new Error("Invalid email format")
      }

      await login(email, password)
      router.push("/")
    } catch (err: any) {
      setError(err.message || "Failed to login. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleSocialLogin = async (provider: "google" | "facebook" | "adobe") => {
    try {
      setLoading(true)
      await socialLogin(provider)
      router.push("/")
    } catch (err: any) {
      setError(`${provider} login failed. Please try again.`)
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async () => {
    try {
      if (!email) {
        throw new Error("Please enter your email to reset your password.")
      }

      await resetPassword(email)
      alert("Password reset email sent. Please check your inbox.")
    } catch (err: any) {
      setError("Password reset failed. Please try again.")
    }
  }

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  return (
    <div className="flex items-center justify-center ">
      <div className="max-w-md w-full bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">Login</h1>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:text-white"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? <FaSpinner className="animate-spin mr-2" /> : null}
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={handleResetPassword}
            className="text-blue-500 dark:text-blue-400 hover:underline"
          >
            Forgot password?
          </button>
        </div>

        <div className="mt-6">
          <p className="text-center mb-4 text-gray-600 dark:text-gray-400">Or login with</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => handleSocialLogin("google")}
              className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              <FaGoogle className="w-5 h-5" />
              <span>Google</span>
            </button>
            <button
              onClick={() => handleSocialLogin("facebook")}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FaFacebook className="w-5 h-5" />
              <span>Facebook</span>
            </button>
            <button
              onClick={() => handleSocialLogin("adobe")}
              className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-black transition-colors"
            >
              <FaGithub className="w-5 h-5" />
              <span>Github</span>
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-500 dark:text-blue-400 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}