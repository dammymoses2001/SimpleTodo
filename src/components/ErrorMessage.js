import React, { useState } from 'react';

export default function ErrorMessage() {
  //handle error state
  const [error, setError] = useState('');

  //handle Error
  const handleError = (message) => {
    setError(message);
    setTimeout(() => {
      setError('');
    }, 3000);
  };
  return <div>{error}</div>;
}
