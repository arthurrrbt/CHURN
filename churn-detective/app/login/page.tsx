"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AlertCircle, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      // Store email in localStorage for demo purposes
      localStorage.setItem("userEmail", email);
      router.push("/dashboard");
    } catch (err) {
      setError("Failed to login. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 flex flex-col items-center justify-center p-4">
      {/* Back to home */}
      <Link href="/" className="absolute top-8 left-8 text-white hover:text-blue-100 transition-colors flex items-center gap-2">
        <ArrowRight className="w-5 h-5 rotate-180" />
        Back
      </Link>

      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 space-y-8">
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-4">
              <AlertCircle className="w-12 h-12 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your Churn Detective account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-colors"
                placeholder="you@company.com"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
            >
              {loading ? "Signing in..." : "Sign In →"}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-600">Demo Mode</span>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-700">
              Try with any email address:<br />
              <code className="font-mono text-blue-600 font-semibold">demo@example.com</code>
            </p>
          </div>

          <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-600 font-semibold hover:underline">
              Sign up free
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center text-white text-sm">
          <p>© 2026 Churn Detective. Built for SaaS founders.</p>
        </div>
      </div>
    </div>
  );
}
