import React from 'react'
import InputField from '../components/InputField';

const JobPostingData = ({ handleChange}) => {
    const today = new Date();
    // console.log(today,'today');
    const yesterday = new Date(today - 24 * 60 * 60 * 1000);
    // console.log(yesterday,'yesterday');
    const weekAgo = new Date(today - 7 * 24 * 60 * 60 * 1000);
    // console.log(weekAgo,'7days');
    const monthAgo = new Date(today - 30 * 24 * 60 * 60 * 1000);
    // console.log(monthAgo,'30days');

    const monthAgoDate = monthAgo.toISOString().slice(0, 10);
    // console.log(monthAgoDate,'month');
    const weekAgoDate = weekAgo.toISOString().slice(0, 10);
    // console.log(weekAgoDate,'week');
    const yesterdayDate = yesterday.toISOString().slice(0, 10);
    // console.log(yesterdayDate,'yesterday');
    const todaydate = today.toISOString().slice(0, 10);
    // console.log(todaydate,'today');
    return (
      <div>
          <h4 className="text-lg font-medium mb-2">Date of Posting</h4>
      <div>
        <label className="sidebar-label-container">
          <input 
            type="radio" 
            name="test3" 
            id="test3" 
            value="" 
            onClick={handleChange} 
          />
          </label>
          <InputField
        handleChange={handleChange}
        value={todaydate}
        title="Recently"
        name="test3"
      />
          <InputField
        handleChange={handleChange}
        value={yesterdayDate}
        title="Last 24 hours"
        name="test3"
      />
          <InputField
        handleChange={handleChange}
        value={weekAgoDate}
        title="Last 7 Days"
        name="test3"
      />
          <InputField
        handleChange={handleChange}
        value={monthAgoDate}
        title="Last Month"
        name="test3"
      />
      
      </div>
      </div>
    )
}

export default JobPostingData