import Image from 'next/image'
import React from 'react'
import logo from '../favicon.ico'
import AuthForm from './_components/AuthForm'

const LandingPage = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center py-16 sm:px-6 lg:px-8 bg-gray-100'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
            <Image src={logo} alt='logo' height={100} width={100} className='mx-auto'/>
            <h2 className='mt-6 text-center text-3xl text-gray-900 font-bold tracking-tight'>SignIn to continue to ZoroChat</h2>
        </div>
        <AuthForm/>
      
    </div>
  )
}

export default LandingPage
