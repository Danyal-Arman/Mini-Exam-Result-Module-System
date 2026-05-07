import { useState, useEffect } from 'react'
import axiosInstance from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const ResultList = () => {
     const [results, setResults] = useState([])
     const navigate = useNavigate(); 


useEffect(()=>{
  const fetchResults = async () => {

    try {

      const response = await axiosInstance.get('/results');

      console.log(response?.data);

      setResults(response?.data?.results);

    } catch (error) {

      console.error(
        "Error fetching results",
        error
      );
    }
  }
  fetchResults();
},[])

const handleDelete = async (id) => {
  if (confirm("Are you sure you want to delete this result?")) {
    const response = await axiosInstance.delete(`/results/${id}`);
    console.log(response?.data);
  }
}
  return (
    <div className="min-h-screen bg-gray-100 p-6">

  <div className="flex justify-between items-center mb-8">

    <h1 className="text-3xl font-bold">
      Results
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
      results?.map((result) => (

        <div
          key={result._id}
          className="
            bg-white
            rounded-xl
            shadow-md
            p-6
            hover:shadow-xl
            transition
          "
        >

          {/* Student */}
          <div className="mb-4">

            <h2 className="text-2xl font-bold text-gray-800">
              {result.studentId?.name}
            </h2>

            <p className="text-gray-500">
              Roll No:
              {" "}
              {result.studentId?.rollNumber}
            </p>

          </div>

          {/* Exam */}
          <div className="mb-4">

            <p className="text-gray-700">
              <span className="font-semibold">
                Exam:
              </span>

              {" "}
              {result.examName}
            </p>

          </div>

          {/* Stats */}
          <div className="space-y-2">

            <p className="text-gray-700">

              <span className="font-semibold">
                Total Marks:
              </span>

              {" "}
              {result.totalMarks}

            </p>

            <p className="text-gray-700">

              <span className="font-semibold">
                Percentage:
              </span>

              {" "}
              {result.percentage}%

            </p>

            <p className="text-gray-700">

              <span className="font-semibold">
                Grade:
              </span>

              {" "}
              {result.grade}

            </p>

          </div>

          {/* PASS FAIL Badge */}
          <div className="mt-5">

            <span
              className={`
                px-4
                py-2
                rounded-full
                text-white
                font-semibold
                text-sm
                ${
                  result.isPass
                    ? "bg-green-500"
                    : "bg-red-500"
                }
              `}
            >

              {
                result.isPass
                  ? "PASS"
                  : "FAIL"
              }

            </span>

          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-6">

            <button
              onClick={() => navigate(`/results/${result._id}`)}
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
              View Details
            </button>

            <button
              onClick={() => handleDelete(result._id)}
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

export default ResultList
