import { Link } from "react-router";
import {
  ArrowLeft,
  Shield,
  AlertTriangle,
  XCircle,
  CheckCircle,
  Search,
  Filter,
  Download,
  Eye,
  FileX,
  Copy,
  Activity,
  TrendingUp,
  Calendar,
  MapPin,
  User,
  FileText,
  Clock,
  Lock,
  Fingerprint,
  AlertOctagon,
} from "lucide-react";
import { useState } from "react";

interface FraudAlert {
  id: string;
  type: "duplicate" | "altered" | "suspicious" | "expired";
  severity: "critical" | "high" | "medium";
  certNumber: string;
  welderName: string;
  welderPhoto: string;
  issueDate: string;
  detectedDate: string;
  reason: string;
  details: string;
  status: "pending" | "investigating" | "resolved" | "confirmed";
  blockchainVerified: boolean;
}

export default function FraudDetection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSeverity, setFilterSeverity] = useState<"all" | "critical" | "high" | "medium">("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "investigating" | "resolved">("all");

  // Mock fraud alerts
  const fraudAlerts: FraudAlert[] = [
    {
      id: "1",
      type: "duplicate",
      severity: "critical",
      certNumber: "AWS-2024-5891",
      welderName: "Unknown User",
      welderPhoto: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200",
      issueDate: "Mar 10, 2026",
      detectedDate: "Mar 15, 2026",
      reason: "Duplicate Certification Detected",
      details: "Same certification number found in 3 different digital wallets. Original holder: Marcus Chen (WLD-2024-8293)",
      status: "investigating",
      blockchainVerified: false,
    },
    {
      id: "2",
      type: "altered",
      severity: "critical",
      certNumber: "FAA-AER-2023-412",
      welderName: "James Wilson",
      welderPhoto: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200",
      issueDate: "Jan 15, 2023",
      detectedDate: "Mar 14, 2026",
      reason: "Document Alteration Detected",
      details: "Expiration date modified from 01/15/2024 to 01/15/2027. Digital signature mismatch detected.",
      status: "pending",
      blockchainVerified: false,
    },
    {
      id: "3",
      type: "suspicious",
      severity: "high",
      certNumber: "ASME-IX-2026-892",
      welderName: "Robert Garcia",
      welderPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
      issueDate: "Mar 12, 2026",
      detectedDate: "Mar 15, 2026",
      reason: "Unusual Certification Pattern",
      details: "5 advanced certifications obtained within 48 hours from different states. Physically impossible timeline.",
      status: "investigating",
      blockchainVerified: true,
    },
    {
      id: "4",
      type: "duplicate",
      severity: "high",
      certNumber: "6G-POS-2025-334",
      welderName: "Sarah Mitchell",
      welderPhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
      issueDate: "Feb 20, 2025",
      detectedDate: "Mar 15, 2026",
      reason: "Duplicate Certificate Number",
      details: "Certificate number already assigned to another welder (ID: WLD-2023-4456). Possible forgery.",
      status: "pending",
      blockchainVerified: false,
    },
    {
      id: "5",
      type: "altered",
      severity: "medium",
      certNumber: "TIG-ADV-2024-778",
      welderName: "Michael Brown",
      welderPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
      issueDate: "Oct 5, 2024",
      detectedDate: "Mar 13, 2026",
      reason: "Metadata Inconsistency",
      details: "PDF creation date (Mar 2026) is after stated issue date (Oct 2024). Possible backdated document.",
      status: "resolved",
      blockchainVerified: true,
    },
    {
      id: "6",
      type: "suspicious",
      severity: "high",
      certNumber: "AWS-D17-2026-123",
      welderName: "Jennifer Lee",
      welderPhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
      issueDate: "Mar 11, 2026",
      detectedDate: "Mar 15, 2026",
      reason: "Rapid Verification Attempts",
      details: "Certificate scanned 47 times across 12 different locations in 24 hours. Abnormal usage pattern.",
      status: "investigating",
      blockchainVerified: true,
    },
  ];

  // Filter alerts
  const filteredAlerts = fraudAlerts.filter((alert) => {
    const matchesSearch =
      alert.welderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.certNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = filterSeverity === "all" || alert.severity === filterSeverity;
    const matchesStatus = filterStatus === "all" || alert.status === filterStatus;
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  // Statistics
  const totalAlerts = fraudAlerts.length;
  const criticalAlerts = fraudAlerts.filter(a => a.severity === "critical").length;
  const pendingAlerts = fraudAlerts.filter(a => a.status === "pending").length;
  const fraudPrevented = 23; // Mock number
  const verificationRate = 94; // Mock percentage

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-700 border-red-300";
      case "high":
        return "bg-orange-100 text-orange-700 border-orange-300";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "duplicate":
        return <Copy className="w-5 h-5" />;
      case "altered":
        return <FileX className="w-5 h-5" />;
      case "suspicious":
        return <Activity className="w-5 h-5" />;
      default:
        return <AlertTriangle className="w-5 h-5" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "duplicate":
        return "Duplicate";
      case "altered":
        return "Altered Document";
      case "suspicious":
        return "Suspicious Activity";
      default:
        return "Other";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500 text-white";
      case "investigating":
        return "bg-blue-500 text-white";
      case "resolved":
        return "bg-green-500 text-white";
      case "confirmed":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-600 to-red-700 text-white">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-6">
            <Link
              to="/employer/dashboard"
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div className="flex-1">
              <h1 className="text-xl font-bold">Fraud Detection System</h1>
              <p className="text-sm text-red-100">
                AI-Powered Certification Verification & Monitoring
              </p>
            </div>
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <AlertOctagon className="w-4 h-4 text-red-200" />
                <p className="text-xs text-red-100">Active Alerts</p>
              </div>
              <p className="text-2xl font-bold">{totalAlerts}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-red-200" />
                <p className="text-xs text-red-100">Critical</p>
              </div>
              <p className="text-2xl font-bold text-red-200">{criticalAlerts}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-red-200" />
                <p className="text-xs text-red-100">Fraud Prevented</p>
              </div>
              <p className="text-2xl font-bold text-green-200">{fraudPrevented}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <Fingerprint className="w-4 h-4 text-red-200" />
                <p className="text-xs text-red-100">Accuracy</p>
              </div>
              <p className="text-2xl font-bold">{verificationRate}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* AI Detection Info */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-5 text-white shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-1">
                Advanced Pattern Recognition Active
              </h3>
              <p className="text-sm text-purple-100 mb-3">
                Our verification system uses blockchain validation and document analysis to detect suspicious patterns, duplicate certifications, and altered documents in real-time.
              </p>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white/10 rounded-lg p-2">
                  <p className="text-xs text-purple-100 mb-1">Blockchain</p>
                  <p className="text-sm font-bold">Verified</p>
                </div>
                <div className="bg-white/10 rounded-lg p-2">
                  <p className="text-xs text-purple-100 mb-1">Real-time</p>
                  <p className="text-sm font-bold">Monitoring</p>
                </div>
                <div className="bg-white/10 rounded-lg p-2">
                  <p className="text-xs text-purple-100 mb-1">Doc Analysis</p>
                  <p className="text-sm font-bold">Active</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by welder name or cert number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value as any)}
              className="px-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="all">All Severity</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="investigating">Investigating</option>
              <option value="resolved">Resolved</option>
            </select>
            <button className="bg-white border border-stone-200 p-3 rounded-xl hover:bg-stone-50 transition-colors">
              <Download className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Fraud Alerts List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Fraud Alerts</h2>
            <span className="text-sm text-gray-500">
              {filteredAlerts.length} of {totalAlerts} alerts
            </span>
          </div>

          <div className="space-y-4">
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`bg-white rounded-2xl p-5 shadow-sm border-2 ${
                  alert.severity === "critical"
                    ? "border-red-300"
                    : alert.severity === "high"
                    ? "border-orange-300"
                    : "border-yellow-300"
                }`}
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={alert.welderPhoto}
                      alt={alert.welderName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-gray-900">{alert.welderName}</h3>
                        <p className="text-xs text-gray-500">{alert.certNumber}</p>
                      </div>
                      <div className="flex gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(
                            alert.status
                          )}`}
                        >
                          {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    {/* Alert Type and Severity */}
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border ${getSeverityColor(
                          alert.severity
                        )}`}
                      >
                        {getTypeIcon(alert.type)}
                        <span>{getTypeLabel(alert.type)}</span>
                      </span>
                      <span
                        className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                          alert.severity === "critical"
                            ? "bg-red-100 text-red-700"
                            : alert.severity === "high"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {alert.severity.toUpperCase()}
                      </span>
                      {alert.blockchainVerified ? (
                        <span className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold bg-purple-100 text-purple-700">
                          <Lock className="w-3 h-3" />
                          Blockchain Verified
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold bg-gray-100 text-gray-700">
                          <XCircle className="w-3 h-3" />
                          Not on Chain
                        </span>
                      )}
                    </div>

                    {/* Alert Details */}
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
                      <p className="font-semibold text-sm text-red-900 mb-1">
                        {alert.reason}
                      </p>
                      <p className="text-xs text-red-700">{alert.details}</p>
                    </div>

                    {/* Metadata */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
                      <div className="bg-stone-50 rounded-lg p-2">
                        <p className="text-xs text-gray-500 mb-1">Issue Date</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {alert.issueDate}
                        </p>
                      </div>
                      <div className="bg-stone-50 rounded-lg p-2">
                        <p className="text-xs text-gray-500 mb-1">Detected</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {alert.detectedDate}
                        </p>
                      </div>
                      <div className="bg-stone-50 rounded-lg p-2">
                        <p className="text-xs text-gray-500 mb-1">Alert ID</p>
                        <p className="text-sm font-semibold text-gray-900 font-mono">
                          #{alert.id.padStart(6, "0")}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors">
                        Investigate
                      </button>
                      <button className="flex-1 bg-stone-100 hover:bg-stone-200 text-gray-900 text-sm font-semibold py-2 px-4 rounded-lg transition-colors">
                        View Details
                      </button>
                      <button className="bg-stone-100 hover:bg-stone-200 text-gray-900 p-2 rounded-lg transition-colors">
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detection Analytics */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Detection Analytics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Fraud Type Distribution */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-stone-200">
              <h3 className="font-semibold text-gray-900 mb-4">Fraud Type Breakdown</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">Duplicate Certs</span>
                    <span className="font-semibold text-gray-900">33%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500" style={{ width: "33%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">Altered Docs</span>
                    <span className="font-semibold text-gray-900">28%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500" style={{ width: "28%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">Suspicious Activity</span>
                    <span className="font-semibold text-gray-900">39%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500" style={{ width: "39%" }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detection Methods */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-stone-200">
              <h3 className="font-semibold text-gray-900 mb-4">Detection Methods</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Lock className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">Blockchain</p>
                    <p className="text-xs text-gray-500">67% verified</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">Doc Analysis</p>
                    <p className="text-xs text-gray-500">100% scanned</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Activity className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">Pattern Recognition</p>
                    <p className="text-xs text-gray-500">Real-time</p>
                  </div>
                </div>
              </div>
            </div>

            {/* This Month */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-stone-200">
              <h3 className="font-semibold text-gray-900 mb-4">This Month</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Total Scans</p>
                  <p className="text-2xl font-bold text-gray-900">1,247</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Fraud Detected</p>
                  <p className="text-2xl font-bold text-red-600">23</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Detection Rate</p>
                  <p className="text-2xl font-bold text-orange-600">1.84%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}