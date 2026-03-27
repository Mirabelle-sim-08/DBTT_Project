import { Link } from "react-router";
import { useState } from "react";
import { useCertificates } from "../context/CertificateContext";
import {
  ArrowLeft,
  Award,
  CheckCircle,
  Clock,
  XCircle,
  FileText,
  QrCode,
  Download,
  Share2,
  Shield,
  Home,
  GraduationCap,
  ScanLine,
  AlertTriangle,
  Calendar,
  ChevronRight,
} from "lucide-react";

export default function CertificationWallet() {
  const { certificates } = useCertificates();
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleDownload = (fileUrl: string | undefined, fileName: string | undefined, certName: string) => {
    if (!fileUrl) {
      alert("No document available for download");
      return;
    }

    // Create a temporary link element to trigger download
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName || `${certName.replace(/\s+/g, "_")}_certificate.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "valid":
        return {
          icon: CheckCircle,
          color: "text-green-400",
          bg: "bg-green-500/20",
          border: "border-green-500/30",
          label: "Valid",
        };
      case "pending":
        return {
          icon: Clock,
          color: "text-blue-400",
          bg: "bg-blue-500/20",
          border: "border-blue-500/30",
          label: "Pending Verification",
        };
      case "expiring":
        return {
          icon: AlertTriangle,
          color: "text-orange-400",
          bg: "bg-orange-500/20",
          border: "border-orange-500/30",
          label: "Expiring Soon",
        };
      case "expired":
        return {
          icon: XCircle,
          color: "text-red-400",
          bg: "bg-red-500/20",
          border: "border-red-500/30",
          label: "Expired",
        };
      default:
        return {
          icon: CheckCircle,
          color: "text-gray-400",
          bg: "bg-gray-500/20",
          border: "border-gray-500/30",
          label: "Unknown",
        };
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link
              to="/employee/dashboard"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </Link>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">My Certs</h1>
              <p className="text-sm text-gray-500">Your digital wallet</p>
            </div>
            <Award className="w-6 h-6 text-orange-500" />
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-xl font-bold text-gray-900">
              {certificates.filter((c) => c.status === "valid").length}
            </p>
            <p className="text-xs text-gray-500">Valid</p>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-xl font-bold text-gray-900">
              {certificates.filter((c) => c.status === "expiring").length}
            </p>
            <p className="text-xs text-gray-500">Expiring</p>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <p className="text-xl font-bold text-gray-900">
              {certificates.filter((c) => c.status === "expired").length}
            </p>
            <p className="text-xs text-gray-500">Expired</p>
          </div>
        </div>

        {/* Certifications List */}
        <div className="space-y-3">
          {certificates.map((cert) => {
            const statusConfig = getStatusConfig(cert.status);
            const StatusIcon = statusConfig.icon;
            const isExpanded = selectedCert === cert.id;

            return (
              <div
                key={cert.id}
                className={`bg-white border rounded-xl overflow-hidden transition-all shadow-sm ${
                  isExpanded ? "ring-2 ring-orange-500 border-orange-500" : "border-gray-200"
                }`}
              >
                <button
                  onClick={() =>
                    setSelectedCert(isExpanded ? null : cert.id)
                  }
                  className="w-full p-4 text-left"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-12 h-12 ${statusConfig.bg} rounded-xl flex items-center justify-center flex-shrink-0`}
                    >
                      <Award className={`w-6 h-6 ${statusConfig.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {cert.name}
                      </h3>
                      <p className="text-xs text-gray-500 mb-2">{cert.issuer}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <div
                          className={`flex items-center gap-1 ${statusConfig.bg} px-2 py-1 rounded-md`}
                        >
                          <StatusIcon className={`w-3 h-3 ${statusConfig.color}`} />
                          <span
                            className={`text-xs font-medium ${statusConfig.color}`}
                          >
                            {statusConfig.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(cert.expiryDate)}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
                        isExpanded ? "rotate-90" : ""
                      }`}
                    />
                  </div>
                </button>

                {/* Expanded Actions */}
                {isExpanded && (
                  <div className="border-t border-gray-200 p-4 space-y-3 bg-gray-50">
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <p className="text-xs text-gray-500 mb-1">Certification Number</p>
                      <p className="text-sm font-mono text-gray-900">{cert.certNumber}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <Link
                        to={`/dashboard/qr/${cert.id}`}
                        className="flex flex-col items-center gap-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-3 transition-colors"
                      >
                        <QrCode className="w-5 h-5 text-blue-600" />
                        <span className="text-xs text-blue-600 font-medium">
                          QR Code
                        </span>
                      </Link>
                      <button
                        onClick={() => handleDownload(cert.fileUrl, cert.fileName, cert.name)}
                        disabled={!cert.fileUrl}
                        className={`flex flex-col items-center gap-2 rounded-lg p-3 transition-colors ${
                          cert.fileUrl
                            ? "bg-green-50 hover:bg-green-100 border border-green-200"
                            : "bg-gray-100 border border-gray-200 opacity-50 cursor-not-allowed"
                        }`}
                      >
                        <Download className={`w-5 h-5 ${cert.fileUrl ? "text-green-600" : "text-gray-400"}`} />
                        <span className={`text-xs font-medium ${cert.fileUrl ? "text-green-600" : "text-gray-400"}`}>
                          {cert.fileUrl ? "Download" : "No File"}
                        </span>
                      </button>
                      <button className="flex flex-col items-center gap-2 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg p-3 transition-colors">
                        <Share2 className="w-5 h-5 text-purple-600" />
                        <span className="text-xs text-purple-600 font-medium">Share</span>
                      </button>
                    </div>
                    {cert.status === "expired" && (
                      <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded-lg transition-colors">
                        Renew Certification
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Add New Button */}
        <Link
          to="/employee/add-certification"
          className="w-full mt-6 mb-20 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <Shield className="w-5 h-5" />
          Add New Certification
        </Link>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-md mx-auto px-6 py-3">
          <div className="flex items-center justify-around">
            <Link to="/employee/dashboard" className="flex flex-col items-center gap-1 py-2 px-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Home className="w-5 h-5 text-gray-600" />
              </div>
              <span className="text-xs text-gray-600">Home</span>
            </Link>
            <Link to="/employee/wallet" className="flex flex-col items-center gap-1 py-2 px-4">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs text-orange-500 font-medium">Wallet</span>
            </Link>
            <Link to="/employee/education" className="flex flex-col items-center gap-1 py-2 px-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-gray-600" />
              </div>
              <span className="text-xs text-gray-600">Learn</span>
            </Link>
            <Link to="/employee/verify" className="flex flex-col items-center gap-1 py-2 px-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <ScanLine className="w-5 h-5 text-gray-600" />
              </div>
              <span className="text-xs text-gray-600">Verify</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}