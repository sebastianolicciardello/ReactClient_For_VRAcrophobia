import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import iconImage from '../assets/icon.jpg'

const SignUp = () => {

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      }
    })
  }

  function handleSubmit(event) {
    event.preventDefault()
  }



  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center">
          <img src={iconImage} alt="Icon" className="w-24 h-auto rounded-lg mb-4" />
          <h1 className="text-4xl font-extralight">VR ACROPHOBIA</h1>
          <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 mb-4 flex flex-col">
            <input
              placeholder='Username'
              name='username'
              onChange={handleChange}
              className="mb-4 py-2 px-3 border border-gray-300 rounded-full" />
            <input
              placeholder='Password'
              name='password'
              type='password'
              onChange={handleChange}
              className="mb-4 py-2 px-3 border border-gray-300 rounded-full" />
            <button
              type='submit'
              className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
              Sign Up
            </button>
            <div className="flex flex-col items-center mt-4">
              Already have an account?{' '}
              <Link to="/" className="underline">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignUp