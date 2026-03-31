"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CSVUpload } from "@/components/CSVUpload";
import { CustomerTable } from "@/components/CustomerTable";
import { LogOut, RotateCcw } from "lucide-react";

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
      router.push("/");
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Churn Detective</h1>
            <p className="text-sm text-gray-600">{userEmail}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleRecalculate}
              disabled={recalculating || customers.length === 0}
              className="btn-secondary disabled:opacity-50 flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              {recalculating ? "Recalculating..." : "Recalculate Risk"}
            </button>
            <button onClick={handleLogout} className="btn-secondary flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Upload section */}
          <CSVUpload userEmail={userEmail} onSuccess={() => fetchCustomers(userEmail)} />

          {/* Table section */}
          {loading ? (
            <div className="card text-center py-12">
              <p className="text-gray-600">Loading customers...</p>
            </div>
          ) : (
            <CustomerTable
              customers={customers}
              riskFilter={riskFilter}
              onFilterChange={(filter) => {
                setRiskFilter(filter);
                // Fetch with the new filter
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
        </div>
      </main>
    </div>
  );
}
