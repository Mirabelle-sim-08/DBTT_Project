import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  Users,
  Award,
  CheckCircle,
  User,
  Mail,
  Phone,
  Briefcase,
} from "lucide-react";

interface Workshop {
  id: string;
  title: string;
  provider: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
  students: number;
  format: "In-Person" | "Hybrid";
  date: string;
  location: string;
  skills: string[];
  description: string;
  prerequisites: string[];
  instructor: string;
  spotsLeft: number;
}

export default function WorkshopSignup() {
  const { workshopId } = useParams();
  const navigate = useNavigate();
  const [registered, setRegistered] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    experience: "",
  });

  // Mock workshop data - in production this would come from API/context
  const workshops: Record<string, Workshop> = {
    "2": {
      id: "2",
      title: "FAA Welding Certification Prep",
      provider: "Aviation Skills Academy",
      duration: "2 days",
      level: "Intermediate",
      rating: 4.9,
      students: 342,
      format: "In-Person",
      date: "Mar 22-23, 2026",
      location: "Seattle, WA",
      skills: ["FAA Compliance", "Quality Control", "Documentation"],
      description:
        "Comprehensive preparation workshop for FAA welding certification. This intensive 2-day session covers all aspects of FAA compliance, quality control procedures, and proper documentation requirements for aviation welding.",
      prerequisites: [
        "Basic welding experience (minimum 1 year)",
        "Understanding of welding processes",
        "Safety certification",
      ],
      instructor: "Robert Chen, AWS Certified Welding Inspector",
      spotsLeft: 8,
    },
    "4": {
      id: "4",
      title: "Titanium Welding Masterclass",
      provider: "Boeing Training Center",
      duration: "3 days",
      level: "Advanced",
      rating: 5.0,
      students: 189,
      format: "In-Person",
      date: "Apr 5-7, 2026",
      location: "Everett, WA",
      skills: ["Titanium Welding", "Exotic Metals", "Precision Work"],
      description:
        "Advanced masterclass focusing on titanium welding techniques for aerospace applications. Learn from Boeing experts about exotic metal welding, precision techniques, and industry best practices.",
      prerequisites: [
        "Advanced welding certification",
        "5+ years experience",
        "TIG welding proficiency",
      ],
      instructor: "Dr. Sarah Martinez, Boeing Senior Welding Engineer",
      spotsLeft: 3,
    },
    "6": {
      id: "6",
      title: "Robotic Welding Integration",
      provider: "Future Tech Institute",
      duration: "1 day",
      level: "Intermediate",
      rating: 4.5,
      students: 567,
      format: "Hybrid",
      date: "Mar 29, 2026",
      location: "San Francisco, CA",
      skills: ["Automation", "Robotics", "Programming"],
      description:
        "Introduction to robotic welding systems and automation integration. Learn how to program, operate, and maintain robotic welding equipment in modern manufacturing environments.",
      prerequisites: [
        "Basic welding knowledge",
        "Computer literacy",
        "Open to learning new technology",
      ],
      instructor: "James Park, Automation Systems Specialist",
      spotsLeft: 12,
    },
  };

  const workshop = workshops[workshopId || ""];

  if (!workshop) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Workshop not found</p>
          <Link
            to="/dashboard/education"
            className="text-orange-600 hover:text-orange-700 font-medium"
          >
            Back to Education Hub
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegistered(true);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-700";
      case "Intermediate":
        return "bg-orange-100 text-orange-700";
      case "Advanced":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (registered) {
    return (
      <div className="min-h-screen bg-stone-50">
        {/* Status Bar */}
        <div className="bg-white px-4 pt-3 pb-2 border-b border-stone-200">
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

        {/* Success Message */}
        <div className="max-w-md mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Registration Successful!
            </h1>
            <p className="text-gray-600 mb-6">
              You're registered for {workshop.title}
            </p>

            <div className="bg-stone-50 rounded-xl p-4 mb-6 text-left">
              <div className="flex items-center gap-3 mb-3">
                <Calendar className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-xs text-gray-500">Date</p>
                  <p className="font-semibold text-gray-900">{workshop.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="font-semibold text-gray-900">{workshop.location}</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-6">
              A confirmation email has been sent to <strong>{formData.email}</strong> with
              all the details and preparation materials.
            </p>

            <div className="space-y-3">
              <button
                onClick={() => navigate("/dashboard/education")}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-xl transition-colors"
              >
                Back to Education Hub
              </button>
              <button
                onClick={() => navigate("/dashboard")}
                className="w-full bg-stone-100 hover:bg-stone-200 text-gray-900 font-semibold py-3 rounded-xl transition-colors"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 pb-8">
      {/* Status Bar */}
      <div className="bg-white px-4 pt-3 pb-2 border-b border-stone-200">
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

      {/* Header */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-md mx-auto px-4 py-4">
          <Link
            to="/dashboard/education"
            className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center hover:bg-stone-200 transition-colors inline-flex mb-4"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{workshop.title}</h1>
          <p className="text-sm text-gray-500">{workshop.provider}</p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Workshop Details Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-200">
          <div className="flex items-center gap-2 mb-4">
            <span
              className={`text-xs px-2 py-1 rounded-full font-medium ${getLevelColor(
                workshop.level
              )}`}
            >
              {workshop.level}
            </span>
            <span className="text-xs px-2 py-1 rounded-full font-medium bg-green-100 text-green-700">
              FREE
            </span>
            <span className="text-xs px-2 py-1 rounded-full font-medium bg-blue-100 text-blue-700">
              {workshop.format}
            </span>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-xs text-gray-500">Date & Time</p>
                <p className="font-semibold text-gray-900">{workshop.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-xs text-gray-500">Location</p>
                <p className="font-semibold text-gray-900">{workshop.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-xs text-gray-500">Duration</p>
                <p className="font-semibold text-gray-900">{workshop.duration}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-xs text-gray-500">Spots Available</p>
                <p className="font-semibold text-gray-900">
                  {workshop.spotsLeft} spots left
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-xs text-gray-500">Instructor</p>
                <p className="font-semibold text-gray-900">{workshop.instructor}</p>
              </div>
            </div>
          </div>

          {workshop.spotsLeft <= 5 && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-orange-700 font-medium">
                ⚠️ Only {workshop.spotsLeft} spots remaining!
              </p>
            </div>
          )}

          <div className="mb-4">
            <h3 className="font-semibold text-gray-900 mb-2">About This Workshop</h3>
            <p className="text-sm text-gray-600">{workshop.description}</p>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold text-gray-900 mb-2">What You'll Learn</h3>
            <div className="flex flex-wrap gap-2">
              {workshop.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-stone-100 text-gray-700 px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Prerequisites</h3>
            <ul className="space-y-1">
              {workshop.prerequisites.map((prereq, idx) => (
                <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{prereq}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Register for Workshop</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Smith"
                  className="w-full pl-11 pr-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john.smith@example.com"
                  className="w-full pl-11 pr-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(555) 123-4567"
                  className="w-full pl-11 pr-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company/Organization
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Aviation Inc."
                  className="w-full pl-11 pr-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Welding Experience (Years)
              </label>
              <select
                value={formData.experience}
                onChange={(e) =>
                  setFormData({ ...formData, experience: e.target.value })
                }
                className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Select experience level</option>
                <option value="0-1">Less than 1 year</option>
                <option value="1-3">1-3 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5-10">5-10 years</option>
                <option value="10+">10+ years</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              Complete Registration
            </button>

            <p className="text-xs text-gray-500 text-center">
              By registering, you agree to receive workshop updates and materials via email.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}