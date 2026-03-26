import { Link } from "react-router";
import {
  Building2,
  Users,
  Shield,
  AlertTriangle,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
  QrCode,
  BarChart3,
  FileSearch,
  LogOut,
  Wallet,
} from "lucide-react";
import { useBlockchain } from "../context/BlockchainContext";
import WalletConnect from "./wallet-connect";

export default function EmployerDashboardHome() {
  const { isConnected } = useBlockchain();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Employer Dashboard</h1>
                <p className="text-purple-100 text-sm">Workforce Compliance Management</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-5 h-5 text-purple-200" />
                <span className="text-xs text-purple-100">Total Employees</span>
              </div>
              <p className="text-3xl font-bold">247</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span className="text-xs text-purple-100">Compliant</span>
              </div>
              <p className="text-3xl font-bold">189</p>
              <p className="text-xs text-green-300 mt-1">76.5%</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-5 h-5 text-amber-300" />
                <span className="text-xs text-purple-100">Expiring Soon</span>
              </div>
              <p className="text-3xl font-bold">34</p>
              <p className="text-xs text-amber-300 mt-1">Next 30 days</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-300" />
                <span className="text-xs text-purple-100">Non-Compliant</span>
              </div>
              <p className="text-3xl font-bold">24</p>
              <p className="text-xs text-red-300 mt-1">Immediate action</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Blockchain Wallet Section */}
        {!isConnected && (
          <div className="mb-6">
            <WalletConnect />
          </div>
        )}

        {isConnected && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Wallet className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-green-900">
                  Blockchain Verification Active
                </p>
                <p className="text-xs text-green-700">
                  All certifications will be verified against blockchain records
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Main Actions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Scan & Verify */}
          <Link
            to="/employer/verify"
            className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-orange-500 transition-all"
          >
            <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-500 transition-colors">
              <QrCode className="w-7 h-7 text-orange-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Scan & Verify
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Scan employee QR codes to instantly verify certifications and check blockchain records
            </p>
            <div className="flex items-center gap-2 text-orange-600 font-medium text-sm">
              <span>Start Scanning</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>

          {/* Workforce Analytics */}
          <Link
            to="/employer/analytics"
            className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-500 transition-all"
          >
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-500 transition-colors">
              <BarChart3 className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Workforce Analytics
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              View detailed compliance analytics, expiration forecasts, and workforce insights
            </p>
            <div className="flex items-center gap-2 text-blue-600 font-medium text-sm">
              <span>View Analytics</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>

          {/* Fraud Detection */}
          <Link
            to="/employer/fraud-detection"
            className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-red-500 transition-all"
          >
            <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-500 transition-colors">
              <Shield className="w-7 h-7 text-red-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Fraud Detection
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              AI-powered fraud detection system with blockchain verification and duplicate alerts
            </p>
            <div className="flex items-center gap-2 text-red-600 font-medium text-sm">
              <span>View Alerts</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>

          {/* Compliance Tracking */}
          <Link
            to="/employer/analytics"
            className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-green-500 transition-all"
          >
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-500 transition-colors">
              <CheckCircle className="w-7 h-7 text-green-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Workforce Compliance
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Monitor workforce compliance status and track certification expiration trends
            </p>
            <div className="flex items-center gap-2 text-green-600 font-medium text-sm">
              <span>View Compliance</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>

          {/* Predictive Analytics */}
          <Link
            to="/employer/analytics"
            className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-purple-500 transition-all"
          >
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-500 transition-colors">
              <TrendingUp className="w-7 h-7 text-purple-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Predictive Analytics
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              AI-powered predictions for compliance risks and workforce planning insights
            </p>
            <div className="flex items-center gap-2 text-purple-600 font-medium text-sm">
              <span>View Predictions</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>

          {/* Employee Directory */}
          <Link
            to="/employer/employees"
            className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-indigo-500 transition-all"
          >
            <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-500 transition-colors">
              <Users className="w-7 h-7 text-indigo-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Employee Directory
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Search and manage employee certifications, view profiles, and export reports
            </p>
            <div className="flex items-center gap-2 text-indigo-600 font-medium text-sm">
              <span>View Directory</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Verification Activity</h2>
            <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {[
              {
                employee: "James Wilson",
                action: "Certification verified",
                cert: "AWS D17.1 Aerospace",
                time: "5 minutes ago",
                status: "success",
                icon: CheckCircle,
              },
              {
                employee: "Sarah Chen",
                action: "Certification verified",
                cert: "EASA Part 66",
                time: "12 minutes ago",
                status: "success",
                icon: CheckCircle,
              },
              {
                employee: "Marcus Rodriguez",
                action: "Verification failed",
                cert: "FAA AC 65-15A",
                time: "1 hour ago",
                status: "error",
                icon: XCircle,
              },
              {
                employee: "Emily Thompson",
                action: "Expiring soon",
                cert: "AWS D1.1 Structural",
                time: "2 hours ago",
                status: "warning",
                icon: AlertTriangle,
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.status === "success"
                      ? "bg-green-100"
                      : activity.status === "error"
                      ? "bg-red-100"
                      : "bg-amber-100"
                  }`}
                >
                  <activity.icon
                    className={`w-5 h-5 ${
                      activity.status === "success"
                        ? "text-green-600"
                        : activity.status === "error"
                        ? "text-red-600"
                        : "text-amber-600"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{activity.employee}</p>
                  <p className="text-sm text-gray-600">{activity.action} • {activity.cert}</p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}