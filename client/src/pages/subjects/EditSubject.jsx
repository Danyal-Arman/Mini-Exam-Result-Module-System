import { useState } from 'react'
import axiosInstance from '../../api/axios';
import { useParams } from 'react-router-dom';

const EditSubject = () => {
  const [formData, setFormData] = useState({
    subjectName: '',
    subjectCode: '',
    fullMarks: '',
    passMarks: '',
  });

  const { id } = useParams();


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
    const response = await axiosInstance.put(`/subjects/${id}`, formData);
    console.log(response.data);
  }  

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className=" bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Edit Subject</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Subject Name
            </label>
            <input
              type="text"
              id="name"
              name="subjectName"
              value={formData.subjectName}
              onChange={handleChange}
              className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-black"
              placeholder="Enter Subject Name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Subject Code
            </label>
            <input
              type="text"
              id="subjectCode"
              name="subjectCode"
              value={formData.subjectCode}
              onChange={handleChange}
              className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              placeholder="Enter Subject Code"
              />
              </div>
                <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Full Marks
            </label>
            <input
              type="text"
              id="fullMarks"
              name="fullMarks"
              value={formData.fullMarks}
              onChange={handleChange}
              className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              placeholder="Enter Full Marks"
            />
            </div>
            <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Pass Marks
            </label>
            <input
              type="text"
              id="passMarks"
              name="passMarks"
              value={formData.passMarks}
              onChange={handleChange}
              className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              placeholder="Enter Pass Marks"
            />
            </div>
           
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditSubject