import React from 'react';
import { Link } from 'react-router-dom';

export default function Help() {
  return (
    <div className='text-center'>
      <h2>How to use the App</h2>
      <ul>
        <li>
          Click once to todo list, you are done with
        </li>
        <li>
          you can check your todo and time it will expires
        </li>
      </ul>
      <Link to='/todos' >
        <button className='btn btn-dark '>Back</button>
      </Link>

    </div>
  );
}
