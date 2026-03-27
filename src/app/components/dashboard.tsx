import { Link } from "react-router";
import {
  Award,
  Briefcase,
  Users,
  GraduationCap,
  MessageCircle,
  Home,
  Settings,
  Bell,
  User,
  Calendar,
  MapPin,
  QrCode,
  CheckCircle,
  TrendingUp,
  AlertTriangle,
  ScanLine,
} from "lucide-react";

export default function Dashboard() {
  // Always use employee routes since this is the employee dashboard
  const baseRoute = "/employee";
  
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-stone-50 px-4 pb-4 pt-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Hey Marcus 👋</h1>
              <p className="text-sm text-gray-500 mt-0.5">Let's get to work</p>
            </div>
            <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
              <Settings className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 pb-24">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Welcome, Marcus.</h1>

        {/* Digital Welder ID Card */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 mb-6 shadow-lg">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/30">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200"
                  alt="Marcus Chen"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Marcus Chen</h2>
                <p className="text-xs text-orange-100">Certified Welder</p>
              </div>
            </div>
            <div className="bg-white/20 rounded-lg p-2">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <p className="text-xs text-orange-100 mb-1">Welder ID</p>
              <p className="text-sm font-bold text-white">WLD-2024-8293</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <p className="text-xs text-orange-100 mb-1">Active Certs</p>
              <p className="text-sm font-bold text-white">5 Valid</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-orange-100">
              <Calendar className="w-3 h-3" />
              <span>Member since Jan 2024</span>
            </div>
            <Link
              to={`${baseRoute}/qr/all`}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-1 transition-colors"
            >
              <QrCode className="w-4 h-4 text-white" />
              <span className="text-white text-xs font-medium">Share</span>
            </Link>
          </div>
        </div>

        {/* Compliance Alert */}
        <Link
          to={`${baseRoute}/compliance`}
          className="block bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-5 mb-6 shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-white text-base">
                  2 Certifications Expiring Soon
                </h3>
              </div>
              <p className="text-sm text-red-100 mb-3">
                Your AWS D17.1 cert expires in 23 days. Take action now to stay compliant.
              </p>
              <div className="flex items-center gap-2 text-white">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-semibold">View Analytics & Recommendations</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Feature Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Link
            to={`${baseRoute}/wallet`}
            className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-3">
              <Award className="w-7 h-7 text-orange-500" />
            </div>
            <h3 className="font-semibold text-gray-900 text-sm">Certification</h3>
            <p className="text-xs text-gray-500 mt-0.5">Wallet</p>
          </Link>

          <Link
            to={`${baseRoute}/education`}
            className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-3">
              <GraduationCap className="w-7 h-7 text-purple-500" />
            </div>
            <h3 className="font-semibold text-gray-900 text-sm">Education Hub</h3>
            <p className="text-xs text-gray-500 mt-0.5">Courses</p>
          </Link>

          <Link
            to={`${baseRoute}/wallet`}
            className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-3">
              <Users className="w-7 h-7 text-yellow-600" />
            </div>
            <h3 className="font-semibold text-gray-900 text-sm">Community</h3>
            <p className="text-xs text-gray-500 mt-0.5">Connect</p>
          </Link>

          <Link
            to={`${baseRoute}/employer`}
            className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
              <Briefcase className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 text-sm">Employer</h3>
            <p className="text-xs text-gray-500 mt-0.5">Workforce</p>
          </Link>
        </div>

        {/* Workshops Section */}
        <div className="mb-6">
          <h2 className="font-semibold text-gray-900 mb-3">Workshops</h2>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-xs text-gray-500 mb-2">Upcoming:</p>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-sm mb-1">
                  Mastering TIG Welding for Aerospace
                </h3>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>Tomorrow, 5pm</span>
                  <span>•</span>
                  <span>MetalWorks Lab</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action */}
        <Link
          to={`${baseRoute}/verify`}
          className="block bg-gradient-to-r from-orange-400 to-orange-500 rounded-2xl p-4 text-white shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Award className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="font-bold text-sm mb-0.5">Employer Verification</p>
              <p className="text-xs text-orange-100">Scan welder credentials</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-md mx-auto px-6 py-3">
          <div className="flex items-center justify-around">
            <Link to={`${baseRoute}/dashboard`} className="flex flex-col items-center gap-1 py-2 px-4">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs text-orange-500 font-medium">Home</span>
            </Link>
            <Link to={`${baseRoute}/wallet`} className="flex flex-col items-center gap-1 py-2 px-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Award className="w-5 h-5 text-gray-600" />
              </div>
              <span className="text-xs text-gray-600">Wallet</span>
            </Link>
            <Link to={`${baseRoute}/education`} className="flex flex-col items-center gap-1 py-2 px-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-gray-600" />
              </div>
              <span className="text-xs text-gray-600">Learn</span>
            </Link>
            <Link to={`${baseRoute}/verify`} className="flex flex-col items-center gap-1 py-2 px-4">
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