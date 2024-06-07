import React from 'react'

function ErrorAlert({error} ) {
  return (
    <p className='alert-text text-center'>
      {error}
    </p>
  );
}
export default ErrorAlert