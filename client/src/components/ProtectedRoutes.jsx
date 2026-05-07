import { useEffect, useState } from "react";

import {
   Navigate
} from "react-router-dom";

import axiosInstance
from "../api/axios";

const ProtectedRoute = ({
   children
}) => {

   const [loading, setLoading] =
      useState(true);

   const [isAuthenticated,
      setIsAuthenticated] =
      useState(false);

   useEffect(() => {

      const checkAuth =
         async () => {

         try {

            await axiosInstance.get(
               "/auth/get-admin-profile"
            );

            setIsAuthenticated(true);

         } catch (error) {

            setIsAuthenticated(false);

         } finally {

            setLoading(false);

         }
      };

      checkAuth();

   }, []);

   if (loading) {
      return <p>Loading...</p>;
   }

   return isAuthenticated
      ? children
      : <Navigate to="/login" />;
};

export default ProtectedRoute;