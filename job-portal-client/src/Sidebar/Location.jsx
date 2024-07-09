import React from "react";
import InputField from "../components/InputField";

const Location = ({ handleChange }) => {
  return (<div>
    <h4 className="text-lg font-medium mb-2">Location</h4>
    <div>
      <label className="sidebar-label-container">
        <input 
          type="radio" 
          name="test" 
          id="test"
          value="" 
          onChange={handleChange} 
        />
      </label>
      <InputField
        handleChange={handleChange}
        value="Pune"
        title="Pune"
        name="test"
      />
      <InputField
        handleChange={handleChange}
        value="Banglore"
        title="Banglore"
        name="test"
      />
      <InputField
        handleChange={handleChange}
        value="Mumbai"
        title="Mumbai"
        name="test"
      />
      <InputField
        handleChange={handleChange}
        value="Nashik"
        title="Nashik"
        name="test"
      />
    </div>
  </div>
);
};

export default Location;
