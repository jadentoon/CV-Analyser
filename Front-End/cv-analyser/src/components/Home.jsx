import React from 'react'
import CVUpload from './CVUpload'
import JobUpload from './JobUpload'

const Home = () => {
  return (
    <div className='p-10'>
        <h1 className='font-bold text-3xl mb-4'>CV Analyser</h1>
        <CVUpload />
        <div className='my-6'></div>
        <JobUpload />
    </div>
  )
}

export default Home
