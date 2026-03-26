import { Link, useParams } from "react-router";
import {
  ArrowLeft,
  QrCode,
  Share2,
  Download,
  Copy,
  CheckCircle,
  Award,
  Shield,
  Calendar,
} from "lucide-react";
import { useState } from "react";

export default function CertificationQR() {
  const { certId } = useParams();
  const [copied, setCopied] = useState(false);

  const certification = {
    name: "AWS D17.1 Aerospace Welding",
    issuer: "CAAS - Civil Aviation Authority",
    welderName: "Marcus Chen",
    certNumber: "AWS-AER-2024-001",
    issueDate: "Jan 15, 2024",
    expiryDate: "Dec 15, 2026",
    status: "valid",
  };

  const verificationLink = `https://verify.weldcert.io/cert/${certId}`;

  const handleCopyLink = () => {
    // Fallback method for copying text
    const textArea = document.createElement("textarea");
    textArea.value = verificationLink;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    } finally {
      textArea.remove();
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard/wallet"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </Link>
            <div className="flex-1">
              <h1 className="text-lg font-bold text-gray-900">Share Certification</h1>
              <p className="text-xs text-gray-500">QR verification code</p>
            </div>
            <QrCode className="w-6 h-6 text-orange-500" />
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* QR Code Display */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="bg-white rounded-xl p-8 mb-4 border-2 border-gray-200">
            <div className="w-full aspect-square bg-gray-900 rounded-lg flex items-center justify-center">
              <QrCode className="w-48 h-48 text-white" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-gray-900 font-semibold mb-1">Scan to Verify</p>
            <p className="text-xs text-gray-500">
              Employers can scan this code to verify your certification
            </p>
          </div>
        </div>

        {/* Certification Summary */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Award className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-white text-lg">{certification.name}</h2>
              <p className="text-sm text-orange-100">{certification.issuer}</p>
            </div>
            <div className="bg-green-500/30 border border-green-400/50 rounded-full px-3 py-1 flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-white" />
              <span className="text-xs font-semibold text-white">Valid</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between bg-white/10 rounded-lg p-3">
              <span className="text-sm text-orange-100">Welder Name</span>
              <span className="text-sm font-semibold text-white">
                {certification.welderName}
              </span>
            </div>
            <div className="flex items-center justify-between bg-white/10 rounded-lg p-3">
              <span className="text-sm text-orange-100">Cert Number</span>
              <span className="text-xs font-mono font-semibold text-white">
                {certification.certNumber}
              </span>
            </div>
            <div className="flex items-center justify-between bg-white/10 rounded-lg p-3">
              <span className="text-sm text-orange-100">Issued</span>
              <span className="text-sm font-semibold text-white">
                {certification.issueDate}
              </span>
            </div>
            <div className="flex items-center justify-between bg-white/10 rounded-lg p-3">
              <span className="text-sm text-orange-100">Expires</span>
              <span className="text-sm font-semibold text-white">
                {certification.expiryDate}
              </span>
            </div>
          </div>
        </div>

        {/* Verification Link */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-gray-900">Verification Link</span>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 mb-3 break-all border border-gray-200">
            <p className="text-xs font-mono text-gray-600">{verificationLink}</p>
          </div>
          <button
            onClick={handleCopyLink}
            className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg font-medium transition-colors ${
              copied
                ? "bg-green-600 text-white"
                : "bg-gray-900 hover:bg-gray-800 text-white"
            }`}
          >
            {copied ? (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Link Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Verification Link</span>
              </>
            )}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button className="flex flex-col items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl p-4 transition-colors shadow-sm">
            <Share2 className="w-6 h-6" />
            <span className="text-sm font-medium">Share</span>
          </button>
          <button className="flex flex-col items-center gap-2 bg-green-500 hover:bg-green-600 text-white rounded-xl p-4 transition-colors shadow-sm">
            <Download className="w-6 h-6" />
            <span className="text-sm font-medium">Download</span>
          </button>
        </div>

        {/* Security Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex gap-3">
            <Shield className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-amber-900 mb-1">
                Security Notice
              </p>
              <p className="text-xs text-amber-700">
                This QR code is digitally signed and verified. Share only with trusted
                employers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}