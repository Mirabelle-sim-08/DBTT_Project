import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function RedirectToDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check localStorage for user role to redirect to correct dashboard
    const userRole = localStorage.getItem("userRole");
    
    if (userRole === "employer") {
      navigate("/employer/dashboard", { replace: true });
    } else {
      // Default to employee dashboard
      navigate("/employee/dashboard", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
}