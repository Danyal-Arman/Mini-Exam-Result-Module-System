import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import StudentList from "./pages/students/StudentList";
import AddStudent from "./pages/students/AddStudent";
import EditStudent from "./pages/students/EditStudent";

import SubjectList from "./pages/subjects/SubjectList";
import AddSubject from "./pages/subjects/AddSubject";
import EditSubject from "./pages/subjects/EditSubject";

import ResultList from "./pages/results/ResultList";
import AddResult from "./pages/results/AddResult";
import ResultDetails from "./pages/results/ResultDetails";

import ProtectedRoute from "./components/ProtectedRoutes";


function App(){

 const router = createBrowserRouter([
  
  // public routes
  {
    path: "/login",
    element: <Login />,
  },

  // protected routes
  {
    path: "/dashboard",
    element: (
      // <ProtectedRoute>
        <Dashboard />
      // </ProtectedRoute>
    ),
  },

  // students 
  {
    path: "/students",
    // element: (
    //   <ProtectedRoute>
    //     <StudentList />
    //   </ProtectedRoute>
    // ),
    element: <StudentList />
  },

  {
    path: "/students/add",
    element: (
      // <ProtectedRoute>
        <AddStudent />
      // </ProtectedRoute>
    ),
  },

  {
    path: "/students/edit/:id",
    element: (
      // <ProtectedRoute>
        <EditStudent />
      // </ProtectedRoute>
    ),
  },

  // subjects
  {
    path: "/subjects",
    element: (
      // <ProtectedRoute>
        <SubjectList />
      // </ProtectedRoute>
    ),
  },

  {
    path: "/subjects/add",
    element: (
      // <ProtectedRoute>
        <AddSubject />
      // </ProtectedRoute>
    ),
  },

  {
    path: "/subjects/edit/:id",
    element: (
      // <ProtectedRoute>
        <EditSubject />
      // </ProtectedRoute>
    ),
  },

  // results
  {
    path: "/results",
    element: (
      // <ProtectedRoute>
        <ResultList />
      // </ProtectedRoute>
    ),
  },

  {
    path: "/results/add",
    element: (
      // <ProtectedRoute>
        <AddResult />
      // </ProtectedRoute>
    ),
  },

  {
    path: "/results/:id",
    element: (
      // <ProtectedRoute>
        <ResultDetails />
      // </ProtectedRoute>
    ),
  },
]);


return <RouterProvider router={router} />;  
}
   
export default App;