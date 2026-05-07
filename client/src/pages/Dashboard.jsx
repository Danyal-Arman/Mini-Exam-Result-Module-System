import { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';
const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axiosInstance.get('/dashboard');
        console.log(response.data);
        setDashboardData(response?.data);
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      }
    };
    fetchDashboardData();
  }, []);

  return (
   <div className="min-h-screen bg-gray-100 p-6">

  {/* Header */}
  <div className="mb-8">

    <h1 className="text-4xl font-bold text-gray-800">
      Dashboard
    </h1>

    <p className="text-gray-500 mt-2">
      Mini Exam Result Management System
    </p>

  </div>

  {/* Stats Cards */}
  <div className="
      grid
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-3
      gap-6
  ">

    {/* Total Students */}
    <div className="
        bg-white
        rounded-xl
        shadow-md
        p-6
        hover:shadow-lg
        transition
    ">

      <p className="text-gray-500 mb-2">
        Total Students
      </p>

      <h2 className="text-4xl font-bold text-blue-600">
        {dashboardData?.totalStudents}
      </h2>

    </div>

    {/* Total Subjects */}
    <div className="
        bg-white
        rounded-xl
        shadow-md
        p-6
        hover:shadow-lg
        transition
    ">

      <p className="text-gray-500 mb-2">
        Total Subjects
      </p>

      <h2 className="text-4xl font-bold text-purple-600">
        {dashboardData?.totalSubjects}
      </h2>

    </div>

    {/* Total Results */}
    <div className="
        bg-white
        rounded-xl
        shadow-md
        p-6
        hover:shadow-lg
        transition
    ">

      <p className="text-gray-500 mb-2">
        Total Results
      </p>

      <h2 className="text-4xl font-bold text-orange-600">
        {dashboardData?.totalResults}
      </h2>

    </div>

    {/* Passed Students */}
    <div className="
        bg-white
        rounded-xl
        shadow-md
        p-6
        hover:shadow-lg
        transition
    ">

      <p className="text-gray-500 mb-2">
        Passed Students
      </p>

      <h2 className="text-4xl font-bold text-green-600">
        {dashboardData?.passedStudents}
      </h2>

    </div>

    {/* Failed Students */}
    <div className="
        bg-white
        rounded-xl
        shadow-md
        p-6
        hover:shadow-lg
        transition
    ">

      <p className="text-gray-500 mb-2">
        Failed Students
      </p>

      <h2 className="text-4xl font-bold text-red-600">
        {dashboardData?.failedStudents}
      </h2>

    </div>

  </div>

</div>
  )
}

export default Dashboard
