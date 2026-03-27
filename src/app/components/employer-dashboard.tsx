import { Link } from "react-router";
import {
  ArrowLeft,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Users,
  Calendar,
  Award,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  Download,
  BarChart3,
  AlertCircle,
  Target,
  Bell,
  Shield,
} from "lucide-react";
import { useState } from "react";

interface Welder {
  id: string;
  name: string;
  photo: string;
  position: string;
  certifications: number;
  expiringCerts: number;
  complianceScore: number;
  status: "compliant" | "warning" | "critical";
  nextExpiry: string;
  daysUntilExpiry: number;
}

export default function EmployerDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "compliant" | "warning" | "critical">("all");
  const [showActionPlan, setShowActionPlan] = useState(false);

  // Mock workforce data
  const workforce: Welder[] = [
    {
      id: "1",
      name: "Marcus Chen",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
      position: "Senior Aerospace Welder",
      certifications: 5,
      expiringCerts: 2,
      complianceScore: 65,
      status: "warning",
      nextExpiry: "AWS D17.1",
      daysUntilExpiry: 23,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
      position: "Lead Welder",
      certifications: 7,
      expiringCerts: 0,
      complianceScore: 98,
      status: "compliant",
      nextExpiry: "ASME Section IX",
      daysUntilExpiry: 145,
    },
    {
      id: "3",
      name: "David Martinez",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
      position: "Aerospace Welder",
      certifications: 4,
      expiringCerts: 1,
      complianceScore: 72,
      status: "warning",
      nextExpiry: "FAA Certification",
      daysUntilExpiry: 45,
    },
    {
      id: "4",
      name: "Jennifer Kim",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
      position: "Junior Welder",
      certifications: 3,
      expiringCerts: 2,
      complianceScore: 42,
      status: "critical",
      nextExpiry: "6G Position Cert",
      daysUntilExpiry: 12,
    },
    {
      id: "5",
      name: "Robert Taylor",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
      position: "Senior Welder",
      certifications: 6,
      expiringCerts: 0,
      complianceScore: 95,
      status: "compliant",
      nextExpiry: "TIG Certification",
      daysUntilExpiry: 178,
    },
    {
      id: "6",
      name: "Emily Rodriguez",
      photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200",
      position: "Aerospace Welder",
      certifications: 5,
      expiringCerts: 1,
      complianceScore: 78,
      status: "warning",
      nextExpiry: "AWS D17.1",
      daysUntilExpiry: 38,
    },
    {
      id: "7",
      name: "Michael Brown",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200",
      position: "Lead Inspector",
      certifications: 8,
      expiringCerts: 0,
      complianceScore: 100,
      status: "compliant",
      nextExpiry: "CWI Renewal",
      daysUntilExpiry: 220,
    },
    {
      id: "8",
      name: "Lisa Anderson",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200",
      position: "Aerospace Welder",
      certifications: 4,
      expiringCerts: 2,
      complianceScore: 55,
      status: "critical",
      nextExpiry: "EASA Part 66",
      daysUntilExpiry: 18,
    },
  ];

  // Filter workforce
  const filteredWorkforce = workforce.filter((welder) => {
    const matchesSearch = welder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         welder.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || welder.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Calculate workforce metrics
  const totalWelders = workforce.length;
  const compliantCount = workforce.filter(w => w.status === "compliant").length;
  const warningCount = workforce.filter(w => w.status === "warning").length;
  const criticalCount = workforce.filter(w => w.status === "critical").length;
  const avgComplianceScore = Math.round(workforce.reduce((acc, w) => acc + w.complianceScore, 0) / workforce.length);

  // Predicted non-compliance in next 90 days
  const predictedNonCompliant = workforce.filter(w => w.daysUntilExpiry <= 90).length;

  // Training gap analysis
  const trainingGaps = [
    { skill: "AWS D17.1 Aerospace", affected: 4, urgency: "High", shortage: "50%" },
    { skill: "EASA Part 66", affected: 2, urgency: "Critical", shortage: "75%" },
    { skill: "FAA Certification", affected: 3, urgency: "Medium", shortage: "37%" },
    { skill: "6G Position Welding", affected: 5, urgency: "High", shortage: "62%" },
  ];

  // Upcoming certification shortages (next 6 months)
  const certificationForecast = [
    { month: "April 2026", projected: 3, type: "AWS D17.1" },
    { month: "May 2026", projected: 5, type: "Multiple Certs" },
    { month: "June 2026", projected: 2, type: "FAA Certification" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "compliant":
        return "bg-green-100 text-green-700 border-green-300";
      case "warning":
        return "bg-orange-100 text-orange-700 border-orange-300";
      case "critical":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "compliant":
        return "bg-green-500 text-white";
      case "warning":
        return "bg-orange-500 text-white";
      case "critical":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-6">
            <Link
              to="/employer/dashboard"
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div className="flex-1">
              <h1 className="text-xl font-bold">Workforce Compliance Dashboard</h1>
              <p className="text-sm text-blue-100">
                Employer Analytics & Predictions
              </p>
            </div>
            <button className="p-2 hover:bg-white/20 rounded-lg transition-colors relative">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-blue-200" />
                <p className="text-xs text-blue-100">Total Welders</p>
              </div>
              <p className="text-2xl font-bold">{totalWelders}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-4 h-4 text-blue-200" />
                <p className="text-xs text-blue-100">Avg Compliance</p>
              </div>
              <p className="text-2xl font-bold">{avgComplianceScore}%</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-green-200" />
                <p className="text-xs text-blue-100">Compliant</p>
              </div>
              <p className="text-2xl font-bold text-green-200">{compliantCount}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-red-200" />
                <p className="text-xs text-blue-100">At Risk</p>
              </div>
              <p className="text-2xl font-bold text-red-200">{warningCount + criticalCount}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Predictive Alert */}
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-5 text-white shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <TrendingDown className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-1">
                Predicted Non-Compliance Alert
              </h3>
              <p className="text-sm text-red-100 mb-3">
                Based on current patterns, <strong>{predictedNonCompliant} welders</strong> will become non-compliant within the next 90 days without immediate action.
              </p>
              <div className="flex items-center gap-2">
                <button
                  className="bg-white text-red-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-50 transition-colors"
                  onClick={() => setShowActionPlan(true)}
                >
                  View Action Plan
                </button>
                <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                  Send Reminders
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search welders by name or position..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="compliant">Compliant</option>
              <option value="warning">Warning</option>
              <option value="critical">Critical</option>
            </select>
            <button className="bg-white border border-stone-200 p-3 rounded-xl hover:bg-stone-50 transition-colors">
              <Download className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Workforce List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Workforce Overview</h2>
            <span className="text-sm text-gray-500">
              {filteredWorkforce.length} of {totalWelders} welders
            </span>
          </div>

          <div className="space-y-3">
            {filteredWorkforce.map((welder) => (
              <div
                key={welder.id}
                className={`bg-white rounded-xl p-4 shadow-sm border-2 ${
                  welder.status === "critical"
                    ? "border-red-300"
                    : welder.status === "warning"
                    ? "border-orange-300"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Photo */}
                  <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={welder.photo}
                      alt={welder.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{welder.name}</h3>
                        <p className="text-xs text-gray-500">{welder.position}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(
                          welder.status
                        )}`}
                      >
                        {welder.status === "compliant"
                          ? "Compliant"
                          : welder.status === "warning"
                          ? "Warning"
                          : "Critical"}
                      </span>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                      <div className="bg-stone-50 rounded-lg p-2">
                        <p className="text-xs text-gray-500 mb-1">Total Certs</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {welder.certifications}
                        </p>
                      </div>
                      <div className="bg-stone-50 rounded-lg p-2">
                        <p className="text-xs text-gray-500 mb-1">Expiring Soon</p>
                        <p className="text-sm font-semibold text-orange-600">
                          {welder.expiringCerts}
                        </p>
                      </div>
                      <div className="bg-stone-50 rounded-lg p-2">
                        <p className="text-xs text-gray-500 mb-1">Compliance</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {welder.complianceScore}%
                        </p>
                      </div>
                      <div className="bg-stone-50 rounded-lg p-2">
                        <p className="text-xs text-gray-500 mb-1">Next Expiry</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {welder.daysUntilExpiry}d
                        </p>
                      </div>
                    </div>

                    {/* Next expiring cert */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Clock className="w-3 h-3" />
                        <span>
                          Next: <strong>{welder.nextExpiry}</strong> expires in{" "}
                          {welder.daysUntilExpiry} days
                        </span>
                      </div>
                      <button className="text-xs text-blue-600 hover:text-blue-700 font-semibold">
                        View Details →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Training Gap Analysis */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-orange-500" />
            <h2 className="text-lg font-bold text-gray-900">Training Gap Analysis</h2>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-stone-200">
            <p className="text-sm text-gray-600 mb-4">
              Identifies critical skill shortages across your workforce based on upcoming
              certification expirations.
            </p>

            <div className="space-y-3">
              {trainingGaps.map((gap, index) => (
                <div key={index} className="border border-stone-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{gap.skill}</h3>
                      <p className="text-xs text-gray-500">
                        {gap.affected} welders affected
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        gap.urgency === "Critical"
                          ? "bg-red-100 text-red-700"
                          : gap.urgency === "High"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {gap.urgency}
                    </span>
                  </div>

                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                      <span>Workforce Coverage</span>
                      <span className="font-semibold">{gap.shortage} shortage</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          gap.urgency === "Critical"
                            ? "bg-red-500"
                            : gap.urgency === "High"
                            ? "bg-orange-500"
                            : "bg-yellow-500"
                        }`}
                        style={{
                          width: `${100 - parseInt(gap.shortage)}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded-lg transition-colors">
                    Schedule Training for {gap.affected} Welders
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certification Shortage Forecast */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-purple-500" />
            <h2 className="text-lg font-bold text-gray-900">
              Certification Shortage Forecast
            </h2>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-stone-200">
            <p className="text-sm text-gray-600 mb-4">
              Projected certification gaps for the next 6 months based on expiration patterns
              and renewal rates.
            </p>

            <div className="space-y-3">
              {certificationForecast.map((forecast, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-purple-50 border border-purple-200 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{forecast.month}</p>
                      <p className="text-xs text-gray-600">{forecast.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-purple-600">
                      {forecast.projected}
                    </p>
                    <p className="text-xs text-gray-500">welders at risk</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-blue-900 mb-1">
                    Proactive Recommendation
                  </p>
                  <p className="text-xs text-blue-700">
                    Schedule renewal training for April cohort now to avoid workforce
                    compliance gaps. Early enrollment ensures all welders maintain
                    certification continuity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button className="bg-white border border-stone-200 rounded-xl p-4 hover:shadow-md transition-shadow text-left">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
              <Bell className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Send Reminders</h3>
            <p className="text-xs text-gray-500">
              Notify welders about upcoming expirations
            </p>
          </button>

          <button className="bg-white border border-stone-200 rounded-xl p-4 hover:shadow-md transition-shadow text-left">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
              <Download className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Export Report</h3>
            <p className="text-xs text-gray-500">
              Download compliance analytics as PDF
            </p>
          </button>

          <Link
            to="/employer/fraud-detection"
            className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl p-4 hover:shadow-lg transition-shadow"
          >
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-3">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-semibold text-white mb-1">Fraud Detection</h3>
            <p className="text-xs text-red-100">
              View suspicious activity alerts
            </p>
          </Link>
        </div>
      </div>

      {/* Action Plan Modal */}
      {showActionPlan && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Action Plan</h3>
              <button
                className="p-2 hover:bg-gray-100 rounded-full"
                onClick={() => setShowActionPlan(false)}
              >
                <XCircle className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Implement the following steps to address the predicted non-compliance:
            </p>

            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-500 mb-1">Step 1</p>
                <p className="text-sm font-semibold text-gray-900">
                  Review upcoming certification expirations.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-500 mb-1">Step 2</p>
                <p className="text-sm font-semibold text-gray-900">
                  Schedule renewal training for affected welders.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-500 mb-1">Step 3</p>
                <p className="text-sm font-semibold text-gray-900">
                  Monitor progress and ensure compliance.
                </p>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors"
                onClick={() => setShowActionPlan(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}