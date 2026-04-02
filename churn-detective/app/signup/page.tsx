"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AlertCircle, ArrowRight, CheckCircle } from "lucide-react";

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
      
      // Redirect after 2 seconds
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
      <div className="min-h-screen bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-md text-center space-y-6">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Aboard! 🎉</h1>
            <p className="text-gray-600">Your account is ready. Redirecting to dashboard...</p>
          </div>
          <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
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
            <h1 className="text-3xl font-bold text-gray-900">Get Started Free</h1>
            <p className="text-gray-600">Create your Churn Detective account</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Company Name
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-colors"
                placeholder="Your SaaS Company"
              />
            </div>

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
              {loading ? "Creating Account..." : "Create Account →"}
            </button>
          </form>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Free forever for founders</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>No credit card required</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Instant results</span>
              </li>
            </ul>
          </div>

          <div className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 font-semibold hover:underline">
              Sign in
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
