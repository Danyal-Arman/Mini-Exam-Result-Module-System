import { useEffect } from 'react'
import { useState } from 'react'
import axiosInstance from '../../api/axios';
import { useParams } from 'react-router-dom';

const ResultDetails = () => {
  const [result, setResult] = useState(null);
  const {id} = useParams();

  useEffect(()=>{
  const fetchResultDetails = async ()=>{
    try {
      const response = await axiosInstance.get(`/results/${id}`);
      setResult(response?.data?.result);
    } catch (error) {
      console.error("Error fetching result details", error);
    }
  }
  fetchResultDetails();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

  <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">

    {/* Header */}
    <div className="flex justify-between items-center mb-8">

      <div>

        <h1 className="text-3xl font-bold text-gray-800">
          Result Details
        </h1>

        <p className="text-gray-500 mt-1">
          {result?.examName}
        </p>

      </div>

      <span
        className={`
          px-5
          py-2
          rounded-full
          text-white
          font-semibold
          ${
            result?.isPass
              ? "bg-green-500"
              : "bg-red-500"
          }
        `}
      >
        {
          result?.isPass
            ? "PASS"
            : "FAIL"
        }
      </span>

    </div>

    {/* Student Info */}
    <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-6
        mb-10
    ">

      <div className="bg-gray-50 p-5 rounded-lg">

        <h2 className="text-xl font-semibold mb-4">
          Student Information
        </h2>

        <div className="space-y-2 text-gray-700">

          <p>

            <span className="font-semibold">
              Name:
            </span>

            {" "}
            {result?.studentId?.name}

          </p>

          <p>

            <span className="font-semibold">
              Roll Number:
            </span>

            {" "}
            {result?.studentId?.rollNumber}

          </p>

          <p>

            <span className="font-semibold">
              Class:
            </span>

            {" "}
            {result?.studentId?.className}

          </p>

          <p>

            <span className="font-semibold">
              Section:
            </span>

            {" "}
            {result?.studentId?.section}

          </p>

        </div>

      </div>

      {/* Summary */}
      <div className="bg-gray-50 p-5 rounded-lg">

        <h2 className="text-xl font-semibold mb-4">
          Result Summary
        </h2>

        <div className="space-y-2 text-gray-700">

          <p>

            <span className="font-semibold">
              Total Marks:
            </span>

            {" "}
            {result?.totalMarks}

          </p>

          <p>

            <span className="font-semibold">
              Percentage:
            </span>

            {" "}
            {result?.percentage}%

          </p>

          <p>

            <span className="font-semibold">
              Grade:
            </span>

            {" "}
            {result?.grade}

          </p>

        </div>

      </div>

    </div>

    {/* Subject Wise Marks */}
    <div>

      <h2 className="text-2xl font-bold mb-5">
        Subject Wise Marks
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full border border-gray-200">

          <thead className="bg-blue-500 text-white">

            <tr>

              <th className="py-3 px-4 text-left">
                Subject
              </th>

              <th className="py-3 px-4 text-left">
                Full Marks
              </th>

              <th className="py-3 px-4 text-left">
                Pass Marks
              </th>

              <th className="py-3 px-4 text-left">
                Obtained
              </th>

              <th className="py-3 px-4 text-left">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {
              result?.subjects?.map((subject) => (

                <tr
                  key={subject._id}
                  className="border-t"
                >

                  <td className="py-3 px-4">

                    {
                      subject?.subjectId
                        ?.subjectName
                    }

                  </td>

                  <td className="py-3 px-4">

                    {
                      subject?.subjectId
                        ?.fullMarks
                    }

                  </td>

                  <td className="py-3 px-4">

                    {
                      subject?.subjectId
                        ?.passMarks
                    }

                  </td>

                  <td className="py-3 px-4">

                    {subject?.marksObtained}

                  </td>

                  <td className="py-3 px-4">

                    <span
                      className={
                        subject?.marksObtained >=
                        subject?.subjectId?.passMarks
                          ? "text-green-600 font-semibold"
                          : "text-red-600 font-semibold"
                      }
                    >

                      {
                        subject?.marksObtained >=
                        subject?.subjectId?.passMarks
                          ? "Pass"
                          : "Fail"
                      }

                    </span>

                  </td>

                </tr>
              ))
            }

          </tbody>

        </table>

      </div>

    </div>

  </div>

</div>
  )
}

export default ResultDetails
