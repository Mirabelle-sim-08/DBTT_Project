import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  MessageCircle,
  X,
  Send,
  User,
  Bot,
  Sparkles,
  Award,
  GraduationCap,
  QrCode,
  ScanLine,
  FileText,
  TrendingUp,
} from "lucide-react";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
  quickActions?: QuickAction[];
}

interface QuickAction {
  label: string;
  action: () => void;
  icon?: React.ReactNode;
}

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Initial greeting when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addBotMessage(
          "Hi! I'm your WelderCert Assistant. I can help you navigate the app, manage your certifications, and answer questions about compliance. How can I help you today?",
          [
            {
              label: "View my certifications",
              action: () => navigate("/dashboard/wallet"),
              icon: <Award className="w-4 h-4" />,
            },
            {
              label: "Add new certification",
              action: () => navigate("/dashboard/add-certification"),
              icon: <FileText className="w-4 h-4" />,
            },
            {
              label: "Find courses",
              action: () => navigate("/dashboard/education"),
              icon: <GraduationCap className="w-4 h-4" />,
            },
          ]
        );
      }, 500);
    }
  }, [isOpen]);

  const addBotMessage = (content: string, quickActions?: QuickAction[]) => {
    const botMessage: Message = {
      id: Date.now().toString(),
      type: "bot",
      content,
      timestamp: new Date(),
      quickActions,
    };
    setMessages((prev) => [...prev, botMessage]);
  };

  const addUserMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
  };

  const handleQuickAction = (action: () => void, label: string) => {
    addUserMessage(label);
    action();
    setTimeout(() => {
      addBotMessage("I've navigated you to that page. Is there anything else I can help with?");
    }, 500);
  };

  const getResponse = (userInput: string): { response: string; actions?: QuickAction[] } => {
    const input = userInput.toLowerCase();

    // Certification related
    if (input.includes("certification") || input.includes("cert")) {
      if (input.includes("add") || input.includes("upload") || input.includes("new")) {
        return {
          response: "To add a new certification, you can upload the certificate document and fill in the details. I can take you there now!",
          actions: [
            {
              label: "Add Certification",
              action: () => navigate("/dashboard/add-certification"),
              icon: <FileText className="w-4 h-4" />,
            },
            {
              label: "View My Certs",
              action: () => navigate("/dashboard/wallet"),
              icon: <Award className="w-4 h-4" />,
            },
          ],
        };
      }
      if (input.includes("view") || input.includes("see") || input.includes("show")) {
        return {
          response: "You can view all your certifications in your Certification Wallet. Each certificate shows its status, expiration date, and verification details.",
          actions: [
            {
              label: "Open Wallet",
              action: () => navigate("/dashboard/wallet"),
              icon: <Award className="w-4 h-4" />,
            },
          ],
        };
      }
      if (input.includes("expire") || input.includes("expiring") || input.includes("renew")) {
        return {
          response: "You can check your compliance dashboard to see which certifications are expiring soon and get renewal recommendations.",
          actions: [
            {
              label: "Check Compliance",
              action: () => navigate("/dashboard/compliance"),
              icon: <TrendingUp className="w-4 h-4" />,
            },
            {
              label: "Find Renewal Courses",
              action: () => navigate("/dashboard/education"),
              icon: <GraduationCap className="w-4 h-4" />,
            },
          ],
        };
      }
      return {
        response: "Your certifications are stored securely in your digital wallet. You can view them, share via QR code, or add new ones anytime.",
        actions: [
          {
            label: "View Certifications",
            action: () => navigate("/dashboard/wallet"),
            icon: <Award className="w-4 h-4" />,
          },
          {
            label: "Add New Cert",
            action: () => navigate("/dashboard/add-certification"),
            icon: <FileText className="w-4 h-4" />,
          },
        ],
      };
    }

    // QR Code / Sharing
    if (input.includes("qr") || input.includes("share") || input.includes("show employer")) {
      return {
        response: "You can share your certifications with employers by generating a QR code. They can scan it to instantly verify your credentials. Go to your Certification Wallet and select any certificate to generate its QR code.",
        actions: [
          {
            label: "Go to Wallet",
            action: () => navigate("/dashboard/wallet"),
            icon: <QrCode className="w-4 h-4" />,
          },
        ],
      };
    }

    // Verification
    if (input.includes("verify") || input.includes("scan") || input.includes("employer verify")) {
      return {
        response: "Employers can verify your certifications using the verification scanner. You can also use it to verify other welders' credentials.",
        actions: [
          {
            label: "Open Scanner",
            action: () => navigate("/dashboard/verify"),
            icon: <ScanLine className="w-4 h-4" />,
          },
        ],
      };
    }

    // Education / Courses
    if (
      input.includes("course") ||
      input.includes("training") ||
      input.includes("learn") ||
      input.includes("education") ||
      input.includes("workshop")
    ) {
      return {
        response: "Great! The Education Hub has free online courses and in-person workshops to help you upskill and renew certifications. All courses are FREE!",
        actions: [
          {
            label: "Browse Courses",
            action: () => navigate("/dashboard/education"),
            icon: <GraduationCap className="w-4 h-4" />,
          },
        ],
      };
    }

    // Compliance
    if (
      input.includes("compliance") ||
      input.includes("expiring") ||
      input.includes("renewal") ||
      input.includes("action plan")
    ) {
      return {
        response: "Your Compliance Dashboard shows which certifications are expiring soon, provides renewal recommendations, and gives you a personalized action plan to stay compliant.",
        actions: [
          {
            label: "View Compliance",
            action: () => navigate("/dashboard/compliance"),
            icon: <TrendingUp className="w-4 h-4" />,
          },
        ],
      };
    }

    // Navigation help
    if (
      input.includes("how to") ||
      input.includes("where") ||
      input.includes("navigate") ||
      input.includes("find")
    ) {
      return {
        response: "Here are the main sections of WelderCert:\n\n• **Certification Wallet** - View all your certificates\n• **Education Hub** - Free courses & workshops\n• **Compliance Dashboard** - Track expirations\n• **QR Code Sharing** - Share credentials instantly\n• **Verification Scanner** - Verify other welders\n\nWhat would you like to access?",
        actions: [
          {
            label: "Wallet",
            action: () => navigate("/dashboard/wallet"),
            icon: <Award className="w-4 h-4" />,
          },
          {
            label: "Education",
            action: () => navigate("/dashboard/education"),
            icon: <GraduationCap className="w-4 h-4" />,
          },
          {
            label: "Compliance",
            action: () => navigate("/dashboard/compliance"),
            icon: <TrendingUp className="w-4 h-4" />,
          },
        ],
      };
    }

    // Free courses
    if (input.includes("free") || input.includes("cost") || input.includes("price")) {
      return {
        response: "All courses and workshops on WelderCert are 100% FREE! This includes online courses, in-person workshops, and certification renewal training.",
        actions: [
          {
            label: "Browse Free Courses",
            action: () => navigate("/dashboard/education"),
            icon: <GraduationCap className="w-4 h-4" />,
          },
        ],
      };
    }

    // Help / General
    if (
      input.includes("help") ||
      input.includes("what can you do") ||
      input.includes("features")
    ) {
      return {
        response: "I can help you with:\n\n✓ **Finding and navigating** to any section\n✓ **Managing certifications** (add, view, share)\n✓ **Tracking compliance** and renewals\n✓ **Finding courses** and workshops\n✓ **Understanding features** like QR codes and verification\n\nJust ask me anything!",
      };
    }

    // Dashboard
    if (input.includes("dashboard") || input.includes("home") || input.includes("main")) {
      return {
        response: "Your dashboard shows your digital ID card, quick actions, and key information. It's your home base for accessing all features.",
        actions: [
          {
            label: "Go to Dashboard",
            action: () => navigate("/dashboard"),
          },
        ],
      };
    }

    // Default response
    return {
      response: "I'm here to help! You can ask me about:\n\n• Viewing or adding certifications\n• Finding courses and workshops\n• Checking compliance status\n• Sharing credentials via QR code\n• Verifying other welders\n• Navigating the app\n\nWhat would you like to know?",
      actions: [
        {
          label: "My Certifications",
          action: () => navigate("/dashboard/wallet"),
          icon: <Award className="w-4 h-4" />,
        },
        {
          label: "Free Courses",
          action: () => navigate("/dashboard/education"),
          icon: <GraduationCap className="w-4 h-4" />,
        },
        {
          label: "Compliance Check",
          action: () => navigate("/dashboard/compliance"),
          icon: <TrendingUp className="w-4 h-4" />,
        },
      ],
    };
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userInput = inputValue.trim();
    addUserMessage(userInput);
    setInputValue("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      setIsTyping(false);
      const { response, actions } = getResponse(userInput);
      addBotMessage(response, actions);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 right-4 z-50 w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center group"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-0 right-0 left-0 md:left-auto md:right-4 md:bottom-4 z-50 md:w-96 bg-white rounded-t-2xl md:rounded-2xl shadow-2xl flex flex-col h-[80vh] md:h-[600px] border border-stone-200">
          {/* Header */}
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-4 rounded-t-2xl md:rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold">WelderCert Assistant</h3>
                <p className="text-xs text-orange-100">Always here to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.type === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gradient-to-br from-orange-500 to-orange-600 text-white"
                  }`}
                >
                  {message.type === "user" ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>

                {/* Message Content */}
                <div
                  className={`flex-1 ${
                    message.type === "user" ? "flex justify-end" : "flex justify-start"
                  }`}
                >
                  <div className="max-w-[85%]">
                    <div
                      className={`rounded-2xl px-4 py-2 ${
                        message.type === "user"
                          ? "bg-blue-500 text-white"
                          : "bg-white border border-stone-200 text-gray-900"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                    </div>

                    {/* Quick Actions */}
                    {message.quickActions && message.quickActions.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {message.quickActions.map((action, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleQuickAction(action.action, action.label)}
                            className="w-full bg-white hover:bg-orange-50 border border-orange-200 text-orange-700 rounded-lg px-3 py-2 text-sm font-medium transition-colors flex items-center gap-2 justify-center"
                          >
                            {action.icon}
                            <span>{action.label}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    <p className="text-xs text-gray-400 mt-1 px-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-stone-200 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-stone-200 rounded-b-2xl md:rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-400 text-center mt-2">
              Press Enter to send • Shift+Enter for new line
            </p>
          </div>
        </div>
      )}
    </>
  );
}
