import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import PostJob from '../pages/PostJob';
import MyJobs from '../pages/MyJobs';
import SalaryPage from '../pages/SalaryPage';
import UpdateJob from '../pages/UpdateJob';
import JobDetails from '../pages/JobDetails';
import Login from '../components/Login';
import Signup from '../components/Signup';
import AdminDashboard from '../components/AdminDashboard';
import ApplicationForm from '../pages/ApplicationForm';
import AppliedFor from '../pages/AppliedFor';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/post-job', element: <PostJob /> },
      { path: '/my-job', element: <MyJobs /> },
      { path: '/salary', element: <SalaryPage /> },
      { path: '/application-job/:id', element: <ApplicationForm />,
        loader: ({ params }) => fetch(`http://localhost:5000/job/${params.id}`)
      },
      { path: '/applied-for', element: <AppliedFor /> },
      {
        path: '/admin-dashboard',
        element:<AdminDashboard/>
      },
      {
        path: '/edit-job/:id',
        element: <UpdateJob />,
        loader: ({ params }) => fetch(`http://localhost:5000/job/${params.id}`)
      },
      { path: '/job/:id', element: <JobDetails /> }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  }
]);

const AppRouter = () => (
  <RouterProvider router={router} />
);

export default AppRouter;