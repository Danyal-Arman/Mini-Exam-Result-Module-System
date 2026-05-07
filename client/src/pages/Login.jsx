import { useState } from 'react'
import axiosInstance from '../api/axios';

const Login = () => {
  const [inputData, setInputData] = useState({
    email: '',
    password: '',
  });


const handleChange = (e) => {
  const { name, value } = e.target;
  setInputData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
  console.log(inputData);
};



  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputData);
    const response = await axiosInstance.post('/auth/login', inputData);
    console.log(response.data);
  }  

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className=" bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={inputData.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-black"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={inputData.password}
              onChange={handleChange}
              className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login