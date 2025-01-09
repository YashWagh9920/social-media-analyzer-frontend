import React from "react";
import {
  PieChart,
  TrendingUp,
  LineChart,
  Table,
  Shield,
  Clock,
  Database,
  Github,
  Twitter,
  Linkedin,
  Mail
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/social.jpg";

const theme = {
  primary: "from-indigo-600 via-purple-600 to-violet-600",
  secondary: "from-indigo-100 to-purple-100",
  accent: "text-indigo-600",
  hover: "hover:bg-indigo-50",
  card: "bg-gradient-to-br from-indigo-100 to-indigo-200",
  icon: "text-indigo-500",
  text: "text-indigo-800",
};

const LandingPage = () => {
  const navigate = useNavigate();

  const mockLineChart = (
    <div
      className={`relative w-full h-48 bg-gradient-to-r ${theme.secondary} rounded-lg overflow-hidden 
                    transform transition-all duration-500 hover:scale-105`}
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <TrendingUp className={`w-24 h-24 ${theme.icon} animate-bounce`} />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section
        className={`px-4 py-24 bg-gradient-to-r ${theme.primary} text-white transition-all duration-500`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-[fadeIn_1s_ease-in]">
              <span
                className="inline-block px-3 py-1 mb-4 text-lg font-semibold bg-white/20 text-white rounded-full
                             transform transition-all duration-300 hover:scale-105"
              >
                Advanced Analytics
              </span>
              <h1 className="text-5xl font-bold mb-6 animate-[slideInLeft_1s_ease-out]">
                Transform Your Social Media Insights
              </h1>
              <p className="text-xl text-gray-100 mb-8">
                Comprehensive analytics dashboard featuring engagement metrics,
                post distribution analysis, and trend tracking across all your
                social platforms.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => navigate("/dashboard")}
                  className={`px-6 py-3 bg-white ${theme.accent} rounded-lg ${theme.hover} font-bold transform transition-all duration-300 hover:scale-105`}
                >
                  Start Free Trial
                </button>
              </div>
            </div>
            <div className="relative animate-[slideInRight_1s_ease-out] hidden lg:block">
                <img
                  src={`${logo}`}
                  alt="Analytics Dashboard Preview"
                  className="w-screen h-auto rounded-3xl shadow-lg transform transition-all duration-500 hover:scale-105"
                />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-3xl font-bold text-center mb-16 ${theme.text} animate-[fadeIn_1s_ease-in]`}>
            Powerful Analytics Tools
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: PieChart,
                title: "Post Type Analysis",
                desc: "Interactive pie charts showing distribution",
              },
              {
                icon: LineChart,
                title: "Engagement Trends",
                desc: "Track comments, likes, and shares",
              },
              {
                icon: Table,
                title: "Data Explorer",
                desc: "Comprehensive data tables with sorting",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className={`bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 
                              transition-all duration-500 hover:shadow-xl
                              animate-[fadeIn_1s_ease-in]`}
              >
                <div
                  className={`mb-4 ${theme.card} w-12 h-12 rounded-lg 
                                flex items-center justify-center`}
                >
                  <feature.icon className={`h-6 w-6 ${theme.accent}`} />
                </div>
                <h3 className={`text-xl font-bold mb-2 ${theme.text}`}>{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="px-4 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-[slideInLeft_1s_ease-out]">
              <h2 className={`text-3xl font-bold mb-6 ${theme.text}`}>Interactive Dashboard</h2>
              <p className="text-xl text-gray-600 mb-8">
                Get a bird's eye view of your social media performance with our
                intuitive dashboard.
              </p>
              <ul className="space-y-4">
                {[
                  { icon: Shield, text: "Secure data handling" },
                  { icon: Clock, text: "Historical trend analysis" },
                  { icon: Database, text: "CSV data import capability" },
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 transform transition-all duration-300 hover:translate-x-2"
                  >
                    <item.icon className={`h-5 w-5 ${theme.icon}`} />
                    <span className={theme.text}>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4 animate-[slideInRight_1s_ease-out]">
              {mockLineChart}
              <div className="grid grid-cols-2 gap-4">
                <div
                  className={`${theme.card} rounded-lg p-6 transform transition-all duration-300 hover:scale-105`}
                >
                  <h3 className={`font-bold text-xl ${theme.text}`}>200+</h3>
                  <p className={theme.accent}>Posts Analyzed</p>
                </div>
                <div
                  className={`${theme.card} rounded-lg p-6 transform transition-all duration-300 hover:scale-105`}
                >
                  <h3 className={`font-bold text-xl ${theme.text}`}>4 Types</h3>
                  <p className={theme.accent}>Of Charts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`text-white bg-gradient-to-r ${theme.primary} py-7 `}>
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Analytics Pro</h3>
              <p className="text-white">
                Transform your social media insights with comprehensive analytics
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-white hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-white hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-white hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-white hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-white hover:text-white transition-colors">
                  <Github className="h-6 w-6" />
                </a>
                <a href="#" className="text-white hover:text-white transition-colors">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-white hover:text-white transition-colors">
                  <Linkedin className="h-6 w-6" />
                </a>
                <a href="#" className="text-white hover:text-white transition-colors">
                  <Mail className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-white/80">
            <p>&copy; 2025 Analytics Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;