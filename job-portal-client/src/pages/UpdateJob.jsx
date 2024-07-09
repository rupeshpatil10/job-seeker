import React from 'react'
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { useState } from "react";
import { useLoaderData, useParams } from 'react-router-dom'

const UpdateJob = () => {
  const {id} = useParams();
  console.log(id);

  const {_id,jobTitle,companyName,minPrice,maxPrice,salaryType,jobLocation,postingDate,
    experienceLevel,companyLogo,employmentType,description,postedBy,skills
  } = useLoaderData(); //use data to load from //job:id

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();
  const [selectedOption, setSelectedOption] = useState(null);

  const onSubmit = (data) => {
    data.skills = selectedOption;
    // ? selectedOption.map(option => option.value) : [];
    // console.log(data);
    fetch(`http://localhost:5000/update-job/${id}`,{
      method: "PATCH",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify(data)
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if(result.acknowledged === true){

          alert("Job updated successfully!!")
        }
        reset();
      });
  };

  const options = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "Full-Stack Web Developer", label: "Full-Stack Web Developer" },
    { value: "React", label: "React" },
    { value: "Front-End Developer", label: "Front-End Developer" },
    { value: "MERN stack", label: "MERN stack" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "Graphics Designer", label: "Graphics Designer" },
    { value: "Node", label: "Node" },
    { value: "MySQL", label: "MySQL" },
    { value: "NextJs", label: "NextJs" },
    { value: "Flutter", label: "Flutter" },
    { value: "SQL", label: "SQL" },
    { value: "Dart", label: "Dart" },
    { value: "Python", label: "Python" },
    { value: "Java", label: "Java" },
    { value: "PHP", label: "PHP" },
    { value: "C#", label: "C#" },
  ];
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      {/* form */}
      <div className="bg-[#FAFAFA] py-10 px-4 lg:px-16">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 1st row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Title</label>
              <input
                type="text"
                defaultValue={jobTitle}
                {...register("jobTitle")}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Name</label>
              <input
                type="text"
                placeholder="Ex: Google"
                defaultValue={companyName}
                {...register("companyName")}
                className="create-job-input"
              />
            </div>
          </div>
          {/* 2nd row */}
          <div className="create-job-flex mt-6">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Min Salary</label>
              <input
                type="text"
                placeholder="₹ 5 LPA"
                defaultValue={minPrice}
                {...register("minPrice")}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Max Salary</label>
              <input
                type="text"
                placeholder="₹ 10 LPA"
                defaultValue={maxPrice}
                {...register("maxPrice")}
                className="create-job-input"
              />
            </div>
          </div>
          {/* 3rd row */}
          <div className="create-job-flex mt-6">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Salary Type</label>
              <select {...register("salaryType")} className="create-job-input">
                <option value={salaryType}>{salaryType}</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Location</label>
              <input
                type="text"
                placeholder="Ex: Pune"
                defaultValue={jobLocation}
                {...register("jobLocation")}
                className="create-job-input"
              />
            </div>
          </div>
          {/* 4th row */}
          <div className="create-job-flex mt-6">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Posting Date</label>
              <input
                type="date"
                placeholder="Ex: 2024-6-17"
                defaultValue={postingDate}
                {...register("postingDate")}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Experience Level</label>
              <select
                {...register("experienceLevel")}
                className="create-job-input"
              >
                <option value={experienceLevel}>{experienceLevel}</option>
                <option value="Any experience">Any experience</option>
                <option value="Internship">Internship</option>
                {/* <option value="Work remotely">Work remotely</option> */}
              </select>
            </div>
          </div>
          {/* 5th row */}
          <div className="lg:w-full w-full mt-6">
            <label className="block mb-2 text-lg">Required Skill Sets</label>
                <CreatableSelect
                  isMulti
                  options={options}
                  defaultValue={skills}
                  onChange={setSelectedOption}
                  className="create-job-input py-4"
                  
                />
          </div>
          {/* 6th row */}
          <div className="create-job-flex mt-6">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Comapny Logo</label>
              <input
                type="url"
                placeholder="Paste Your Company Logo URL:Ex:https://www.netflix.com/img1.png"
                defaultValue={companyLogo}
                {...register("companyLogo")}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Employment Type</label>
              <select
                {...register("employmentType")}
                className="create-job-input"
              >
                <option value={employmentType}>{employmentType}</option>
                <option value="Full-time">Full-time</option>
                  {/* <option value="Temporary">Temporary</option> */}
                <option value="Part-time">Part-time</option>
              </select>
            </div>
          </div>
          {/* 7th row */}
          <div className="lg:w-full w-full mt-6">
            <label className="block mb-2 text-lg">Jobs Description</label>
            <textarea
              {...register("description")}
              defaultValue={description}
              className="w-full pl-3 py-1.5 focus:outline-none placeholder:text-gray-700"
              rows={6}
              placeholder="Enter Job Description"
            />
          </div>
          {/* 8th row */}
          <div className="w-full mt-6">
            <label className="block mb-2 text-lg">Jobs Posted By</label>
            <input
              type="email"
              placeholder="your registered email@example.com"
              defaultValue={postedBy}
              {...register("postedBy")}
              className="create-job-input"
            />
          </div>
          <input
            type="submit"
            className="text-lg block bg-blue-600 text-white w-full py-2 mt-6"
          />
          
        </form>
      </div>
    </div>
  )
}

export default UpdateJob