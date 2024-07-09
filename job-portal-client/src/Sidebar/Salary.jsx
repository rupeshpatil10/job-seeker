import React from 'react';
import Button from './Button';
import InputField from '../components/InputField';

const Salary = ({ handleChange, handleClick }) => {
  return (
    <div>
      <h4 className='text-lg font-medium mb-2'>Salary</h4>
      <div className='mb-4'>
        <Button onClick={handleClick} value="Hourly" title="Hourly" />
        <Button onClick={handleClick} value="Monthly" title="Monthly" />
        <Button onClick={handleClick} value="Yearly" title="Yearly" />
      </div>
      <label className="sidebar-label-container">
        <input 
          type="radio" 
          name="test2" 
          value="" 
          id='test2'
          onChange={handleChange} 
        />
      </label>
      <InputField
        handleChange={handleChange}
        value={3.5}
        title="< 3.5 LPA"
        name="test2"
      />
      <InputField
        handleChange={handleChange}
        value={16}
        title="< 16 LPA"
        name="test2"
      />
      <InputField
        handleChange={handleChange}
        value={25}
        title="< 25 LPA"
        name="test2"
      />
      <InputField
        handleChange={handleChange}
        value={30}
        title="< 30 LPA"
        name="test2"
      />
    </div>
  );
}

export default Salary;
