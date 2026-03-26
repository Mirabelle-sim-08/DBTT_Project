import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { HardHat, Building2, RefreshCw, X } from "lucide-react";

export default function RoleSwitcher() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  
  // Determine current role from URL
  const currentRole = location.pathname.startsWith("/employer") ? "employer" : "employee";
  
  const switchRole = (newRole: "employee" | "employer") => {
    localStorage.setItem("userRole", newRole);
    
    if (newRole === "employee") {
      navigate("/employee/dashboard");
    } else {
      navigate("/employer/dashboard");
    }
    
    setShowModal(false);
  };

  return (
    <>
      {/* Floating Role Switcher Button */}
      <button
        onClick={() => setShowModal(true)}
        className={`fixed bottom-24 right-4 z-40 p-4 rounded-full shadow-lg transition-all hover:scale-110 ${
          currentRole === "employee"
            ? "bg-orange-500 hover:bg-orange-600"
            : "bg-purple-500 hover:bg-purple-600"
        } text-white`}
      >
        <RefreshCw className="w-6 h-6" />
      </button>

      {/* Role Switcher Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-4">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl w-full max-w-md p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Switch Role</h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-6">
              Select which perspective you'd like to view the app from
            </p>

            <div className="space-y-3">
              {/* Employee Option */}
              <button
                onClick={() => switchRole("employee")}
                className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                  currentRole === "employee"
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-300 hover:border-orange-300 hover:bg-orange-50"
                }`}
              >
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <HardHat className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-bold text-gray-900 mb-1">Employee (Welder)</h4>
                  <p className="text-xs text-gray-600">
                    Manage certifications, wallet, and compliance
                  </p>
                </div>
                {currentRole === "employee" && (
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </button>

              {/* Employer Option */}
              <button
                onClick={() => switchRole("employer")}
                className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                  currentRole === "employer"
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-300 hover:border-purple-300 hover:bg-purple-50"
                }`}
              >
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-bold text-gray-900 mb-1">Employer</h4>
                  <p className="text-xs text-gray-600">
                    Verify certifications, analytics, fraud detection
                  </p>
                </div>
                {currentRole === "employer" && (
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </button>
            </div>

            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex gap-3">
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">i</span>
                </div>
                <div>
                  <p className="text-xs text-blue-900 font-medium mb-1">
                    Testing Mode
                  </p>
                  <p className="text-xs text-blue-700">
                    This switcher is for testing both perspectives. In production, users are assigned one role.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
