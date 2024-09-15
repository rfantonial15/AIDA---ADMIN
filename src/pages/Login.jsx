import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/aida-logo.png';
import background from '../assets/landing-image.png';

const API_LOGIN_ENDPOINT = 'http://127.0.0.1:8000/api/login/';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    
    // try {
    //   const response = await axios.post(API_LOGIN_ENDPOINT, { email, password });
    //   console.log('Login successful:', response.data);
    //   localStorage.setItem('token', response.data.token);
    //   navigate('/home');
    // } catch (error) {
    //   console.error('Login failed:', error.response ? error.response.data : error.message);
    //   setError('Invalid email or password');
    // }

    try {
      navigate('/dashboard');
    } catch (error) {
      
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex w-full max-w-1xl h-4/5 pl-14 pr-14 bg-white overflow-hidden">
        <div
          className="flex-1 bg-cover bg-center rounded-lg"
          style={{ backgroundImage: `url(${background})` }}
        ></div>
        <div className="flex-1 pl-20 flex flex-col justify-center items-center">
          <img src={logo} alt="Logo" className="w-24 mb-8" />
          <form className="w-full pl-36 pr-36" onSubmit={handleLogin}>
            {error && <div className="mb-4 text-red-500">{error}</div>}
            <div className="mb-4 w-full">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 border border-gray-500 rounded"
              />
            </div>
            <div className="mb-4 w-full">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 border border-gray-500 rounded"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-green-600 text-white rounded hover:bg-green-500"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
