
'use client';

import React, { Suspense } from 'react'
import RegisterForm from './RegisterForm';

const Register = () => {

  return (
      <Suspense fallback={<div>Loading...</div>}>
        <RegisterForm />
      </Suspense>
  )
}

export default Register
