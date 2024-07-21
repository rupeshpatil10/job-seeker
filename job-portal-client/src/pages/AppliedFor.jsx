import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppliedFor = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/job-appliedfor') // Replace with your actual API endpoint
      .then(response => {
        setApplications(response.data);
        console.log('Response data:', response.data);
      })
      .catch(error => {
        setError('Failed to fetch applications');
        console.error(error);
      });
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'applied':
        return 'bg-blue-100 text-blue-800';
      case 'interviewed':
        return 'bg-yellow-100 text-yellow-800';
      case 'hired':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 pt-6 md:p-6 lg:p-12 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Applied For</h2>
      {error && (
        <p className="text-red-500 text-sm mb-4">{error}</p>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-gray-200">
            {applications.map((application) => (
              <tr key={application.id} className="hover:bg-gray-100 transition duration-150 ease-in-out">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{application.fullName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{application.jobTitle}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.companyName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyle(application.status)}`}>
                    {application.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppliedFor;
