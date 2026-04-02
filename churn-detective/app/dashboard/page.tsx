"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CSVUpload } from "@/components/CSVUpload";
import { CustomerTable } from "@/components/CustomerTable";
import { LogOut, RotateCcw, AlertTriangle, TrendingDown, Users } from "lucide-react";

interface Customer {
  id: string;
  email: string;
  riskScore: number;
  riskLevel: "Low" | "Medium" | "High";
  riskReasons: string[];
  suggestedActions: string[];
  lastLoginDate: string | null;
}

export default function DashboardPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [riskFilter, setRiskFilter] = useState("");
  const [recalculating, setRecalculating] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      router.push("/login");
      return;
    }
    setUserEmail(email);
    fetchCustomers(email);
  }, [router]);

  async function fetchCustomers(email: string) {
    setLoading(true);
    try {
      const params = new URLSearchParams({ userEmail: email });
      if (riskFilter) {
        params.append("riskLevel", riskFilter);
      }

      const response = await fetch(`/api/customers?${params}`);
      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();
      setCustomers(data.customers || []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleRecalculate() {
    setRecalculating(true);
    try {
      const response = await fetch("/api/customers/recalculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail }),
      });

      if (!response.ok) throw new Error("Recalculation failed");

      await fetchCustomers(userEmail);
    } catch (err) {
      console.error("Recalculate error:", err);
    } finally {
      setRecalculating(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem("userEmail");
    router.push("/");
  }

  // Calculate stats
  const highRiskCount = customers.filter((c) => c.riskLevel === "High").length;
  const mediumRiskCount = customers.filter((c) => c.riskLevel === "Medium").length;
  const lowRiskCount = customers.filter((c) => c.riskLevel === "Low").length;
  const avgRiskScore = customers.length > 0 ? (customers.reduce((sum, c) => sum + c.riskScore, 0) / customers.length).toFixed(0) : "0";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-gray-900">Churn Detective</h1>
            <p className="text-sm text-gray-600">Dashboard for {userEmail}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleRecalculate}
              disabled={recalculating || customers.length === 0}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50 flex items-center gap-2 font-semibold"
            >
              <RotateCcw className="w-4 h-4" />
              {recalculating ? "Recalculating..." : "Recalculate"}
            </button>
            <button 
              onClick={handleLogout} 
              className="px-4 py-2 border-2 border-gray-300 text-gray-900 rounded-lg hover:border-red-300 hover:bg-red-50 transition-all flex items-center gap-2 font-semibold"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Stats Cards */}
        {customers.length > 0 && (
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold">High Risk</p>
                  <p className="text-3xl font-bold text-red-600">{highRiskCount}</p>
                </div>
                <AlertTriangle className="w-10 h-10 text-red-500 opacity-50" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold">Medium Risk</p>
                  <p className="text-3xl font-bold text-orange-600">{mediumRiskCount}</p>
                </div>
                <TrendingDown className="w-10 h-10 text-orange-500 opacity-50" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold">Low Risk</p>
                  <p className="text-3xl font-bold text-green-600">{lowRiskCount}</p>
                </div>
                <Users className="w-10 h-10 text-green-500 opacity-50" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold">Avg Risk Score</p>
                  <p className="text-3xl font-bold text-blue-600">{avgRiskScore}</p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">/100</div>
              </div>
            </div>
          </div>
        )}

        {/* Upload section */}
        <CSVUpload userEmail={userEmail} onSuccess={() => fetchCustomers(userEmail)} />

        {/* Table section */}
        {loading ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="inline-block">
              <div className="relative w-12 h-12 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full opacity-75 animate-spin"></div>
              </div>
              <p className="text-gray-600 mt-4 font-semibold">Loading customers...</p>
            </div>
          </div>
        ) : customers.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center border-2 border-dashed border-gray-300">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No customers yet</h3>
            <p className="text-gray-600">Upload a CSV file to get started</p>
          </div>
        ) : (
          <CustomerTable
            customers={customers}
            riskFilter={riskFilter}
            onFilterChange={(filter) => {
              setRiskFilter(filter);
              const params = new URLSearchParams({ userEmail });
              if (filter) {
                params.append("riskLevel", filter);
              }
              fetch(`/api/customers?${params}`)
                .then((res) => res.json())
                .then((data) => setCustomers(data.customers || []))
                .catch((err) => console.error("Fetch error:", err));
            }}
          />
        )}
      </main>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}
