import { useEffect, useState } from 'react'
import axiosInstance from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const SubjectList = () => {
  const [subjects, setSubjects] = useState([]);

  const navigate = useNavigate();


  useEffect(() => {
  const fetchSubjects = async () => { 
    try {
      const response = await axiosInstance.get('/subjects');
      console.log(response.data);
      setSubjects(response?.data?.subjects);
    } catch (error) {
      console.error("Error fetching subjects", error);
    }
  }
  fetchSubjects();
},[])

  return (
    <div className="min-h-screen bg-gray-100 p-6">

  <div className="flex justify-between items-center mb-8">

    <h1 className="text-3xl font-bold">
      Subjects
    </h1>

  </div>

  <div className="
      grid
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-3
      gap-6
  ">

    {
      subjects.map((subject) => (

        <div
          key={subject._id}
          className="
            bg-white
            rounded-xl
            shadow-md
            p-6
            hover:shadow-xl
            transition
          "
        >

          {/* Subject Header */}
          <div className="mb-4">

            <h2 className="text-2xl font-bold text-gray-800">
              {subject.subjectName}
            </h2>

            <p className="text-gray-500">
              Code: {subject.subjectCode}
            </p>

          </div>

          {/* Subject Info */}
          <div className="space-y-3 text-gray-700">

            <p>

              <span className="font-semibold">
                Full Marks:
              </span>

              {" "}
              {subject.fullMarks}

            </p>

            <p>

              <span className="font-semibold">
                Pass Marks:
              </span>

              {" "}
              {subject.passMarks}

            </p>

          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-6">

            <button
              onClick={() => navigate(`/subjects/edit/${subject._id}`)}
              className="
                flex-1
                bg-blue-500
                hover:bg-blue-600
                text-white
                py-2
                rounded-md
                transition
              "
            >
              Edit
            </button>

            <button
              className="
                flex-1
                bg-red-500
                hover:bg-red-600
                text-white
                py-2
                rounded-md
                transition
              "
            >
              Delete
            </button>

          </div>

        </div>
      ))
    }

  </div>

</div>
  )
}

export default SubjectList
