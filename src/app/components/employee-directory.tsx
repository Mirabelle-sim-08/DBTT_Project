import { Link } from "react-router";
import { ArrowLeft, Search, Filter, Users, CheckCircle, XCircle, Clock, Download } from "lucide-react";

export default function EmployeeDirectory() {
  const employees = [
    {
      id: 1,
      name: "James Wilson",
      role: "Senior Welder",
      email: "james.w@aviationinc.com",
      phone: "+1 (555) 123-4567",
      certifications: 8,
      compliant: true,
      expiringCount: 0,
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "Lead Welder",
      email: "sarah.c@aviationinc.com",
      phone: "+1 (555) 234-5678",
      certifications: 12,
      compliant: true,
      expiringCount: 1,
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    },
    {
      id: 3,
      name: "Marcus Rodriguez",
      role: "Welder",
      email: "marcus.r@aviationinc.com",
      phone: "+1 (555) 345-6789",
      certifications: 5,
      compliant: false,
      expiringCount: 2,
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
    },
    {
      id: 4,
      name: "Emily Thompson",
      role: "Junior Welder",
      email: "emily.t@aviationinc.com",
      phone: "+1 (555) 456-7890",
      certifications: 4,
      compliant: true,
      expiringCount: 1,
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Link
                to="/employer/dashboard"
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Employee Directory</h1>
                <p className="text-sm text-gray-500">247 total employees</p>
              </div>
            </div>
            <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search employees by name, email, or role..."
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-700">Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-600">Total</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">247</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-600">Compliant</span>
            </div>
            <p className="text-2xl font-bold text-green-600">189</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-amber-600" />
              <span className="text-sm text-gray-600">Expiring Soon</span>
            </div>
            <p className="text-2xl font-bold text-amber-600">34</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <XCircle className="w-5 h-5 text-red-600" />
              <span className="text-sm text-gray-600">Non-Compliant</span>
            </div>
            <p className="text-2xl font-bold text-red-600">24</p>
          </div>
        </div>

        {/* Employee List */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Employee</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Contact</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Certifications</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={employee.photo}
                          alt={employee.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold text-gray-900">{employee.name}</p>
                          <p className="text-sm text-gray-500">{employee.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm text-gray-700">{employee.email}</p>
                        <p className="text-sm text-gray-500">{employee.phone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">{employee.certifications} Total</p>
                        {employee.expiringCount > 0 && (
                          <p className="text-sm text-amber-600">
                            {employee.expiringCount} expiring soon
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {employee.compliant ? (
                        <div className="inline-flex items-center gap-2 bg-green-100 px-3 py-1.5 rounded-full">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-semibold text-green-700">Compliant</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-2 bg-red-100 px-3 py-1.5 rounded-full">
                          <XCircle className="w-4 h-4 text-red-600" />
                          <span className="text-sm font-semibold text-red-700">Non-Compliant</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
