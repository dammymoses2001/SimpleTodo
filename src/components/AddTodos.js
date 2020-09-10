import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa'
export default function AddTodos() {
  return (
    <div className='addTodo'>
      <Link to='/schedular'>
        <FaPlus size='30' className='sticky' />
      </Link>
    </div>
  );
}
