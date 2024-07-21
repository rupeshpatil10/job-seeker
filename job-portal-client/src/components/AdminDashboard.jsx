import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar"; // Adjust the path according to your file structure

const AdminDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [userApplications, setUserApplications] = useState([]);
  const [currentView, setCurrentView] = useState("jobs");

  // Pagination state
  const [currentJobsPage, setCurrentJobsPage] = useState(1);
  const [currentUsersPage, setCurrentUsersPage] = useState(1);
  const [currentApplicationsPage, setCurrentApplicationsPage] = useState(1);

  const itemsPerPage = 6;
  const navigate = useNavigate();

  const getPaginatedData = (data, currentPage) => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return data.slice(indexOfFirstItem, indexOfLastItem);
  };

  const handleNextPage = (data, currentPageSetter, currentPage) => {
    if (currentPage * itemsPerPage < data.length) {
      currentPageSetter(currentPage + 1);
    }
  };

  const handlePreviousPage = (currentPageSetter, currentPage) => {
    if (currentPage > 1) {
      currentPageSetter(currentPage - 1);
    }
  };

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5000/job-appliedfor`)
        .then((response) => {
          setUserApplications(response.data);
        })
        .catch((error) => {
          console.error(error);
          alert(`Error fetching user applications: ${error.message}`);
        });
    }
  }, [user]);

  const handleStatusChange = async (application, newStatus) => {
    if (!application || !application.id) {
      console.error("Application ID is missing or invalid");
      return;
    }
    const applicationId = application.id;

    const normalizedStatus = newStatus.toLowerCase();
    try {
      const response = await axios.patch(
        `http://localhost:5000/update-application/${applicationId}`,
        {
          status: normalizedStatus,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert(`Error updating application status: ${error.message}`);
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    axios
      .get("http://localhost:5000/all-jobs")
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        console.error(error);
        alert(`Error fetching jobs: ${error.message}`);
      });

    axios
      .get("http://localhost:5000/all-users")
      .then((response) => {
        const users = response.data.map((user) => ({
          id: user._id,
          firstName: user.FirstName,
          lastName: user.LastName,
          email: user.email,
          isAdmin: user.isAdmin,
        }));
        setAllUsers(users);
      })
      .catch((error) => {
        console.error(error);
        alert(`Error fetching users: ${error.message}`);
      });
  }, []);

  const handleRemoveUser = (id) => {
    axios
      .delete(`http://localhost:5000/delete-user/${id}`)
      .then(() => {
        const updatedUsers = allUsers.filter(
          (user) => user.id.toString() !== id
        );
        setAllUsers(updatedUsers);
      })
      .catch((error) => {
        console.error(error);
        alert(`Error removing user: ${error.message}`);
      });
  };

  const handleRemoveApplicant = (id) => {
    axios
      .delete(`http://localhost:5000/delete-applicant/${id}`)
      .then(() => {
        const updatedApplications = userApplications.filter(
          (user) => user.id.toString() !== id
        );
        setUserApplications(updatedApplications);
      })
      .catch((error) => {
        console.error(error);
        alert(`Error removing user: ${error.message}`);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar setCurrentView={setCurrentView} />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {currentView === "jobs" && (
          <div className="flex flex-col">
            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
              <h2 className="text-2xl font-bold mb-4">Jobs</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow-md divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Job Title
                      </th>
                      <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Company Name
                      </th>
                      <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Experience Level
                      </th>
                      <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {getPaginatedData(jobs, currentJobsPage).map((job) => (
                      <tr key={job._id} className="hover:bg-gray-100">
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                          {job.jobTitle}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                          {job.companyName}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                          {job.experienceLevel}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                          <button
                            onClick={() => handleRemoveUser(job.id.toString())}
                            className="px-4 py-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex justify-center text-black space-x-8 mb-8">
              <button
                className="hover:underline"
                onClick={() => handlePreviousPage(setCurrentJobsPage, currentJobsPage)}
              >
                Previous
              </button>

              <button
                className="hover:underline"
                onClick={() => handleNextPage(jobs, setCurrentJobsPage, currentJobsPage)}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {currentView === "users" && (
          <div className="flex flex-col">
            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
              <h2 className="text-2xl font-bold mb-4">Users</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow-md divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        First Name
                      </th>
                      <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Last Name
                      </th>
                      <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Email
                      </th>
                      <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Admin
                      </th>
                      <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {getPaginatedData(allUsers, currentUsersPage).map((user) => (
                      <tr key={user.id} className="hover:bg-gray-100">
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                          {user.firstName}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                          {user.lastName}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                          {user.email}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                          {user.isAdmin ? "Yes" : "No"}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                          <button
                            onClick={() => handleRemoveUser(user.id.toString())}
                            className="px-4 py-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex justify-center text-black space-x-8 mb-8">
              <button
                className="hover:underline"
                onClick={() => handlePreviousPage(setCurrentUsersPage, currentUsersPage)}
              >
                Previous
              </button>

              <button
                className="hover:underline"
                onClick={() => handleNextPage(allUsers, setCurrentUsersPage, currentUsersPage)}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {currentView === "applicants" && (
          <div className="flex flex-col">
            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
              <h2 className="text-2xl font-bold mb-4">Applicants</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow-md divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Job Title
                      </th>
                      <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Company Name
                      </th>
                      <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Status
                      </th>
                      <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {getPaginatedData(userApplications, currentApplicationsPage).map(
                      (application) => (
                        <tr key={application.id} className="hover:bg-gray-100">
                          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                            {application.jobTitle}
                          </td>
                          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                            {application.companyName}
                          </td>
                          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                            {application.status}
                          </td>
                          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                            <select
                              value={application.status}
                              onChange={(e) =>
                                handleStatusChange(application, e.target.value)
                              }
                              className="mr-2 px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                              <option value="applied">Applied</option>
                              <option value="interviewed">Interviewed</option>
                              <option value="hired">Hired</option>
                              <option value="rejected">Rejected</option>
                            </select>
                            <button
                              onClick={() => handleRemoveApplicant(application.id.toString())}
                              className="px-4 py-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex justify-center text-black space-x-8 mb-8">
              <button
                className="hover:underline"
                onClick={() => handlePreviousPage(setCurrentApplicationsPage, currentApplicationsPage)}
              >
                Previous
              </button>

              <button
                className="hover:underline"
                onClick={() => handleNextPage(userApplications, setCurrentApplicationsPage, currentApplicationsPage)}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
