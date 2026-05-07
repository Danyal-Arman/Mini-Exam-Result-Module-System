import { Student } from "../models/Student.js";
import { Subject } from "../models/Subject.js";
import { Result } from "../models/Result.js";

export const getDashboardData = async (req, res) => {

   try {

      const totalStudents =
         await Student.countDocuments();

      const totalSubjects =
         await Subject.countDocuments();

      const totalResults =
         await Result.countDocuments();

      const passedStudents =
         await Result.countDocuments({
            isPass: true
         });

      const failedStudents =
         await Result.countDocuments({
            isPass: false
         });

      return res.status(200).json({
         totalStudents,
         totalSubjects,
         totalResults,
         passedStudents,
         failedStudents
      });

   } catch (error) {

      console.log(
         "Dashboard Error",
         error.message
      );

      return res.status(500).json({
         success: false,
         message: "Internal Server Error"
      });
   }
};