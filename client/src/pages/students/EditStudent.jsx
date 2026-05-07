import { useState } from 'react'
import axiosInstance from '../../api/axios';
import { useParams } from 'react-router-dom';

const EditStudent = () => {
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    className: '',
    section: '',
    email: '',
    phone: '',
  });
  const params = useParams();
  const id = params.studentId;


const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
  console.log(formData);
};





  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const response = await axiosInstance.put(`/students/${id}`, formData);
    console.log(response?.data);
  }  

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className=" bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Edit Student Detail</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-black"
              placeholder="Enter Student Name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Roll Number
            </label>
            <input
              type="text"
              id="rollNumber"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              placeholder="Enter Roll Number"
              />
              </div>
                <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Class Name
            </label>
            <input
              type="text"
              id="className"
              name="className"
              value={formData.className}
              onChange={handleChange}
              className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              placeholder="Enter Class Name"
            />
            </div>
            <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Section
            </label>
            <input
              type="text"
              id="section"
              name="section"
              value={formData.section}
              onChange={handleChange}
              className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              placeholder="Enter Section"
            />
            </div>
            <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              placeholder="Enter your email"
            />
           </div>
            <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Phone Number
            </label>
            <input
              type="phone"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              placeholder="Enter your phone number"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditStudent