import { useState, useEffect } from 'react'
import axiosInstance from '../../api/axios';

const AddResult = () => {
  const [formData, setFormData] = useState({
    studentId: '',
    examName: '',
    subjects: [],
  });
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
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
    const response = await axiosInstance.post('/results', formData);
    console.log(response.data);
  }  
   const fetchSubjects = async ()=>{
    try {
      const response = await axiosInstance.get('/subjects');
      console.log(response.data);
      setSubjects(response?.data?.subjects);
    } catch (error) {
      console.error("Error fetching subjects", error);
    }
   }

   const fetchStudents = async () => {

  try {

    const response =
      await axiosInstance.get('/students');

    setStudents(response?.data?.students);

  } catch (error) {

    console.error(
      "Error fetching students",
      error
    );
  }
}
  useEffect(()=>{
          fetchSubjects();
          fetchStudents();
          
  },[])

  

  const handleMarksChange = (
   subjectId,
   marks
) => {

   setFormData((prev) => {

      const existingSubject =
         prev.subjects.find(
            (sub) =>
               sub.subjectId === subjectId
         );

      // update existing
      if (existingSubject) {

         return {
            ...prev,

            subjects:
               prev.subjects.map((sub) =>

                  sub.subjectId === subjectId
                     ? {
                         ...sub,
                         marksObtained: Number(marks)
                       }
                     : sub
               )
         };
      }

      // add new subject
      return {
         ...prev,

         subjects: [
            ...prev.subjects,

            {
               subjectId,
               marksObtained: Number(marks)
            }
         ]
      };
   });
};

  return (
  <div className="bg-gray-100 min-h-screen py-10 px-4">

  <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">

    <h2 className="text-3xl font-bold text-center mb-8">
      Add Result
    </h2>

    <form onSubmit={handleSubmit}>

      {/* Student Selection */}
      <div className="mb-6">

        <label className="block text-gray-700 font-medium mb-2">
          Select Student
        </label>

        <select
          name="studentId"
          value={formData.studentId}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">
            Select Student
          </option>

          {
            students?.map((student) => (
              <option
                key={student._id}
                value={student._id}
              >
                {student.name} ({student.rollNumber}) - {student.className}
              </option>
            ))
          }
        </select>

      </div>

      {/* Exam Name */}
      <div className="mb-6">

        <label className="block text-gray-700 font-medium mb-2">
          Exam Name
        </label>

        <input
          type="text"
          name="examName"
          value={formData.examName}
          onChange={handleChange}
          placeholder="Enter Exam Name"
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      {/* Subject Marks */}
      <div className="mb-6">

        <h3 className="text-xl font-semibold mb-4">
          Subject Marks
        </h3>

        <div className="space-y-4">

          {
            subjects?.map((subject) => (

              <div
                key={subject._id}
                className="flex items-center gap-4"
              >

                <div className="w-1/2">
                  <p className="font-medium text-gray-700">
                    {subject.subjectName}
                  </p>
                </div>

                <div className="w-1/2">

                  <input
                    type="number"
                    placeholder="Enter Marks"
                    onChange={(e) =>
                      handleMarksChange(
                        subject._id,
                        e.target.value
                      )
                    }
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                </div>

              </div>
            ))
          }

        </div>

      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-md transition"
      >
        Create Result
      </button>

    </form>

  </div>

</div>
  )
}

export default AddResult