import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import PageHeader from "../components/PageHeader";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/job/${id}`)
      .then((res) => res.json())
      .then((data) => setJob(data));
  }, []);
  console.log(job);

  const handleApply = async () => {
    const { value: url } = await Swal.fire({
      input: "url",
      inputLabel: "URL address",
      inputPlaceholder: "Enter the URL",
    });
    if (url) {
      Swal.fire(`Entered URL: ${url}`);
    }
  };
  return (
    <div className="max-w-screen-2xl container bg-[#FAFAFA] mx-auto xl:px-24 p-4">
      <div className="max-w-screen-2xl container bg-[#FAFAFA] mx-auto xl:px-24 p-4">
        <div className="my-4">
          <div className="bg-white p-4 shadow-md rounded-md mb-4">
            <div className="flex justify-center items-center mb-4">
            <img src={job.companyLogo} alt="" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white bg-gray-700">
              {job.companyName} Job Information
            </h3>
            <p>
              <strong>Company Name:</strong> {job.companyName || "Rapido"}
            </p>
            <p>
              <strong>Website:</strong>{" "}
              <a
                href={`https://${job.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                {job.website || "www.rapido.bike"}
              </a>
            </p>
            <p>
              <strong>Position:</strong> {job.jobTitle || "Full Stack Engineer"}
            </p>
            <p>
              <strong>Location:</strong> {job.jobLocation || "Bengaluru, India"}
            </p>
            <p>
              <strong>Job Type:</strong> {job.employmentType || "FTE"}
            </p>
            <p>
              <strong>Date Posted:</strong> {job.postingDate || "2024-07-07"}
            </p>
            <p>
              <strong>Required Stream:</strong> {job.stream || "BE/B-TECH"}
            </p>
            <p>
              <strong>Batch:</strong> {job.batch || "2023 | 2022 | 2021"}
            </p>
            <p>
              <strong>Package:</strong> {job.minPrice} - {job.maxPrice}{" "}
              LPA(Expected)
            </p>
          </div>

          <div className="bg-white p-4 shadow-md rounded-md mb-4">
            <h3 className="text-xl font-semibold mb-2  text-white bg-gray-700">
              Job Description
            </h3>
            <p>
              {job.description ||
                "We are looking for a talented and experienced Full Stack Developer to join our dynamic team. As a Full Stack Developer at Rapido, you will be responsible for developing and maintaining web and mobile applications that enhance the user experience and improve operational efficiency. You will work closely with cross-functional teams to design, build, and implement scalable and robust solutions."}
            </p>
          </div>

          <button
            onClick={handleApply}
            className="bg-blue-600 text-white px-8 py-2 rounded"
          >
            Apply Now
          </button>

          <div className="bg-white p-4 shadow-md rounded-md mt-4">
            <h3 className="text-xl font-semibold mb-2">Get Job Alerts</h3>
            <div className="flex space-x-4">
              <a
                className="p-2 bg-green-500 text-white rounded"
                href="https://chat.whatsapp.com/CLI1R0HVLUQAeL1SgQRNzY"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-whatsapp"></i> WhatsApp
              </a>
              <a
                className="p-2 bg-blue-500 text-white rounded"
                href="https://www.linkedin.com/company/jobcompanyin/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin-in"></i> LinkedIn
              </a>
              <a
                className="p-2 bg-orange-500 text-white rounded"
                href="https://www.instagram.com/thejobcompany.in/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram"></i> Instagram
              </a>
              <a
                className="p-2 bg-blue-400 text-white rounded"
                href="https://t.me/+iF6AfrtRFhU1NjVl"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-telegram"></i> Telegram
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
