import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useJobs } from "../context/JobContext";
import UserMenuLinks from "./UserMenuLinks";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, logout, isAuthenticated, isEmployer, isJobSeeker, isAdmin } = useAuth();
  const { totalAppliedJobs, totalSavedJobs, totalPostedJobs } = useJobs();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate("/", { replace: true });
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 shadow-2xl shadow-primary-500/10 dark:shadow-primary-400/10 border-b border-gray-200/20 dark:border-gray-700/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="block">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-purple-600 blur-lg opacity-20 rounded-lg"></div>
                  <h1 className="relative text-3xl font-black bg-gradient-to-r from-primary-600 via-purple-600 to-primary-800 bg-clip-text text-transparent">
                    JobPortal
                  </h1>
                </div>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-12 flex items-center space-x-1">
                <Link
                  to="/jobs"
                  className={`relative group px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                    isActive("/jobs")
                      ? "text-primary-600 dark:text-primary-400"
                      : "text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400"
                  }`}
                >
                  <span className="relative z-10">Find Jobs</span>
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 rounded-xl transition-all duration-300 transform group-hover:scale-105 ${
                      isActive("/jobs")
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  ></div>
                </Link>
                <Link
                  to="/companies"
                  className={`relative group px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                    isActive("/companies")
                      ? "text-primary-600 dark:text-primary-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                  }`}
                >
                  <span className="relative z-10">Companies</span>
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 rounded-xl transition-all duration-300 transform group-hover:scale-105 ${
                      isActive("/companies")
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  ></div>
                </Link>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-3">
              <button
                onClick={toggleTheme}
                className="relative group p-3 rounded-xl text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 transform hover:scale-110"
                aria-label="Toggle theme"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="relative z-10">
                  {theme === "dark" ? (
                    <svg
                      className="w-5 h-5 transition-transform duration-300 group-hover:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 transition-transform duration-300 group-hover:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    </svg>
                  )}
                </div>
              </button>

              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 rounded-xl hover:from-primary-100 hover:to-purple-100 dark:hover:from-primary-800/30 dark:hover:to-purple-800/30 transition-all duration-300"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {user.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {user.name}
                      </div>
                      <div className="text-xs text-primary-600 dark:text-primary-400">
                        {isEmployer ? user.company : user.title}
                      </div>
                    </div>
                    <svg
                      className="w-4 h-4 text-gray-600 dark:text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {user.email}
                        </p>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${
                            isAdmin
                              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                              : isEmployer
                              ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          }`}
                        >
                          {isAdmin ? "Admin" : isEmployer ? "Employer" : "Job Seeker"}
                        </span>
                      </div>

                      <UserMenuLinks
                        isJobSeeker={isJobSeeker}
                        isEmployer={isEmployer}
                        isAdmin={isAdmin}
                        totalAppliedJobs={totalAppliedJobs}
                        totalSavedJobs={totalSavedJobs}
                        totalPostedJobs={totalPostedJobs}
                        onNavigate={() => setShowUserMenu(false)}
                        className="py-2 border-b border-gray-200 dark:border-gray-700"
                      />

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="relative group px-5 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 rounded-xl"
                  >
                    <span className="relative z-10">Log In</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  </Link>
                  <Link
                    to="/register"
                    className="relative group overflow-hidden bg-gradient-to-r from-primary-600 via-primary-700 to-purple-700 hover:from-primary-700 hover:via-primary-800 hover:to-purple-800 text-white px-7 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-primary-500/25"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10">Sign Up</span>
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <svg
                className="block h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/jobs"
                className="text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 block px-3 py-2 text-base font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Find Jobs
              </Link>
              <Link
                to="/companies"
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 block px-3 py-2 text-base font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Companies
              </Link>

              {isAuthenticated ? (
                <div className="px-3 py-2">
                  <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {user.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {user.name}
                      </div>
                      <div className="text-xs text-primary-600 dark:text-primary-400">
                        {isEmployer ? user.company : user.title}
                      </div>
                    </div>
                  </div>

                  <UserMenuLinks
                    isJobSeeker={isJobSeeker}
                    isEmployer={isEmployer}
                    isAdmin={isAdmin}
                    totalAppliedJobs={totalAppliedJobs}
                    totalSavedJobs={totalSavedJobs}
                    totalPostedJobs={totalPostedJobs}
                    onNavigate={() => setIsMenuOpen(false)}
                    className="mt-2 space-y-1"
                  />

                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                      navigate("/", { replace: true });
                    }}
                    className="w-full text-left px-3 py-2 mt-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-base font-medium"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4 px-3 py-2">
                  <Link
                    to="/login"
                    className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 text-base font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              <div className="px-3 py-2">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {theme === "dark" ? "☀️" : "🌙"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
