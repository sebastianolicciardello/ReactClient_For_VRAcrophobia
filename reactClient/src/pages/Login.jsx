import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import iconImage from '../assets/icon.jpg';
import axios from 'axios';
import { DotLoader } from 'react-spinners';

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        let redirectTimeout;

        if (messageType === 'success') {
            setIsRedirecting(true);
            redirectTimeout = setTimeout(() => {
                navigate('/homepage');
            }, 1000);
        }

        return () => {
            clearTimeout(redirectTimeout);
        };
    }, [messageType, navigate]);

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

        // reset the messages
        setMessage('');
        setMessageType('');

        // Check if the username meets the length requirements
        if (formData.username == null || formData.username.length < 4 || formData.username.length > 16) {
            setUsernameError('Username not valid');
            return;
        } else {
            setUsernameError('');
        }

        // Check if the password matches the regex pattern
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,24}$/;
        if (!passwordRegex.test(formData.password)) {
            setPasswordError(
                'Password not valid'
            );
            return;
        } else {
            setPasswordError('');
        }

        // If the validations pass, proceed with the login
        tryLogin();
    }

    async function tryLogin() {
        try {
            const params = new URLSearchParams();
            params.append('rUsername', formData.username);
            params.append('rPassword', formData.password);

            const response = await axios.post('http://localhost:13756/account/login', params.toString(), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            if (response.data.code === 0) {
                localStorage.setItem('token', response.data.token);
                setMessage(response.data.msg);
                setMessageType('success');
            } else {
                setMessage(response.data.msg);
                setMessageType('error');
            }

        } catch (error) {
            console.error(error);
            setMessage('An error occurred');
            setMessageType('error');
        }


    }

    return (
        <>
            <div className={`flex justify-center items-center h-screen ${isRedirecting ? 'fade-out' : ''}`}>
                {isRedirecting ? (
                    <div className="flex flex-col justify-center items-center h-full">
                        <DotLoader color="#000" size={50} />
                        {message && (
                            <div className={`text-center mt-10 font-bold ${messageType === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                                {message}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <img src={iconImage} alt="Icon" className="w-24 h-auto rounded-lg mb-4" />
                        <h1 className="text-4xl font-extralight">VR ACROPHOBIA</h1>
                        <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 mb-4 flex flex-col">
                            <input
                                placeholder='Username'
                                name='username'
                                onChange={handleChange}
                                className="mb-4 py-2 px-3 border border-gray-300 rounded-full" />
                            {usernameError && <p className="text-red-500 text-center -mt-2 mb-4">{usernameError}</p>}
                            <input
                                placeholder='Password'
                                name='password'
                                type='password'
                                onChange={handleChange}
                                className="mb-4 py-2 px-3 border border-gray-300 rounded-full" />
                            {passwordError && <p className="text-red-500 text-center -mt-2 mb-4">{passwordError}</p>}
                            <button
                                type='submit'
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                                Login
                            </button>
                            {message && (
                                <div className={`text-center mt-4 font-bold ${messageType === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                                    {message}
                                </div>
                            )}
                            <div className="flex flex-col items-center mt-4">
                                Don't have an account?{' '}
                                <Link to="/signup" className="underline">
                                    Sign up
                                </Link>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
};

export default Login;