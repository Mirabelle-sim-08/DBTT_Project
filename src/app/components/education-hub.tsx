import { Link } from "react-router";
import {
  ArrowLeft,
  GraduationCap,
  Clock,
  Users,
  Award,
  Calendar,
  MapPin,
  ChevronRight,
  Star,
  BookOpen,
  Video,
  CheckCircle,
} from "lucide-react";

interface Course {
  id: string;
  title: string;
  provider: string;
  type: "course" | "workshop";
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
  students: number;
  format: "Online" | "In-Person" | "Hybrid";
  date?: string;
  location?: string;
  thumbnail: string;
  skills: string[];
}

export default function EducationHub() {
  const courses: Course[] = [
    {
      id: "1",
      title: "Advanced TIG Welding for Aerospace",
      provider: "AWS Training Institute",
      type: "course",
      duration: "6 weeks",
      level: "Advanced",
      rating: 4.8,
      students: 1240,
      format: "Online",
      thumbnail: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400",
      skills: ["TIG Welding", "Aerospace Standards", "Aluminum Welding"],
    },
    {
      id: "2",
      title: "FAA Welding Certification Prep",
      provider: "Aviation Skills Academy",
      type: "workshop",
      duration: "2 days",
      level: "Intermediate",
      rating: 4.9,
      students: 342,
      format: "In-Person",
      date: "Mar 22-23, 2026",
      location: "Seattle, WA",
      thumbnail: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400",
      skills: ["FAA Compliance", "Quality Control", "Documentation"],
    },
    {
      id: "3",
      title: "Composite Material Welding",
      provider: "EASA Technical Training",
      type: "course",
      duration: "4 weeks",
      level: "Intermediate",
      rating: 4.7,
      students: 856,
      format: "Hybrid",
      thumbnail: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400",
      skills: ["Composite Materials", "Advanced Techniques", "Safety"],
    },
    {
      id: "4",
      title: "Titanium Welding Masterclass",
      provider: "Boeing Training Center",
      type: "workshop",
      duration: "3 days",
      level: "Advanced",
      rating: 5.0,
      students: 189,
      format: "In-Person",
      date: "Apr 5-7, 2026",
      location: "Everett, WA",
      thumbnail: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400",
      skills: ["Titanium Welding", "Exotic Metals", "Precision Work"],
    },
    {
      id: "5",
      title: "ASME Section IX Fundamentals",
      provider: "ASME Training",
      type: "course",
      duration: "5 weeks",
      level: "Beginner",
      rating: 4.6,
      students: 2341,
      format: "Online",
      thumbnail: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400",
      skills: ["ASME Standards", "Code Compliance", "Inspection"],
    },
    {
      id: "6",
      title: "Robotic Welding Integration",
      provider: "Future Tech Institute",
      type: "workshop",
      duration: "1 day",
      level: "Intermediate",
      rating: 4.5,
      students: 567,
      format: "Hybrid",
      date: "Mar 29, 2026",
      location: "San Francisco, CA",
      thumbnail: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400",
      skills: ["Automation", "Robotics", "Programming"],
    },
  ];

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

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "Online":
        return <Video className="w-4 h-4" />;
      case "In-Person":
        return <MapPin className="w-4 h-4" />;
      case "Hybrid":
        return <BookOpen className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const workshops = courses.filter((c) => c.type === "workshop");
  const onlineCourses = courses.filter((c) => c.type === "course");

  return (
    <div className="min-h-screen bg-stone-50 pb-24">
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
          <div className="flex items-center gap-3 mb-4">
            <Link
              to="/dashboard"
              className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center hover:bg-stone-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Education Hub</h1>
              <p className="text-sm text-gray-500">Upskill your welding expertise</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-3 rounded-xl border border-orange-200">
              <GraduationCap className="w-5 h-5 text-orange-600 mb-1" />
              <p className="text-lg font-bold text-gray-900">{onlineCourses.length}</p>
              <p className="text-xs text-gray-600">Courses</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-xl border border-blue-200">
              <Calendar className="w-5 h-5 text-blue-600 mb-1" />
              <p className="text-lg font-bold text-gray-900">{workshops.length}</p>
              <p className="text-xs text-gray-600">Workshops</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 rounded-xl border border-green-200">
              <Award className="w-5 h-5 text-green-600 mb-1" />
              <p className="text-lg font-bold text-gray-900">12</p>
              <p className="text-xs text-gray-600">Completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Upcoming Workshops */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Upcoming Workshops</h2>
            <button className="text-sm font-medium text-orange-600">View All</button>
          </div>
          <div className="space-y-3">
            {workshops.map((workshop) => (
              <Link
                key={workshop.id}
                to={`/dashboard/workshop/${workshop.id}`}
                className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow block"
              >
                <div className="flex">
                  <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-10 h-10 text-orange-600" />
                  </div>
                  <div className="flex-1 p-3">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-semibold text-sm text-gray-900 line-clamp-2">
                        {workshop.title}
                      </h3>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{workshop.provider}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${getLevelColor(
                          workshop.level
                        )}`}
                      >
                        {workshop.level}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {workshop.duration}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-green-100 text-green-700">
                        FREE
                      </span>
                    </div>
                    {workshop.date && (
                      <div className="flex items-center gap-3 text-xs text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {workshop.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {workshop.location}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-center justify-center p-3">
                    <button className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center hover:bg-orange-700 transition-colors">
                      <ChevronRight className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Online Courses */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Online Courses</h2>
            <button className="text-sm font-medium text-orange-600">View All</button>
          </div>
          <div className="space-y-4">
            {onlineCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <Video className="w-12 h-12 text-gray-400" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">{course.provider}</p>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-gray-700">
                        {course.rating}
                      </span>
                    </div>
                    <span className="text-gray-300">•</span>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {course.students.toLocaleString()}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.duration}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${getLevelColor(
                          course.level
                        )}`}
                      >
                        {course.level}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full font-medium bg-green-100 text-green-700">
                        FREE
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      {getFormatIcon(course.format)}
                      <span>{course.format}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {course.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-stone-100 text-gray-700 px-2 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 safe-area-bottom">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-around">
            <Link to="/dashboard" className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 flex items-center justify-center">
                <Award className="w-6 h-6 text-gray-400" />
              </div>
              <span className="text-xs text-gray-500">Home</span>
            </Link>
            <Link to="/dashboard/wallet" className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-gray-400" />
              </div>
              <span className="text-xs text-gray-500">Wallet</span>
            </Link>
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs text-orange-600 font-medium">Learn</span>
            </div>
            <Link to="/dashboard/verify" className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 flex items-center justify-center">
                <Award className="w-6 h-6 text-gray-400" />
              </div>
              <span className="text-xs text-gray-500">Verify</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}