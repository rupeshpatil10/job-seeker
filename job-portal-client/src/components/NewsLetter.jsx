import React from 'react'
import { FaEnvelope, FaRocket } from 'react-icons/fa6'
import { FiMail } from 'react-icons/fi'

const NewsLetter = () => {
  return (
    <div>
        <div>
            <h3 className='text-lg font-bold mb-2 flex items-center gap-2'>
                <FaEnvelope/>
                Email for Jobs
            </h3>
            <p className='text-primary/75 text-base mb-4'>Lorem ipsum dolor, sit amet , eos velit quas deleniti vitae officia sed ull   am repellendus ipsam.</p>
            <div className='w-full text-primary/75 space-y-4'>
                <input type="email" name="email" id="" placeholder='Enter your email'className='block w-full pl-3 py-2 border rounded focus:outline-none'/>
                <input type="submit" value="Subscribe" id="" className='block w-full pl-3 py-2 border focus:outline-none
                bg-blue-600 text-white mt-4 cursor-pointer font-semibold'/>
            </div>
        </div>
        <div className='mt-20'>
            <h3 className='text-lg font-bold mb-2 flex items-center gap-2'>
                <FaRocket/>
                Get Notified faster
            </h3>
            <p className='text-primary/75 text-base mb-4'>Lorem ipsum dolor, sit amet , eos velit quas deleniti vitae officia sed ullam repellendus ipsam.</p>
            <div className='w-full text-primary/75 space-y-4'>
                <input type="submit" value={"Upload your resume"} id=""className='block w-full pl-3 py-2 border rounded focus:outline-none
                bg-blue-600 text-white mt-4 cursor-pointer font-semibold'/>
            </div>
        </div>
    </div>
  )
}

export default NewsLetter