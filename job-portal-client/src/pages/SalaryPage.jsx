import React, { useEffect } from 'react'
import PageHeader from '../components/PageHeader'
import { useState } from 'react'

const SalaryPage = () => {
    const [searchText, setSearchText] = useState("");
    const [salary, setSalary] = useState([]);
    console.log(searchText);

    useEffect(()=>{
        fetch("salary.json")
        .then((res) => res.json())
        .then((data) => {
            setSalary(data);
        })
    },[searchText])

    const handleSearch = () => {
        const filtered = salary.filter(
            (job) =>
                job.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
        console.log(filtered);
        setSalary(filtered);
      };
  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
        <PageHeader title={"Estimate Salary"} path={"Salary"}/>
        <div className='mt-5'>
            <div className='search-box p-2 text-center  mb-2'>
                <input onChange={(e) => setSearchText(e.target.value)} type="text" name="search" id="search" className='py-2 pl-3 border focus:outline-none lg:w-6/12 mb-4 w-full' />
                <button onClick={handleSearch} className='bg-blue-600 text-white font-semibold px-8 py-2 rounded'>Search</button>
            </div>
        </div>
        {/* salary display card */}
        <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-12 my-12 items-center'>
            {
                salary.map((data) => (
                    <div key={data.id} className='shadow px-4 py-8'>
                        <h1 className='font-semibold text-xl '>{data.title}</h1>
                        <p className='my-2 font-medium text-blue-500 text-lg'>{data.salary}</p>
                        <div className='flex flex-wrap gap-4'>
                            <a href="/" className='underline'>{data.status}</a>
                            <a href="/" className='underline'>{data.skills}</a>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default SalaryPage