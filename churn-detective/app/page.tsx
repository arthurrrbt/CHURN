"use client";

import Link from "next/link";
import { TrendingUp, AlertCircle, Zap, BarChart3, Check, ArrowRight, Sparkles } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Churn Detective
            </span>
          </div>
          <div className="flex gap-4">
            <Link href="/login" className="px-4 py-2 text-slate-300 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link href="/signup" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block px-4 py-2 bg-blue-600/20 border border-blue-500/50 rounded-full text-blue-300 text-sm font-semibold mb-4">
            ✨ Predict Churn. Prevent Loss. Grow Revenue.
          </div>

          <h1 className="text-6xl md:text-7xl font-bold leading-tight">
            Know Which Customers
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
              Will Leave Before They Do
            </span>
          </h1>

          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Stop losing customers silently. Churn Detective uses AI-powered rules to identify at-risk customers in seconds. Know why they're leaving and exactly what to do about it.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/signup" className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all transform hover:scale-105 font-bold text-lg">
              Start Free Now → 
            </Link>
            <a href="#pricing" className="px-8 py-3 border-2 border-slate-600 text-white rounded-lg hover:border-blue-500 hover:bg-blue-500/10 transition-all font-bold text-lg">
              See Pricing
            </a>
          </div>

          <p className="text-sm text-slate-400 pt-4">
            💳 No credit card required • ⚡ Results in minutes • 🔒 Secure & private
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Three Essential Answers</h2>
            <p className="text-xl text-slate-300">Everything you need to prevent customer churn</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: TrendingUp, title: "Which Customers Are at Risk?", desc: "See every customer's churn risk instantly. Color-coded by severity (High, Medium, Low)." },
              { icon: AlertCircle, title: "Why Are They Leaving?", desc: "Understand the exact reasons: inactive, payment issues, engagement drop, feature disuse." },
              { icon: Zap, title: "What Should You Do?", desc: "Get actionable steps for each customer: reach out, offer incentives, restore access, etc." },
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="p-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 hover:border-blue-500 transition-all group">
                  <div className="w-14 h-14 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600/40 transition-all">
                    <Icon className="w-7 h-7 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16">How It Works</h2>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { num: "01", title: "Upload CSV", desc: "Drop your customer data. No API needed." },
              { num: "02", title: "Auto-Analyze", desc: "7 proven churn scoring rules run instantly." },
              { num: "03", title: "Take Action", desc: "Get insights and recommendations immediately." },
            ].map((step, i) => (
              <div key={i} className="relative">
                <div className="text-6xl font-bold text-slate-700 mb-4">{step.num}</div>
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-slate-400">{step.desc}</p>
                {i < 2 && (
                  <div className="hidden md:block absolute top-12 -right-12 text-3xl text-slate-700">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-slate-300">Start free. Scale as you grow.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter */}
            <div className="p-8 bg-slate-800 rounded-xl border border-slate-700 flex flex-col">
              <h3 className="text-2xl font-bold mb-2">Starter</h3>
              <p className="text-slate-400 mb-6">Perfect for testing</p>
              <div className="mb-6">
                <span className="text-5xl font-bold">Free</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {["Up to 100 customers", "5 CSV uploads/month", "Basic risk scoring", "Email support"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <Check className="w-5 h-5 text-green-400" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="w-full py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all font-bold">
                Get Started
              </Link>
            </div>

            {/* Pro - Featured */}
            <div className="p-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl border-2 border-blue-500 flex flex-col relative">
              <div className="absolute -top-4 left-8 bg-gradient-to-r from-blue-400 to-blue-600 px-4 py-1 rounded-full text-sm font-bold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-2 mt-4">Pro</h3>
              <p className="text-blue-100 mb-6">For growing SaaS</p>
              <div className="mb-6">
                <span className="text-5xl font-bold">$99</span>
                <span className="text-blue-100 text-lg">/month</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {["Up to 10,000 customers", "Unlimited uploads", "Advanced scoring & rules", "Priority support", "Export reports"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white">
                    <Check className="w-5 h-5 text-blue-200" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="w-full py-3 bg-white text-blue-700 rounded-lg hover:bg-blue-50 transition-all font-bold hover:shadow-lg">
                Start 14-Day Trial
              </Link>
            </div>

            {/* Enterprise */}
            <div className="p-8 bg-slate-800 rounded-xl border border-slate-700 flex flex-col">
              <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
              <p className="text-slate-400 mb-6">Custom solutions</p>
              <div className="mb-6">
                <span className="text-5xl font-bold">Custom</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {["Unlimited customers", "Custom integrations", "Dedicated support", "SLA guarantee", "Custom rules"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <Check className="w-5 h-5 text-green-400" />
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all font-bold">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8 bg-gradient-to-r from-blue-600 to-indigo-600 p-12 rounded-2xl">
          <h2 className="text-4xl md:text-5xl font-bold">Ready to Stop Losing Customers?</h2>
          <p className="text-xl text-blue-100">Join SaaS founders who've already detected thousands of at-risk customers.</p>
          <Link href="/signup" className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-all font-bold text-lg hover:shadow-xl transform hover:scale-105">
            Start Free Trial Now →
          </Link>
          <p className="text-sm text-blue-100">✨ No credit card required. Results in 5 minutes.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-slate-700 bg-slate-900">
        <div className="max-w-6xl mx-auto text-center text-slate-400">
          <p>&copy; 2026 Churn Detective. Built for SaaS founders by SaaS founders.</p>
        </div>
      </footer>
    </div>
  );
}
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
