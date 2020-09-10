import React, { useContext } from 'react';
import { SchedularContext } from '../context/context';

const filters = [
  'Check Todo Time',
  'All',
  "Today's Task",
  'Completed',
  'UnComplete',
];
export default function Todoinput() {
  //Function to link contextApi
  const context = useContext(SchedularContext);
  //destructing of context
  const { handleFilter } = context;
  //handle Change in Input
  const handleChange = (event) => {
    handleFilter(event.target.value);
  };

  return (
    <select className='filter' name='filter' onChange={handleChange}>
      {filters.map((filter, index) => (
        <option key={index} value={filter}>
          {filter}
        </option>
      ))}
    </select>
  );
}
