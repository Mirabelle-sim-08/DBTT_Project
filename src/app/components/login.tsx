import { useState } from "react";
import { useNavigate } from "react-router";
import { Shield, Mail, Lock, Eye, EyeOff, Briefcase, HardHat, Building2 } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [userRole, setUserRole] = useState<"employee" | "employer">("employee");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    company: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Store the user role in localStorage
      localStorage.setItem("userRole", userRole);

      if (isLogin) {
        // For demo purposes, just navigate based on role
        // In production, this would call Supabase auth
        setTimeout(() => {
          if (userRole === "employee") {
            navigate("/employee/dashboard");
          } else {
            navigate("/employer/dashboard");
          }
        }, 1000);
      } else {
        // Sign up
        setTimeout(() => {
          if (userRole === "employee") {
            navigate("/employee/dashboard");
          } else {
            navigate("/employer/dashboard");
          }
        }, 1000);
      }
    } catch (err) {
      setError("Authentication failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-stone-50 flex flex-col">
      {/* Status Bar */}
      <div className="bg-white px-4 pt-3 pb-2">
        <div className="max-w-md mx-auto flex items-center justify-between text-xs">
          <span className="font-semibold">9:41</span>
          <div className="flex items-center gap-1">
            <div className="flex gap-0.5">
              <div className="w-0.5 h-2 bg-gray-900 rounded-full"></div>
              <div className="w-0.5 h-2 bg-gray-900 rounded-full"></div>
              <div className="w-0.5 h-2 bg-gray-900 rounded-full"></div>
              <div className="w-0.5 h-2 bg-gray-400 rounded-full"></div>
            </div>
            <svg className="w-4 h-3" viewBox="0 0 16 12" fill="none">
              <rect
                x="0.5"
                y="0.5"
                width="15"
                height="11"
                rx="2"
                stroke="currentColor"
              />
              <rect x="16" y="3" width="1.5" height="6" rx="0.5" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Logo/Branding */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              WelderCert
            </h1>
            <p className="text-gray-500">
              Digital Certification Wallet for Aviation Welders
            </p>
          </div>

          {/* Toggle between Login/Sign Up */}
          <div className="bg-stone-100 rounded-xl p-1 mb-6 flex">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                isLogin
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                !isLogin
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              I am a:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setUserRole("employee")}
                className={`p-4 rounded-xl border-2 transition-all ${
                  userRole === "employee"
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 ${
                  userRole === "employee" ? "bg-orange-500" : "bg-orange-100"
                }`}>
                  <HardHat className={`w-6 h-6 ${
                    userRole === "employee" ? "text-white" : "text-orange-600"
                  }`} />
                </div>
                <p className={`font-semibold text-sm ${
                  userRole === "employee" ? "text-orange-700" : "text-gray-900"
                }`}>
                  Welder
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Manage certifications
                </p>
              </button>

              <button
                type="button"
                onClick={() => setUserRole("employer")}
                className={`p-4 rounded-xl border-2 transition-all ${
                  userRole === "employer"
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 ${
                  userRole === "employer" ? "bg-purple-500" : "bg-purple-100"
                }`}>
                  <Building2 className={`w-6 h-6 ${
                    userRole === "employer" ? "text-white" : "text-purple-600"
                  }`} />
                </div>
                <p className={`font-semibold text-sm ${
                  userRole === "employer" ? "text-purple-700" : "text-gray-900"
                }`}>
                  Employer
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Verify workforce
                </p>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="John Smith"
                  className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required={!isLogin}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="john.smith@example.com"
                  className="w-full pl-11 pr-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company/Organization
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    placeholder="Aviation Inc."
                    className="w-full pl-11 pr-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            {isLogin && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full font-semibold py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                userRole === "employee" 
                  ? "bg-orange-600 hover:bg-orange-700" 
                  : "bg-purple-600 hover:bg-purple-700"
              } text-white`}
            >
              {loading ? "Please wait..." : isLogin ? `Login as ${userRole === "employee" ? "Welder" : "Employer"}` : "Create Account"}
            </button>
          </form>

          {/* Features */}
          {!isLogin && (
            <div className="mt-8 space-y-3">
              <p className="text-sm font-medium text-gray-700 text-center mb-4">
                What you'll get:
              </p>
              <div className="space-y-3">
                {userRole === "employee" ? [
                  "Store all your certifications digitally",
                  "Share credentials instantly via QR code",
                  "Access FREE upskilling courses & workshops",
                  "Blockchain-verified credentials",
                ] : [
                  "Scan and verify employee certifications",
                  "Track workforce compliance in real-time",
                  "AI-powered fraud detection system",
                  "Advanced analytics and reporting",
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}