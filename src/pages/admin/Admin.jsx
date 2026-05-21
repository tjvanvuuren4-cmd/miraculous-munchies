import React, { useState } from "react";

import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import AdminProducts from "./AdminProducts";
import AdminOrders from "./AdminOrders";
import AdminReviews from "./AdminReviews";
import AdminCustomOrders from "./AdminCustomOrders";

const tabs = [
  { id: "dashboard", label: "Dashboard", component: AdminDashboard },
  { id: "products", label: "Products", component: AdminProducts },
  { id: "orders", label: "Orders", component: AdminOrders },
  { id: "reviews", label: "Reviews", component: AdminReviews },
  { id: "customOrders", label: "Custom Orders", component: AdminCustomOrders },
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const active = tabs.find((tab) => tab.id === activeTab);
  const ActiveComponent = active.component;

  const [isAdmin, setIsAdmin] = useState(
  localStorage.getItem("mm_admin") === "true"
);

if (!isAdmin) {
  return <AdminLogin onLogin={() => setIsAdmin(true)} />;
}

  return (
    <div style={{ background: "#160617", minHeight: "100vh" }}>
      <div className="sticky top-0 z-50 border-b border-yellow-300/10 bg-[#160617]/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex gap-3 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="rounded-full px-5 py-2 text-sm font-bold whitespace-nowrap"
              style={{
                background:
                  activeTab === tab.id
                    ? "linear-gradient(135deg,#f7c948,#c69214)"
                    : "rgba(255,255,255,0.05)",
                color: activeTab === tab.id ? "#1a1203" : "white",
                border: "1px solid rgba(255,215,90,0.14)",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <ActiveComponent />
    </div>
  );
}