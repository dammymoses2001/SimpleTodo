import React from 'react';
import { Link } from 'react-router-dom';
export default function Index() {
  return (
    <div className='text-center'>
      <p>This is a simple Todo list app with database</p>
      <Link to='/login'>
        <button className='btn btn-success mx-2'>Sign In</button>
      </Link>
      <Link to='/register'>
        <button className='btn btn-light mx-2'>Get Started</button>
      </Link>
    </div>
  );
}
