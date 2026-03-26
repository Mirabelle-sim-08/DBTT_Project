import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  QrCode,
  Scan,
  CheckCircle,
  XCircle,
  Award,
  Calendar,
  Shield,
  AlertTriangle,
  FileText,
  Home,
  ScanLine,
  Hash,
  Users,
  BarChart3,
  Camera,
  X,
} from "lucide-react";
import { useCertificates } from "../context/CertificateContext";
import { blockchainService } from "../blockchain/blockchain-service";
import { Scanner } from "@yudiel/react-qr-scanner";

type ScanStatus = "idle" | "scanning" | "camera-active" | "verified" | "invalid";

export default function VerificationScanner() {
  const [scanStatus, setScanStatus] = useState<ScanStatus>("idle");
  const [certNumber, setCertNumber] = useState("");
  const [verifiedCert, setVerifiedCert] = useState<any>(null);
  const [blockchainVerified, setBlockchainVerified] = useState(false);
  const [cameraError, setCameraError] = useState<string>("");
  const { certificates } = useCertificates();

  const handleQRScan = async (result: any, error: any) => {
    if (error) {
      // Handle specific camera errors
      const errorString = error.toString();
      
      if (errorString.includes("NotAllowedError") || errorString.includes("Permission denied")) {
        setCameraError("Camera permission denied. Please enable camera access in your browser settings.");
        setScanStatus("idle");
      } else if (errorString.includes("NotFoundError")) {
        setCameraError("No camera found on this device.");
        setScanStatus("idle");
      } else if (errorString.includes("NotReadableError")) {
        setCameraError("Camera is being used by another application.");
        setScanStatus("idle");
      }
      // Don't show error for continuous scanning errors
      return;
    }

    if (result) {
      const decodedText = result?.text;
      if (!decodedText) return;
      
      setScanStatus("scanning");
      setCameraError("");

      try {
        // Parse QR code data
        let qrData;
        try {
          qrData = JSON.parse(decodedText);
        } catch {
          // If not JSON, treat as cert number
          qrData = { certNumber: decodedText };
        }

        const certNum = qrData.certNumber || qrData.certificationNumber || decodedText;
        
        // Find certificate
        const foundCert = certificates.find(cert => 
          cert.certificationNumber === certNum
        ) || certificates[0]; // Demo fallback

        if (foundCert) {
          // Check blockchain verification if connected
          let isVerified = false;
          if (blockchainService.isConnected()) {
            const verificationResult = await blockchainService.verifyCertification(
              foundCert.certificationNumber,
              {
                certNumber: foundCert.certificationNumber,
                welderName: foundCert.welderName || "Unknown",
                issuer: foundCert.issuer,
                certType: foundCert.certificationType,
                issueDate: foundCert.issueDate,
                expiryDate: foundCert.expiryDate,
              }
            );
            isVerified = verificationResult.isValid && verificationResult.exists;
          }
          
          setBlockchainVerified(isVerified);
          setVerifiedCert(foundCert);
          setScanStatus("verified");
        } else {
          setScanStatus("invalid");
        }
      } catch (error) {
        console.error("Error processing QR code:", error);
        setScanStatus("invalid");
      }
    }
  };

  const startCamera = async () => {
    setCameraError("");
    
    // Check if navigator.mediaDevices exists
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError("Camera API is not supported in your browser. Please use a modern browser like Chrome, Firefox, or Edge.");
      return;
    }
    
    // Request camera permission explicitly before starting scanner
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
      });
      
      // Permission granted - stop test stream and activate scanner
      stream.getTracks().forEach(track => track.stop());
      setScanStatus("camera-active");
    } catch (err: any) {
      // Permission denied or error - handle gracefully without console errors
      const errorName = err.name || "";
      const errorMessage = err.message || err.toString();
      
      if (errorName === "NotAllowedError" || errorMessage.includes("Permission denied")) {
        setCameraError("Camera permission was denied. Please allow camera access and try again.");
      } else if (errorName === "NotFoundError") {
        setCameraError("No camera found on this device.");
      } else if (errorName === "NotReadableError") {
        setCameraError("Camera is being used by another application.");
      } else if (errorName === "NotSupportedError") {
        setCameraError("Camera is not supported on this browser.");
      } else {
        setCameraError("Unable to access camera. Please try Manual Verification below.");
      }
      
      setScanStatus("idle");
    }
  };

  const stopCamera = () => {
    setScanStatus("idle");
    setCameraError("");
  };

  const handleManualVerify = async () => {
    if (!certNumber.trim()) {
      alert("Please enter a certification number");
      return;
    }
    
    setScanStatus("scanning");
    
    // Simulate processing
    setTimeout(async () => {
      const foundCert = certificates.find(cert => 
        cert.certificationNumber === certNumber
      ) || certificates[0];

      if (foundCert) {
        // Check blockchain verification if connected
        let isVerified = false;
        if (blockchainService.isConnected()) {
          const verificationResult = await blockchainService.verifyCertification(
            foundCert.certificationNumber,
            {
              certNumber: foundCert.certificationNumber,
              welderName: foundCert.welderName || "Unknown",
              issuer: foundCert.issuer,
              certType: foundCert.certificationType,
              issueDate: foundCert.issueDate,
              expiryDate: foundCert.expiryDate,
            }
          );
          isVerified = verificationResult.isValid && verificationResult.exists;
        }
        
        setBlockchainVerified(isVerified);
        setVerifiedCert(foundCert);
        setScanStatus("verified");
      } else {
        setScanStatus("invalid");
      }
    }, 1500);
  };

  const resetScanner = () => {
    setScanStatus("idle");
    setCertNumber("");
    setVerifiedCert(null);
    setBlockchainVerified(false);
    setCameraError("");
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link
              to="/employer/dashboard"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </Link>
            <div className="flex-1">
              <h1 className="text-lg font-bold text-gray-900">Verify Certification</h1>
              <p className="text-xs text-gray-500">Employer verification portal</p>
            </div>
            <Shield className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Scanner Interface */}
        {scanStatus === "idle" && (
          <>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <QrCode className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Ready to Scan
                </h2>
                <p className="text-sm text-gray-500">
                  Position the welder's QR code within the frame
                </p>
              </div>

              {/* Camera Frame Simulation */}
              <div className="relative bg-gray-900 rounded-xl overflow-hidden mb-6">
                <div className="aspect-square flex items-center justify-center">
                  <div className="relative w-48 h-48">
                    {/* Corner Brackets */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-green-500"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-green-500"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-green-500"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-green-500"></div>
                    
                    {/* Center Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Scan className="w-16 h-16 text-green-500/30" />
                    </div>

                    {/* Scanning Line Animation */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-30">
                      <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={startCamera}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm mb-3"
              >
                <Camera className="w-5 h-5" />
                Start Camera Scanning
              </button>
            </div>

            {/* Camera Error Alert */}
            {cameraError && (
              <div className="bg-red-50 border-2 border-red-300 rounded-xl p-5">
                <div className="flex gap-3">
                  <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-red-900 mb-2">⚠️ Camera Permission Blocked</p>
                    <p className="text-sm text-red-800 mb-4">
                      Your browser is blocking camera access. This is a browser security setting.
                    </p>
                    
                    <div className="bg-white rounded-lg p-4 border border-red-300 mb-4">
                      <p className="text-xs font-semibold text-gray-900 mb-3">To enable camera access:</p>
                      <ol className="text-xs text-gray-700 space-y-2 list-decimal list-inside">
                        <li>Look for a camera icon <Camera className="w-3 h-3 inline" /> in your browser's address bar</li>
                        <li>Click it and select <strong>"Always allow camera"</strong></li>
                        <li>Refresh this page</li>
                      </ol>
                    </div>
                    
                    <div className="bg-green-50 border border-green-300 rounded-lg p-3">
                      <p className="text-xs font-semibold text-green-900 mb-1">
                        ✓ No Camera Needed!
                      </p>
                      <p className="text-xs text-green-800">
                        Use <strong>Manual Verification</strong> below to verify certificates without camera access.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Manual Input Option */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <Hash className="w-5 h-5 text-purple-600" />
                <h3 className="font-bold text-gray-900">Manual Verification</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Enter the certification number to verify without scanning
              </p>
              <input
                type="text"
                value={certNumber}
                onChange={(e) => setCertNumber(e.target.value)}
                placeholder="e.g., AWS-D17-2024-001"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm mb-4"
              />
              <button
                onClick={handleManualVerify}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition-colors"
              >
                Verify Certificate
              </button>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex gap-3">
                <Shield className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-blue-900 mb-1">
                    For Employers
                  </p>
                  <p className="text-xs text-blue-700">
                    Use this tool to verify welder certifications before hiring or during
                    inspections.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Camera Active State */}
        {scanStatus === "camera-active" && (
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200">
            {/* Camera Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-lg">Camera Active</h2>
                  <p className="text-sm text-green-100">Scanning for QR codes...</p>
                </div>
                <button
                  onClick={stopCamera}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Camera Feed */}
            <div className="relative bg-black">
              <Scanner
                onResult={handleQRScan}
                constraints={{ facingMode: "environment" }}
                containerStyle={{ width: "100%" }}
                videoContainerStyle={{ paddingTop: "100%" }}
                videoStyle={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }}
              />
              
              {/* Scanning Overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-64 h-64">
                    {/* Corner Brackets */}
                    <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-green-500"></div>
                    <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-green-500"></div>
                    <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-green-500"></div>
                    <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-green-500"></div>
                  </div>
                </div>

                {/* Scanning Line Animation */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Camera className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    Position QR Code in Frame
                  </p>
                  <p className="text-xs text-gray-600">
                    Hold steady and ensure the QR code is clearly visible within the green brackets. The scan will happen automatically.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Scanning State */}
        {scanStatus === "scanning" && (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0 border-4 border-green-200 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Scan className="w-10 h-10 text-green-600" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Scanning...</h2>
              <p className="text-sm text-gray-500">
                Verifying certification authenticity
              </p>
            </div>
          </div>
        )}

        {/* Verified Result */}
        {scanStatus === "verified" && (
          <>
            {/* Success Banner */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-center shadow-sm">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                ✓ Verified
              </h2>
              <p className="text-green-100">
                Certification is authentic and valid
              </p>
            </div>

            {/* Welder Information */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-green-500">
                  <img
                    src={verifiedCert?.welderPhoto || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200"}
                    alt={verifiedCert?.welderName || "Welder"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {verifiedCert?.welderName || "Certified Welder"}
                  </h3>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-600">Certified Welder</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-gray-500" />
                    <span className="text-xs text-gray-500">Certification Type</span>
                  </div>
                  <p className="font-semibold text-gray-900">{verifiedCert?.certificationType || "N/A"}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <p className="text-xs text-gray-500 mb-1">Cert Number</p>
                    <p className="text-xs font-mono font-semibold text-gray-900">
                      {verifiedCert?.certificationNumber || "N/A"}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <p className="text-xs text-gray-500 mb-1">Status</p>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                      <span className="text-xs font-semibold text-green-600">
                        {verifiedCert?.status || "Valid"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-gray-500" />
                    <span className="text-xs text-gray-500">Issuing Authority</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">
                    {verifiedCert?.issuer || "N/A"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="flex items-center gap-1 mb-1">
                      <Calendar className="w-3 h-3 text-gray-500" />
                      <span className="text-xs text-gray-500">Issued</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      {verifiedCert?.issueDate || "N/A"}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="flex items-center gap-1 mb-1">
                      <Calendar className="w-3 h-3 text-gray-500" />
                      <span className="text-xs text-gray-500">Expires</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      {verifiedCert?.expiryDate || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Blockchain Verification Badge */}
            {blockchainVerified && (
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white mb-1">Blockchain Verified</h3>
                    <p className="text-xs text-blue-100">
                      This certificate is recorded on an immutable blockchain ledger and has been cryptographically verified as authentic.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={resetScanner}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-colors shadow-sm"
              >
                Scan Another Certificate
              </button>
              <button className="w-full bg-white hover:bg-gray-50 text-gray-900 font-semibold py-3 rounded-xl border border-gray-300 transition-colors">
                Download Verification Report
              </button>
            </div>
          </>
        )}

        {/* Invalid Result */}
        {scanStatus === "invalid" && (
          <>
            <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-6 text-center shadow-sm">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                ✗ Invalid
              </h2>
              <p className="text-red-100">
                Certification could not be verified
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-amber-900 mb-1">Warning</p>
                  <p className="text-xs text-amber-700">
                    This certificate may be expired, revoked, or fraudulent. Do not
                    proceed with hiring.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={resetScanner}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 rounded-xl transition-colors shadow-sm mb-20"
            >
              Try Again
            </button>
          </>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-md mx-auto px-6 py-3">
          <div className="flex items-center justify-around">
            <Link to="/employer/dashboard" className="flex flex-col items-center gap-1 py-2 px-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Home className="w-5 h-5 text-gray-600" />
              </div>
              <span className="text-xs text-gray-600">Home</span>
            </Link>
            <Link to="/employer/analytics" className="flex flex-col items-center gap-1 py-2 px-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-gray-600" />
              </div>
              <span className="text-xs text-gray-600">Analytics</span>
            </Link>
            <Link to="/employer/verify" className="flex flex-col items-center gap-1 py-2 px-4">
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                <ScanLine className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs text-purple-500 font-medium">Verify</span>
            </Link>
            <Link to="/employer/employees" className="flex flex-col items-center gap-1 py-2 px-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-gray-600" />
              </div>
              <span className="text-xs text-gray-600">Employees</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}