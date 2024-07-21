import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Card from "../components/Card";
import Jobs from "./Jobs";
import Sidebar from "../Sidebar/Sidebar";
import NewsLetter from "../components/NewsLetter";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;
  const [query, setQuery] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:5000/all-jobs")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched jobs data:", data);
        setJobs(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setIsLoading(false);
      });
  }, []);
  

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  // const filteredItems = jobs.filter(
  //   (job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1
  // );
  const filteredItems = Array.isArray(jobs)
  ? jobs.filter(
      (job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1
    )
  : [];

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Pagination calculation
  const calPageRange = () => {
    const startIndex = (currentPage - 1) * jobsPerPage;
    const endIndex = startIndex + jobsPerPage;
    return { startIndex, endIndex };
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / jobsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const filteredData = (jobs, selected, query) => {
    let filteredJobs = jobs;
  
    // Filtering input items
    if (query) {
      filteredJobs = filteredItems;
    }
  
    // Category filtering
    if (selected) {
      if (Array.isArray(jobs)) {
        filteredJobs = filteredJobs.filter((job) => {
          const jobLocationMatch =
            job?.jobLocation?.toLowerCase() === selected.toLowerCase();
          const salaryTypeMatch =
            job?.salaryType?.toLowerCase() === selected.toLowerCase();
          const postingDateMatch = job?.postingDate >= selected;
          const maxPriceMatch =
            parseInt(job.maxPrice) <= parseInt(selected) ||
            parseInt(job.minPrice) <= parseInt(selected);
          const employmentTypeMatch =
            job?.employmentType?.toLowerCase() === selected.toLowerCase();
          const experienceLevelMatch =
            job?.experienceLevel?.toLowerCase() === selected.toLowerCase();
  
          return (
            jobLocationMatch ||
            experienceLevelMatch ||
            salaryTypeMatch ||
            postingDateMatch ||
            maxPriceMatch ||
            employmentTypeMatch
          );
        });
        console.log(filteredJobs);
      } else {
        console.error("jobs is not an array");
        return []; // return an empty array to avoid errors
      }
    }
  
    // const { startIndex, endIndex } = calPageRange();
    // filteredJobs = filteredJobs.slice(startIndex, endIndex);
    if (Array.isArray(filteredJobs)) {
      const { startIndex, endIndex } = calPageRange();
      filteredJobs = filteredJobs.slice(startIndex, endIndex);
    } else {
      console.error("filteredJobs is not an array");
      return []; // return an empty array to avoid errors
    }
  
    return filteredJobs.map((data, i) => <Card key={i} data={data} jobId={jobs.id} />);
  }; 

  const result = filteredData(jobs, selectedCategory, query);

  return (
    <div>
      <Banner query={query} handleInputChange={handleInputChange} />

      <div className="bg-[#F9F9F9] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
        <div className="bg-white p-4 rounded">
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </div>

        <div className="col-span-2 bg-white p-4 rounded-sm">
          {isLoading ? (
            <p className="font-medium">Loading...</p>
          ) : result.length > 0 ? (
            <Jobs result={result} />
          ) : (
            <>
              <h3 className="text-lg font-bold mb-2">{result.length} Jobs Found</h3>
              <p>No result found</p>
            </>
          )}
          {result.length > 0 && (
            <div className="flex justify-center mt-4 space-x-8">
              <button
                onClick={previousPage}
                disabled={currentPage === 1}
                className="hover:underline"
              >
                Previous
              </button>
              <span className="mx-2">
                Page {currentPage} of {Math.ceil(filteredItems.length / jobsPerPage)}
              </span>
              <button
                onClick={nextPage}
                disabled={currentPage === Math.ceil(filteredItems.length / jobsPerPage)}
                className="hover:underline"
              >
                Next
              </button>
            </div>
          )}
        </div>

        <div className="bg-white p-4 rounded">
          <NewsLetter />
        </div>
      </div>
    </div>
  );
};

export default Home;
