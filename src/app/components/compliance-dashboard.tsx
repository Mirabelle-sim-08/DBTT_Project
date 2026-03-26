import { Link } from "react-router";
import {
  ArrowLeft,
  AlertTriangle,
  Calendar,
  TrendingUp,
  CheckCircle,
  Clock,
  Award,
  AlertCircle,
  Sparkles,
  BookOpen,
  ArrowRight,
  Users,
  Target,
} from "lucide-react";
import { useCertificates } from "../context/CertificateContext";

export default function ComplianceDashboard() {
  const { certificates } = useCertificates();

  // Calculate days until expiry
  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Get certificates expiring soon (within 90 days)
  const expiringCertificates = certificates
    .filter((cert) => {
      const daysUntilExpiry = getDaysUntilExpiry(cert.expiryDate);
      return daysUntilExpiry <= 90 && daysUntilExpiry > 0;
    })
    .sort((a, b) => getDaysUntilExpiry(a.expiryDate) - getDaysUntilExpiry(b.expiryDate));

  // Get compliance status
  const getComplianceStatus = () => {
    const criticalCount = expiringCertificates.filter(
      (cert) => getDaysUntilExpiry(cert.expiryDate) <= 30
    ).length;
    const warningCount = expiringCertificates.filter(
      (cert) => {
        const days = getDaysUntilExpiry(cert.expiryDate);
        return days > 30 && days <= 60;
      }
    ).length;

    if (criticalCount > 0) return { status: "Critical", color: "red", score: 45 };
    if (warningCount > 0) return { status: "Warning", color: "orange", score: 70 };
    return { status: "Good", color: "green", score: 95 };
  };

  const complianceStatus = getComplianceStatus();

  // AI-powered recommendations
  const aiInsights = [
    {
      icon: TrendingUp,
      title: "Certification Renewal Pattern Detected",
      description: "Based on your history, you typically renew certifications 45 days before expiry. Consider starting the renewal process now.",
      type: "info",
    },
    {
      icon: Target,
      title: "High-Priority Renewal Identified",
      description: "Your AWS D17.1 certification is critical for aerospace projects. Renewal courses are available now.",
      type: "warning",
    },
    {
      icon: Users,
      title: "Industry Compliance Benchmark",
      description: "You're in the top 25% of welders who proactively manage certifications. Keep up the great work!",
      type: "success",
    },
  ];

  // Course recommendations based on expiring certs
  const courseRecommendations = [
    {
      id: 1,
      name: "AWS D17.1 Aerospace Welding Renewal",
      duration: "3 days",
      nextDate: "April 15, 2026",
      certExpiry: "May 30, 2026",
      urgency: "Critical",
      description: "Comprehensive renewal course for aerospace welding certification",
    },
    {
      id: 2,
      name: "ASME Section IX Code Update",
      duration: "2 days",
      nextDate: "April 22, 2026",
      certExpiry: "June 15, 2026",
      urgency: "High",
      description: "Stay current with latest ASME welding code requirements",
    },
    {
      id: 3,
      name: "6G Position Welding Recertification",
      duration: "1 day",
      nextDate: "May 1, 2026",
      certExpiry: "July 10, 2026",
      urgency: "Medium",
      description: "Practical test for 6G position welding recertification",
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="max-w-md mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-6">
            <Link
              to="/dashboard"
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div className="flex-1">
              <h1 className="text-xl font-bold">Compliance Analytics</h1>
              <p className="text-sm text-orange-100">
                Certification Management
              </p>
            </div>
            <TrendingUp className="w-6 h-6" />
          </div>

          {/* Compliance Score Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-orange-100 mb-1">
                  Compliance Score
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-4xl font-bold">{complianceStatus.score}</p>
                  <span className="text-lg text-orange-100">/100</span>
                </div>
              </div>
              <div
                className={`px-4 py-2 rounded-full ${
                  complianceStatus.color === "green"
                    ? "bg-green-500/20 text-green-100 border border-green-400/30"
                    : complianceStatus.color === "orange"
                    ? "bg-orange-500/20 text-orange-100 border border-orange-400/30"
                    : "bg-red-500/20 text-red-100 border border-red-400/30"
                }`}
              >
                <p className="text-sm font-semibold">
                  {complianceStatus.status}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative h-3 bg-white/20 rounded-full overflow-hidden">
              <div
                className={`absolute inset-y-0 left-0 rounded-full ${
                  complianceStatus.color === "green"
                    ? "bg-green-400"
                    : complianceStatus.color === "orange"
                    ? "bg-orange-400"
                    : "bg-red-400"
                }`}
                style={{ width: `${complianceStatus.score}%` }}
              ></div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="text-center">
                <p className="text-2xl font-bold">{certificates.length}</p>
                <p className="text-xs text-orange-100">Total Certs</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-200">
                  {expiringCertificates.length}
                </p>
                <p className="text-xs text-orange-100">Expiring Soon</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-200">
                  {certificates.length - expiringCertificates.length}
                </p>
                <p className="text-xs text-orange-100">Up to Date</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Insights Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-orange-500" />
            <h2 className="text-lg font-bold text-gray-900">Key Insights</h2>
          </div>

          <div className="space-y-3">
            {aiInsights.map((insight, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-4 border-l-4 ${
                  insight.type === "success"
                    ? "border-green-500"
                    : insight.type === "warning"
                    ? "border-orange-500"
                    : "border-blue-500"
                } shadow-sm`}
              >
                <div className="flex gap-3">
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                      insight.type === "success"
                        ? "bg-green-100"
                        : insight.type === "warning"
                        ? "bg-orange-100"
                        : "bg-blue-100"
                    }`}
                  >
                    <insight.icon
                      className={`w-5 h-5 ${
                        insight.type === "success"
                          ? "text-green-600"
                          : insight.type === "warning"
                          ? "text-orange-600"
                          : "text-blue-600"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900 mb-1">
                      {insight.title}
                    </p>
                    <p className="text-xs text-gray-600">
                      {insight.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expiring Certifications */}
        {expiringCertificates.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <h2 className="text-lg font-bold text-gray-900">
                Expiring Certifications
              </h2>
              <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                {expiringCertificates.length}
              </span>
            </div>

            <div className="space-y-3">
              {expiringCertificates.map((cert) => {
                const daysLeft = getDaysUntilExpiry(cert.expiryDate);
                const isCritical = daysLeft <= 30;
                const isWarning = daysLeft > 30 && daysLeft <= 60;

                return (
                  <div
                    key={cert.id}
                    className={`bg-white rounded-xl p-4 shadow-sm border-2 ${
                      isCritical
                        ? "border-red-300"
                        : isWarning
                        ? "border-orange-300"
                        : "border-yellow-300"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {cert.name}
                        </h3>
                        <p className="text-xs text-gray-500">{cert.issuer}</p>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          isCritical
                            ? "bg-red-100 text-red-700"
                            : isWarning
                            ? "bg-orange-100 text-orange-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {daysLeft} days
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-600 mb-3">
                      <Calendar className="w-3 h-3" />
                      <span>
                        Expires: {new Date(cert.expiryDate).toLocaleDateString()}
                      </span>
                    </div>

                    {isCritical && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
                        <div className="flex gap-2">
                          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-semibold text-red-900 mb-1">
                              Urgent Action Required
                            </p>
                            <p className="text-xs text-red-700">
                              This certification is critical and expires very soon.
                              Enroll in a renewal course immediately to maintain
                              compliance.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <Link
                      to="/dashboard/education"
                      className={`w-full py-2.5 px-4 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-colors ${
                        isCritical
                          ? "bg-red-500 hover:bg-red-600 text-white"
                          : "bg-orange-500 hover:bg-orange-600 text-white"
                      }`}
                    >
                      <BookOpen className="w-4 h-4" />
                      Find Renewal Course
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Recommended Courses */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-orange-500" />
            <h2 className="text-lg font-bold text-gray-900">
              Recommended Renewal Courses
            </h2>
          </div>

          <div className="space-y-3">
            {courseRecommendations.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {course.name}
                    </h3>
                    <p className="text-xs text-gray-600 mb-2">
                      {course.description}
                    </p>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-semibold ml-2 flex-shrink-0 ${
                      course.urgency === "Critical"
                        ? "bg-red-100 text-red-700"
                        : course.urgency === "High"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {course.urgency}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="bg-gray-50 rounded-lg p-2">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Clock className="w-3 h-3 text-gray-500" />
                      <p className="text-xs text-gray-500">Duration</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      {course.duration}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Calendar className="w-3 h-3 text-gray-500" />
                      <p className="text-xs text-gray-500">Next Session</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      {course.nextDate}
                    </p>
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-2 mb-3">
                  <div className="flex items-center gap-1.5">
                    <AlertCircle className="w-3 h-3 text-orange-600" />
                    <p className="text-xs text-orange-800">
                      Your cert expires on{" "}
                      <span className="font-semibold">{course.certExpiry}</span>
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link
                    to={`/dashboard/workshop/${course.id}`}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 px-4 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Enroll Now - FREE
                  </Link>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 px-4 rounded-lg text-sm transition-colors">
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* No Expiring Certs Message */}
        {expiringCertificates.length === 0 && (
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-8 text-center text-white">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">
              All Certifications Current!
            </h3>
            <p className="text-sm text-green-100">
              Great job! All your certifications are up to date. Check back
              regularly to stay ahead of expirations.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}