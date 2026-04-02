"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AlertCircle, ArrowRight, Mail, Lock } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <Link href="/" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors w-fit">
          <ArrowRight className="w-4 h-4 rotate-180" />
          Back Home
        </Link>
      </div>

      {/* Main */}
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8 md:p-10 space-y-8">
            <div className="text-center space-y-3">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                  <Mail className="w-8 h-8" />
                </div>
              </div>
              <h1 className="text-3xl font-bold">Welcome Back</h1>
              <p className="text-slate-400">Sign in to your Churn Detective dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3 w-5 h-5 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-slate-900 border-2 border-slate-700 text-white rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-900/30 border border-red-700 rounded-lg flex gap-2">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
              >
                {loading ? "Signing in..." : "Sign In →"}
              </button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-800 text-slate-400">Demo Mode</span>
              </div>
            </div>

            <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 text-center">
              <p className="text-sm text-blue-200">
                Try with any email:<br />
                <code className="font-mono text-blue-300 font-semibold">demo@example.com</code>
              </p>
            </div>

            <div className="text-center text-sm text-slate-400">
              Don't have an account?{" "}
              <Link href="/signup" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
                Sign up free
              </Link>
            </div>
          </div>

          <div className="mt-8 text-center text-slate-400 text-sm">
            <p>© 2026 Churn Detective</p>
          </div>
        </div>
      </div>
    </div>
  );
}
