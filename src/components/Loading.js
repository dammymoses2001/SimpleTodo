import React from 'react';
import LoadingImg from '../Img/Loading.gif';
export default function Loading() {
  return (
    <div className='loading'>
      <img src={LoadingImg} alt='loading' />
    </div>
  );
}
