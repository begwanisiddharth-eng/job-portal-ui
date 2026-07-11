import { Link } from "react-router-dom";

const UserMenuLinks = ({
  isJobSeeker,
  isEmployer,
  isAdmin,
  totalAppliedJobs,
  totalSavedJobs,
  totalPostedJobs,
  onNavigate,
  className = "",
}) => {
  return (
    <>
      {isJobSeeker && (
        <div className={className}>
          <Link
            to="/profile"
            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            onClick={onNavigate}
          >
            My Profile
          </Link>
          <Link
            to="/applied-jobs"
            className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            onClick={onNavigate}
          >
            <span>Applied Jobs</span>
            {totalAppliedJobs > 0 && (
              <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs px-2 py-0.5 rounded-full">
                {totalAppliedJobs}
              </span>
            )}
          </Link>
          <Link
            to="/saved-jobs"
            className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            onClick={onNavigate}
          >
            <span>Saved Jobs</span>
            {totalSavedJobs > 0 && (
              <span className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-xs px-2 py-0.5 rounded-full">
                {totalSavedJobs}
              </span>
            )}
          </Link>
        </div>
      )}

      {isEmployer && (
        <div className={className}>
          <Link
            to="/post-job"
            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            onClick={onNavigate}
          >
            Post New Job
          </Link>
          <Link
            to="/employer/jobs"
            className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            onClick={onNavigate}
          >
            <span>My Job Postings</span>
            {totalPostedJobs > 0 && (
              <span className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 text-xs px-2 py-0.5 rounded-full">
                {totalPostedJobs}
              </span>
            )}
          </Link>
        </div>
      )}

      {isAdmin && (
        <div className={className}>
          <Link
            to="/admin/companies"
            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            onClick={onNavigate}
          >
            Company Management
          </Link>
          <Link
            to="/admin/employers"
            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            onClick={onNavigate}
          >
            Employer Management
          </Link>
          <Link
            to="/admin/contact-messages"
            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            onClick={onNavigate}
          >
            Contact Messages
          </Link>
        </div>
      )}
    </>
  );
};

export default UserMenuLinks;
