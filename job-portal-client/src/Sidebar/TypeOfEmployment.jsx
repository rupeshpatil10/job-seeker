import React from 'react'
import InputField from '../components/InputField';

const TypeOfEmployment = ({handleChange}) => {
    return (<div>
      <h4 className="text-lg font-medium mb-2">Work Experience</h4>
      <div>
        <label className="sidebar-label-container">
          <input 
            type="checkbox" 
            name="test4" 
            id="test4"
            value="" 
            onChange={handleChange} 
          />
        </label>
        <InputField
          handleChange={handleChange}
          value="Full-time"
          title="Full-time"
          name="test4"
        />
        <InputField
          handleChange={handleChange}
          value="Temporary"
          title="Temporary"
          name="test4"
        />
        <InputField
          handleChange={handleChange}
          value="part-time"
          title="part-time"
          name="test4"
        />
      </div>
    </div>
  );
  };

export default TypeOfEmployment