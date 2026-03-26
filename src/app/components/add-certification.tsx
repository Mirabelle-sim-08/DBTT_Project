import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import {
  ArrowLeft,
  Upload,
  FileText,
  Calendar,
  Shield,
  Award,
  Building,
  CheckCircle,
  AlertCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  Wallet,
  Lock,
  User,
} from "lucide-react";
import { useCertificates } from "../context/CertificateContext";
import { useBlockchain } from "../context/BlockchainContext";
import { blockchainService } from "../blockchain/blockchain-service";
import WalletConnect from "./wallet-connect";

export default function AddCertification() {
  const navigate = useNavigate();
  const { addCertificate } = useCertificates();
  const { blockchainState, connectWallet, disconnectWallet } = useBlockchain();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showIssueDatePicker, setShowIssueDatePicker] = useState(false);
  const [showExpiryDatePicker, setShowExpiryDatePicker] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [expiryMonth, setExpiryMonth] = useState(new Date().getMonth());
  const [expiryYear, setExpiryYear] = useState(new Date().getFullYear());

  const [formData, setFormData] = useState({
    welderName: "",
    ssoNumber: "",
    badgeNumber: "",
    stampNumber: "",
    certName: "",
    issuer: "",
    location: "",
    certNumber: "",
    issueDate: "",
    expiryDate: "",
    authorizingSignature: "",
  });

  const [certNumberError, setCertNumberError] = useState("");

  const issuingAuthorities = [
    "CAAS - Civil Aviation Authority of Singapore",
    "EASA - European Aviation Safety Agency",
    "ICAO - International Civil Aviation Organization",
    "FAA - Federal Aviation Administration",
    "AWS - American Welding Society",
    "Other",
  ];

  // Validation function for certification number based on issuer
  const validateCertNumber = (issuer: string, certNumber: string): string => {
    if (!certNumber) return "";
    
    const validationRules: { [key: string]: { prefix: string; label: string } } = {
      "AWS - American Welding Society": { prefix: "AWS-", label: "AWS" },
      "CAAS - Civil Aviation Authority of Singapore": { prefix: "CAAS-", label: "CAAS" },
      "EASA - European Aviation Safety Agency": { prefix: "EASA-", label: "EASA" },
      "ICAO - International Civil Aviation Organization": { prefix: "ICAO-", label: "ICAO" },
      "FAA - Federal Aviation Administration": { prefix: "FAA-", label: "FAA" },
    };

    const rule = validationRules[issuer];
    if (rule && !certNumber.startsWith(rule.prefix)) {
      return `Certification number must start with "${rule.prefix}" for ${rule.label}`;
    }
    
    return "";
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate certification number when it changes or when issuer changes
    if (name === "certNumber") {
      const error = validateCertNumber(formData.issuer, value);
      setCertNumberError(error);
    } else if (name === "issuer") {
      const error = validateCertNumber(value, formData.certNumber);
      setCertNumberError(error);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call and then add certificate
    setTimeout(() => {
      // Add the certificate to context with all new fields
      addCertificate({
        welderName: formData.welderName,
        ssoNumber: formData.ssoNumber,
        badgeNumber: formData.badgeNumber,
        stampNumber: formData.stampNumber,
        certificationType: formData.certName,
        certificationNumber: formData.certNumber,
        issuer: formData.issuer,
        location: formData.location,
        issueDate: formData.issueDate,
        expiryDate: formData.expiryDate,
        authorizingSignature: formData.authorizingSignature,
        fileName: uploadedFile?.name,
        fileUrl: filePreview || undefined,
      });

      setIsSubmitting(false);
      setShowSuccess(true);

      // Redirect after success
      setTimeout(() => {
        navigate("/dashboard/wallet");
      }, 2000);
    }, 2000);
  };

  const handleDateSelect = (day: number) => {
    const date = new Date(selectedYear, selectedMonth, day);
    const formattedDate = date.toISOString().split("T")[0];
    setFormData((prev) => ({ ...prev, issueDate: formattedDate }));
    setShowIssueDatePicker(false);
  };

  const handleExpiryDateSelect = (day: number) => {
    const date = new Date(expiryYear, expiryMonth, day);
    const formattedDate = date.toISOString().split("T")[0];
    setFormData((prev) => ({ ...prev, expiryDate: formattedDate }));
    setShowExpiryDatePicker(false);
  };

  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return "Select date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const prevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const nextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const prevExpiryMonth = () => {
    if (expiryMonth === 0) {
      setExpiryMonth(11);
      setExpiryYear(expiryYear - 1);
    } else {
      setExpiryMonth(expiryMonth - 1);
    }
  };

  const nextExpiryMonth = () => {
    if (expiryMonth === 11) {
      setExpiryMonth(0);
      setExpiryYear(expiryYear + 1);
    } else {
      setExpiryMonth(expiryMonth + 1);
    }
  };

  const isFormValid =
    formData.certName &&
    formData.issuer &&
    formData.certNumber &&
    formData.issueDate &&
    formData.expiryDate &&
    uploadedFile &&
    !certNumberError;

  useEffect(() => {
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(uploadedFile);
    } else {
      setFilePreview(null);
    }
  }, [uploadedFile]);

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard/wallet"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </Link>
            <div className="flex-1">
              <h1 className="text-lg font-bold text-gray-900">Add Certification</h1>
              <p className="text-xs text-gray-500">Upload new credential</p>
            </div>
            <Shield className="w-6 h-6 text-orange-500" />
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        {showSuccess ? (
          // Success Message
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-200">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Certificate Added!
            </h2>
            <p className="text-gray-600 mb-6">
              Your certification is being verified and will appear in your wallet
              shortly.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-sm font-medium text-blue-900 mb-1">
                    Verification in Progress
                  </p>
                  <p className="text-xs text-blue-700">
                    Your certificate will be verified by the issuing authority within
                    24-48 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Welder Information Section */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-orange-500" />
                Welder Information
              </h3>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Welder Name
                  </label>
                  <input
                    type="text"
                    name="welderName"
                    value={formData.welderName}
                    onChange={handleInputChange}
                    placeholder="e.g., John Doe"
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      SSO NO
                    </label>
                    <input
                      type="text"
                      name="ssoNumber"
                      value={formData.ssoNumber}
                      onChange={handleInputChange}
                      placeholder="SSO-123456"
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      BADGE NO
                    </label>
                    <input
                      type="text"
                      name="badgeNumber"
                      value={formData.badgeNumber}
                      onChange={handleInputChange}
                      placeholder="BADGE-789"
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      STAMP NO
                    </label>
                    <input
                      type="text"
                      name="stampNumber"
                      value={formData.stampNumber}
                      onChange={handleInputChange}
                      placeholder="STAMP-345"
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Certification Details Section */}
            <div className="bg-gray-100 px-3 py-2 rounded-lg">
              <h3 className="font-bold text-gray-700 text-sm">Certification Details</h3>
            </div>

            {/* Certification Type (was certName) */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-3">
                <Award className="w-4 h-4 text-orange-500" />
                Certification Type
              </label>
              <input
                type="text"
                name="certName"
                value={formData.certName}
                onChange={handleInputChange}
                placeholder="e.g., TIG WELDING (NICKEL ALLOY)"
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Location/Facility */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-3">
                <Building className="w-4 h-4 text-orange-500" />
                Location/Facility
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., GE AVIATION, ENGINE SERVICES-SINGAPORE"
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Issuing Authority */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-3">
                <Building className="w-4 h-4 text-orange-500" />
                Issuing Authority
              </label>
              <select
                name="issuer"
                value={formData.issuer}
                onChange={handleInputChange}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                required
              >
                <option value="" className="bg-white">
                  Select authority...
                </option>
                {issuingAuthorities.map((authority) => (
                  <option key={authority} value={authority} className="bg-white">
                    {authority}
                  </option>
                ))}
              </select>
            </div>

            {/* Certification Number */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-3">
                <FileText className="w-4 h-4 text-orange-500" />
                Certification Number
              </label>
              <input
                type="text"
                name="certNumber"
                value={formData.certNumber}
                onChange={handleInputChange}
                placeholder="e.g., AWS-AER-2024-001"
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400 font-mono focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                required
              />
              {certNumberError && (
                <p className="text-xs text-red-500 mt-1">{certNumberError}</p>
              )}
            </div>

            {/* Authorizing Signature */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-3">
                <Shield className="w-4 h-4 text-orange-500" />
                Authorizing Signature
              </label>
              <input
                type="text"
                name="authorizingSignature"
                value={formData.authorizingSignature}
                onChange={handleInputChange}
                placeholder="e.g., John Smith (Inspector)"
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-3">
                  <Calendar className="w-4 h-4 text-orange-500" />
                  Issue Date
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="issueDate"
                    value={formatDisplayDate(formData.issueDate)}
                    readOnly
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-gray-900 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowIssueDatePicker(!showIssueDatePicker)}
                    className="absolute top-0 right-0 p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Calendar className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                {showIssueDatePicker && (
                  <div className="absolute z-10 bg-white border border-gray-300 rounded-lg shadow-lg mt-1">
                    <div className="flex items-center justify-between px-4 py-2 bg-gray-100">
                      <button
                        type="button"
                        onClick={prevMonth}
                        className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                      </button>
                      <p className="text-sm font-medium text-gray-900">
                        {monthNames[selectedMonth]} {selectedYear}
                      </p>
                      <button
                        type="button"
                        onClick={nextMonth}
                        className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        <ChevronRight className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                    <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-500">
                      <p>Sun</p>
                      <p>Mon</p>
                      <p>Tue</p>
                      <p>Wed</p>
                      <p>Thu</p>
                      <p>Fri</p>
                      <p>Sat</p>
                    </div>
                    <div className="grid grid-cols-7 text-center text-sm font-medium">
                      {[...Array(getFirstDayOfMonth(selectedMonth, selectedYear))]
                        .map((_, index) => (
                          <div key={index} className="h-8"></div>
                        ))}
                      {[...Array(getDaysInMonth(selectedMonth, selectedYear))]
                        .map((_, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => handleDateSelect(index + 1)}
                            className={`h-8 ${
                              index + 1 === new Date().getDate() &&
                              selectedMonth === new Date().getMonth() &&
                              selectedYear === new Date().getFullYear()
                                ? "bg-blue-500 text-white"
                                : "bg-white text-gray-900"
                            } hover:bg-gray-100 rounded-lg transition-colors`}
                          >
                            {index + 1}
                          </button>
                        ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-3">
                  <Calendar className="w-4 h-4 text-orange-500" />
                  Expiry Date
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="expiryDate"
                    value={formatDisplayDate(formData.expiryDate)}
                    readOnly
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-gray-900 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowExpiryDatePicker(!showExpiryDatePicker)}
                    className="absolute top-0 right-0 p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Calendar className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                {showExpiryDatePicker && (
                  <div className="absolute z-10 bg-white border border-gray-300 rounded-lg shadow-lg mt-1">
                    <div className="flex items-center justify-between px-4 py-2 bg-gray-100">
                      <button
                        type="button"
                        onClick={prevExpiryMonth}
                        className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                      </button>
                      <p className="text-sm font-medium text-gray-900">
                        {monthNames[expiryMonth]} {expiryYear}
                      </p>
                      <button
                        type="button"
                        onClick={nextExpiryMonth}
                        className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        <ChevronRight className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                    <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-500">
                      <p>Sun</p>
                      <p>Mon</p>
                      <p>Tue</p>
                      <p>Wed</p>
                      <p>Thu</p>
                      <p>Fri</p>
                      <p>Sat</p>
                    </div>
                    <div className="grid grid-cols-7 text-center text-sm font-medium">
                      {[...Array(getFirstDayOfMonth(expiryMonth, expiryYear))]
                        .map((_, index) => (
                          <div key={index} className="h-8"></div>
                        ))}
                      {[...Array(getDaysInMonth(expiryMonth, expiryYear))]
                        .map((_, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => handleExpiryDateSelect(index + 1)}
                            className={`h-8 ${
                              index + 1 === new Date().getDate() &&
                              expiryMonth === new Date().getMonth() &&
                              expiryYear === new Date().getFullYear()
                                ? "bg-blue-500 text-white"
                                : "bg-white text-gray-900"
                            } hover:bg-gray-100 rounded-lg transition-colors`}
                          >
                            {index + 1}
                          </button>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* File Upload */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-3">
                <Upload className="w-4 h-4 text-orange-500" />
                Upload Certificate
              </label>

              {!uploadedFile ? (
                <label className="block cursor-pointer">
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                  />
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-orange-500 hover:bg-orange-50 transition-all">
                    <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      Click to upload certificate
                    </p>
                    <p className="text-xs text-gray-500">
                      PDF, JPG or PNG (MAX. 10MB)
                    </p>
                  </div>
                </label>
              ) : (
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {uploadedFile.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>

                  {/* Document Preview */}
                  {filePreview && (
                    <div className="relative">
                      {uploadedFile.type.startsWith('image/') ? (
                        <div 
                          className="relative rounded-lg overflow-hidden border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => setShowPreviewModal(true)}
                        >
                          <img
                            src={filePreview}
                            alt="Document preview"
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center">
                            <div className="bg-white/90 rounded-full p-2 opacity-0 hover:opacity-100 transition-opacity">
                              <Eye className="w-5 h-5 text-gray-900" />
                            </div>
                          </div>
                        </div>
                      ) : uploadedFile.type === 'application/pdf' ? (
                        <div 
                          className="bg-gray-100 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-200 transition-colors"
                          onClick={() => setShowPreviewModal(true)}
                        >
                          <FileText className="w-16 h-16 text-orange-500 mx-auto mb-3" />
                          <p className="text-sm font-medium text-gray-900 mb-1">PDF Document</p>
                          <button
                            type="button"
                            className="inline-flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700 font-medium"
                          >
                            <Eye className="w-4 h-4" />
                            Click to preview
                          </button>
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-blue-900 mb-1">
                    Verification Required
                  </p>
                  <p className="text-xs text-blue-700">
                    All certificates are verified with the issuing authority before
                    being added to your wallet. This process typically takes 24-48
                    hours.
                  </p>
                </div>
              </div>
            </div>

            {/* Blockchain Wallet Connection */}
            <div>
              <WalletConnect />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className={`w-full py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-sm ${
                isFormValid && !isSubmitting
                  ? "bg-orange-500 hover:bg-orange-600 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  <span>Add Certification</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => navigate("/dashboard/wallet")}
              className="w-full bg-white hover:bg-gray-50 text-gray-900 font-medium py-3 rounded-xl border border-gray-300 transition-colors"
            >
              Cancel
            </button>
          </form>
        )}
      </div>

      {/* Issue Date Picker Popup */}
      {showIssueDatePicker && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-4">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl w-full max-w-md p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Select Issue Date</h3>
              <button
                onClick={() => setShowIssueDatePicker(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Month/Year Navigation */}
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={prevMonth}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <div className="text-center">
                <p className="font-semibold text-gray-900">
                  {monthNames[selectedMonth]} {selectedYear}
                </p>
              </div>
              <button
                type="button"
                onClick={nextMonth}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="mb-4">
              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs font-medium text-gray-500 py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-2">
                {/* Empty cells for days before month starts */}
                {Array.from({ length: getFirstDayOfMonth(selectedMonth, selectedYear) }).map(
                  (_, index) => (
                    <div key={`empty-${index}`} className="aspect-square"></div>
                  )
                )}

                {/* Actual days */}
                {Array.from({ length: getDaysInMonth(selectedMonth, selectedYear) }).map(
                  (_, index) => {
                    const day = index + 1;
                    const isToday =
                      day === new Date().getDate() &&
                      selectedMonth === new Date().getMonth() &&
                      selectedYear === new Date().getFullYear();
                    
                    const selectedDate = formData.issueDate ? new Date(formData.issueDate) : null;
                    const isSelected =
                      selectedDate &&
                      day === selectedDate.getDate() &&
                      selectedMonth === selectedDate.getMonth() &&
                      selectedYear === selectedDate.getFullYear();

                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => handleDateSelect(day)}
                        className={`aspect-square rounded-lg text-sm font-medium transition-colors ${
                          isSelected
                            ? "bg-orange-500 text-white"
                            : isToday
                            ? "bg-orange-100 text-orange-700"
                            : "hover:bg-gray-100 text-gray-900"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowIssueDatePicker(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-3 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setShowIssueDatePicker(false)}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-xl transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Expiry Date Picker Popup */}
      {showExpiryDatePicker && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-4">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl w-full max-w-md p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Select Expiry Date</h3>
              <button
                onClick={() => setShowExpiryDatePicker(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Month/Year Navigation */}
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={prevExpiryMonth}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <div className="text-center">
                <p className="font-semibold text-gray-900">
                  {monthNames[expiryMonth]} {expiryYear}
                </p>
              </div>
              <button
                type="button"
                onClick={nextExpiryMonth}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="mb-4">
              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs font-medium text-gray-500 py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-2">
                {/* Empty cells for days before month starts */}
                {Array.from({ length: getFirstDayOfMonth(expiryMonth, expiryYear) }).map(
                  (_, index) => (
                    <div key={`empty-${index}`} className="aspect-square"></div>
                  )
                )}

                {/* Actual days */}
                {Array.from({ length: getDaysInMonth(expiryMonth, expiryYear) }).map(
                  (_, index) => {
                    const day = index + 1;
                    const isToday =
                      day === new Date().getDate() &&
                      expiryMonth === new Date().getMonth() &&
                      expiryYear === new Date().getFullYear();
                    
                    const selectedDate = formData.expiryDate ? new Date(formData.expiryDate) : null;
                    const isSelected =
                      selectedDate &&
                      day === selectedDate.getDate() &&
                      expiryMonth === selectedDate.getMonth() &&
                      expiryYear === selectedDate.getFullYear();

                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => handleExpiryDateSelect(day)}
                        className={`aspect-square rounded-lg text-sm font-medium transition-colors ${
                          isSelected
                            ? "bg-orange-500 text-white"
                            : isToday
                            ? "bg-orange-100 text-orange-700"
                            : "hover:bg-gray-100 text-gray-900"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowExpiryDatePicker(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-3 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setShowExpiryDatePicker(false)}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-xl transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Document Preview</h3>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Document Content */}
            {uploadedFile && filePreview && (
              <div className="relative">
                {uploadedFile.type.startsWith('image/') ? (
                  <img
                    src={filePreview}
                    alt="Document preview"
                    className="w-full h-auto"
                  />
                ) : uploadedFile.type === 'application/pdf' ? (
                  <iframe
                    src={filePreview}
                    className="w-full h-96"
                    title="PDF Preview"
                  />
                ) : null}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}