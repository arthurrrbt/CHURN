"use client";

import { AlertTriangle, TrendingDown } from "lucide-react";

interface Customer {
  id: string;
  email: string;
  riskScore: number;
  riskLevel: "Low" | "Medium" | "High";
  riskReasons: string[];
  suggestedActions: string[];
  lastLoginDate: string | null;
}

interface CustomerTableProps {
  customers: Customer[];
  riskFilter: string;
  onFilterChange: (filter: string) => void;
}

export function CustomerTable({
  customers,
  riskFilter,
  onFilterChange,
}: CustomerTableProps) {
  const getBadgeClass = (level: string) => {
    switch (level) {
      case "Low":
        return "badge-low";
      case "Medium":
        return "badge-medium";
      case "High":
        return "badge-high";
      default:
        return "badge-low";
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 60) return "text-red-600";
    if (score >= 35) return "text-orange-600";
    return "text-green-600";
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Risk Analysis</h2>
        
        <div className="flex gap-2">
          {["All", "High", "Medium", "Low"].map((filter) => (
            <button
              key={filter}
              onClick={() => onFilterChange(filter === "All" ? "" : filter)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                (filter === "All" && riskFilter === "") ||
                riskFilter === filter
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {customers.length === 0 ? (
        <div className="text-center py-12">
          <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">No customers to analyze. Upload a CSV file to get started.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Risk Score
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Level
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Reasons
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Suggested Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm">{customer.email}</td>
                  <td className={`px-4 py-3 text-sm font-bold ${getRiskColor(customer.riskScore)}`}>
                    {customer.riskScore}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className={getBadgeClass(customer.riskLevel)}>
                      {customer.riskLevel}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="space-y-1">
                      {customer.riskReasons.map((reason, idx) => (
                        <div key={idx} className="text-gray-700 flex items-start gap-2">
                          <span className="text-orange-500 mt-1">•</span>
                          <span>{reason}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="space-y-1">
                      {customer.suggestedActions.map((action, idx) => (
                        <div key={idx} className="text-gray-700 flex items-start gap-2">
                          <TrendingDown className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span>{action}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 pt-4 border-t text-sm text-gray-600">
        <p>
          <strong>{customers.filter(c => c.riskLevel === "High").length}</strong> high-risk | 
          <strong className="ml-2">{customers.filter(c => c.riskLevel === "Medium").length}</strong> medium-risk | 
          <strong className="ml-2">{customers.filter(c => c.riskLevel === "Low").length}</strong> low-risk customers
        </p>
      </div>
    </div>
  );
}
