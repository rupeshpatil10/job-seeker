import React from "react";

const Sidebar = ({ setCurrentView }) => {
  return (
    <div className="w-1/4 bg-gray-200 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Menu</h2>
      <ul>
        <li>
          <button
            onClick={() => setCurrentView("jobs")}
            className="w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-300 rounded"
          >
            Jobs
          </button>
        </li>
        <li>
          <button
            onClick={() => setCurrentView("users")}
            className="w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-300 rounded"
          >
            Users
          </button>
        </li>
        <li>
          <button
            onClick={() => setCurrentView("applicants")}
            className="w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-300 rounded"
          >
            Applicants
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
