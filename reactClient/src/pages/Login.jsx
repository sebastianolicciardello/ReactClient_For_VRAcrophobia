import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import iconImage from '../assets/icon.jpg';

const Login = ({ setToken }) => {
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Check if the username meets the length requirements
    if (formData.username.length < 4 || formData.username.length > 16) {
      setUsernameError('Username not valid');
      return;
    } else {
      setUsernameError('');
    }

    // Check if the password matches the regex pattern
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,24})$/;
    if (!passwordRegex.test(formData.password)) {
      setPasswordError(
        'Password not valid'
      );
      return;
    } else {
      setPasswordError('');
    }

    // If the validations pass, proceed with the login
    // Your logic here
  }

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center">
          <img
            src={iconImage}
            alt="Icon"
            className="w-24 h-auto rounded-lg mb-4"
          />
          <h1 className="text-4xl font-extralight">VR ACROPHOBIA</h1>
          <form
            onSubmit={handleSubmit}
            className="px-8 pt-6 pb-8 mb-4 flex flex-col"
          >
            <input
              placeholder="Username"
              name="username"
              onChange={handleChange}
              className="mb-4 py-2 px-3 border border-gray-300 rounded-full"
            />
            {usernameError && <p className="text-red-500 text-center -mt-2 mb-4">{usernameError}</p>}
            <input
              placeholder="Password"
              name="password"
              type="password"
              onChange={handleChange}
              className="mb-4 py-2 px-3 border border-gray-300 rounded-full"
            />
            {passwordError && <p className="text-red-500 text-center -mt-2 mb-4">{passwordError}</p>}
            <button
              type="submit"
              className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Login
            </button>
            <div className="flex flex-col items-center mt-4">
              Don't have an account?{' '}
              <Link to="/signup" className="underline">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;