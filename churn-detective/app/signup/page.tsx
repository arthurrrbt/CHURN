"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AlertCircle, ArrowRight, CheckCircle, Mail, Building2 } from "lucide-react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  async function handleSignup(e: React.FormEvent) {
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
        throw new Error("Signup failed");
      }

      setSuccess(true);
      localStorage.setItem("userEmail", email);
      
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (err) {
      setError("Failed to create account. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center p-4">
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 md:p-12 max-w-md text-center space-y-6">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Aboard! 🎉</h1>
            <p className="text-slate-400">Your account is ready. Redirecting to dashboard...</p>
          </div>
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
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
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-600 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-8 h-8" />
                </div>
              </div>
              <h1 className="text-3xl font-bold">Get Started Free</h1>
              <p className="text-slate-400">Create your Churn Detective account in seconds</p>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Company Name
                </label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-3 w-5 h-5 text-slate-500" />
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-slate-900 border-2 border-slate-700 text-white rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Your SaaS Company"
                  />
                </div>
              </div>

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
                {loading ? "Creating Account..." : "Create Account →"}
              </button>
            </form>

            <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
              <ul className="space-y-2 text-sm text-blue-200">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Free forever for founders</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>No credit card required</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Instant results</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>14-day Pro trial included</span>
                </li>
              </ul>
            </div>

            <div className="text-center text-sm text-slate-400">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
                Sign in
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
