"use client";

import { useState } from "react";
import Link from "next/link";
import { TrendingUp, AlertCircle, Zap, BarChart3, Shield, RefreshCw } from "lucide-react";

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Churn Detective</span>
          </div>
          <Link href="/login" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
            Sign In
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center space-y-8 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Detect Customer Churn <span className="text-blue-600">Before It Happens</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple, rule-based churn detection for SaaS founders. Know which customers are at risk and why—in seconds.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Link href="/login" className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
                Get Started Free →
              </Link>
              <button className="px-8 py-3 border-2 border-gray-300 text-gray-900 rounded-lg hover:border-blue-600 transition-all font-semibold">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Three Essential Answers</h2>
            <p className="text-xl text-gray-600">Everything a SaaS founder needs to prevent churn</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
              <TrendingUp className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Which Customers Are at Risk?</h3>
              <p className="text-gray-600">See your churn risk dashboard at a glance. Customers color-coded by risk level (High, Medium, Low).</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
              <AlertCircle className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Why Are They at Risk?</h3>
              <p className="text-gray-600">Understand the specific reasons: inactive logins, payment delays, engagement drops, and more.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
              <Zap className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">What Should You Do?</h3>
              <p className="text-gray-600">Get actionable suggestions for each customer: reach out, offer discount, restore features, etc.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Get started in 3 minutes</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="absolute left-1/2 top-12 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg -translate-x-1/2">
                1
              </div>
              <div className="pt-20 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Upload CSV</h3>
                <p className="text-gray-600">Drop your customer data (email, login dates, payment info)</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 top-12 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg -translate-x-1/2">
                2
              </div>
              <div className="pt-20 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Auto-Analyze</h3>
                <p className="text-gray-600">7 proven churn scoring rules run instantly</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 top-12 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg -translate-x-1/2">
                3
              </div>
              <div className="pt-20 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Take Action</h3>
                <p className="text-gray-600">See results with specific reasons and next steps</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scoring Rules */}
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Proven Scoring Rules</h2>
            <p className="text-xl text-gray-600">7 data-driven indicators of churn risk</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: BarChart3, title: "Login Activity", desc: "No logins in 7+ days triggers high risk" },
              { icon: RefreshCw, title: "Engagement Trend", desc: "Declining activity pattern detected" },
              { icon: AlertCircle, title: "Payment Status", desc: "Failed or overdue payments flagged" },
              { icon: TrendingUp, title: "MRR Impact", desc: "High-value customers get priority alerts" },
              { icon: Shield, title: "Feature Usage", desc: "Key features unused for extended period" },
              { icon: Zap, title: "Velocity Score", desc: "Rate of decline matters more than baseline" },
            ].map((rule, i) => {
              const Icon = rule.icon;
              return (
                <div key={i} className="flex gap-4 items-start bg-white p-6 rounded-xl shadow-lg">
                  <Icon className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{rule.title}</h4>
                    <p className="text-gray-600">{rule.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">Ready to Detect Churn Before It Costs You?</h2>
          <p className="text-xl text-blue-100">Start free. No credit card required. See results in minutes.</p>
          <Link href="/login" className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-all font-bold shadow-lg hover:shadow-xl transform hover:scale-105">
            Start Detecting Churn Now →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2026 Churn Detective. Built for SaaS founders by SaaS founders.</p>
        </div>
      </footer>

      {/* Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50"
            >
              {loading ? "Loading..." : "Sign In"}
            </button>
          </form>

          <p className="text-gray-600 text-xs text-center mt-6">
            Using demo auth. In production, use magic links or OAuth.
          </p>
        </div>
      </div>
    </div>
  );
}
