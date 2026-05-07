import { useEffect, useState } from 'react'
import axiosInstance from '../../api/axios';
import { useNavigate } from 'react-router-dom';
const StudentList = () => {
   const [students, setStudents] = useState([])
   const navigate = useNavigate();


useEffect(()=>{
  const fetchStudents = async () => {

    try {

      const response = await axiosInstance.get('/students');

      setStudents(response?.data?.students);

    } catch (error) {

      console.error(
        "Error fetching students",
        error
      );
    }
  }
  fetchStudents();
},[])

const handleDelete = async ()=>{
  if (confirm("Are you sure you want to delete this student?")) {
    const response = await axiosInstance.delete(`/students/${studentId}`);
    console.log(response.data);
  }
}

  return (
   <div className="min-h-screen bg-gray-100 p-6">

  <div className="flex justify-between items-center mb-6">

    <h1 className="text-3xl font-bold">
      Students
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
      students.map((student) => (

        <div
          key={student._id}
          className="
            bg-white
            rounded-lg
            shadow-md
            p-5
            hover:shadow-lg
            transition
          "
        >

          <h2 className="text-xl font-bold mb-3">
            {student.name}
          </h2>

          <div className="space-y-2 text-gray-700">

            <p>
              <span className="font-semibold">
                Roll:
              </span>

              {" "}
              {student.rollNumber}
            </p>

            <p>
              <span className="font-semibold">
                Class:
              </span>

              {" "}
              {student.className}
            </p>

            <p>
              <span className="font-semibold">
                Section:
              </span>

              {" "}
              {student.section}
            </p>

            <p>
              <span className="font-semibold">
                Email:
              </span>

              {" "}
              {student.email}
            </p>

            <p>
              <span className="font-semibold">
                Phone:
              </span>

              {" "}
              {student.phone}
            </p>

          </div>

          <div className="flex gap-3 mt-5">

            <button
              onClick={() => navigate(`/students/edit/${student._id}`)}
              className="
                bg-blue-500
                hover:bg-blue-600
                text-white
                px-4
                py-2
                rounded
              "
            >
              Edit
            </button>

            <button
              onClick={handleDelete}
              className="
                bg-red-500
                hover:bg-red-600
                text-white
                px-4
                py-2
                rounded
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

export default StudentList
