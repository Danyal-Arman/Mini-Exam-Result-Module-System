import { Result } from "../models/Result.js";
import { Subject } from "../models/Subject.js";
import { Student } from "../models/Student.js";
import generateGrade from "../utils/generateGrade.js";

export const createResult = async(req, res)=>{
    try {
        
        const { studentId, examName, subjects  }= req.body;

        if(!examName){
             return res.status(400).json({
                success:false,
                message:"Exam name is required"
             })
        }
        if(!subjects || subjects.length === 0){
             return res.status(400).json({
                success:false,
                message:"Atleast one subjects is required"
             })
        }
        const existingResult = await Result.findOne({ studentId, examName });
        
        if (existingResult) {
            return res.status(400).json({
                success: false,
                message: "Result for this student and exam already exists",
            });
        }

        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found",
            });
        }

        let totalMarks = 0;
        let totalFullMarks = 0;
        let isPass = true;
             
          for (let subject of subjects){
            const subjectData = await Subject.findById(subject.subjectId)

            if(!subjectData){
                return res.status(400).json({
                    success:false,
                    message:"Subject not found"
                })
            }
            if(subject.marksObtained < 0){
                return res.status(400).json({
                    success:false,
                    message:"Marks obtained cannot be negative"
                })
            }
            if(subject.marksObtained > subjectData.fullMarks){
                      return res.status(400).json({
                        success:false,
                        message:`Marks obtained in ${subjectData.subjectName} cannot be greater than it's full marks`
                      })
            }
          
            totalMarks += subject.marksObtained;
            totalFullMarks += subjectData.fullMarks;

           if(subject.marksObtained < subjectData.passMarks){
            isPass = false;
           }
          }

        const percentage = Number(((totalMarks / totalFullMarks) * 100).toFixed(1));

        const grade = generateGrade(percentage);
      
         
        const newResult = new Result({
            studentId,
            examName,
            subjects,
            totalMarks,
            percentage,
            grade,
            isPass 
        })
        await newResult.save();

      return res.status(201).json({
        success:true,
        message:"Result created successfully",
        newResult
      })
        
    } catch (error) {
        console.log("Create Result error",error.message)
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}


export const ListResults = async (req, res) =>{
    try {
        const results = await Result.find()
        .populate("studentId", "name rollNumber")
        .populate("subjects.subjectId");

        return res.status(200).json({
            success:true,
            count: results.length,
            results
        })


    } catch (error) {
         console.log("List Results error",error.message)
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

export const getResultById = async (req, res)=>{
    try {
        const {id} = req.params;
        const result = await Result.findById(id)
        .populate("studentId")
        .populate("subjects.subjectId");
        
                if(!result){
                    return res.status(404).json({
                        success:false,
                        message:"Result not found"
                    })
                }

        return res.status(200).json({
            success:true,
            result
        })
    } catch (error) {
         console.log("Get Result error",error.message)
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

export const getResultsByStudentId = async (req, res)=>{
    try {
        const {studentId} = req.params;
        const results = await Result.find({ studentId });

        return res.status(200).json({
            success:true,
            count: Results.length,
            Results
        })
    } catch (error) {
         console.log("Get Results by Student ID error",error.message)
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}


export const deleteResult = async (req, res)=>{
    try {
        const {ResultId} = req.params;

        const Result = await Result.findByIdAndDelete(ResultId)

        if(!Result){
            return res.status(404).json({
                success:false,
                message:"Result not found with this id"
            })
        }
      
        return res.status(200).json({
            success:true,
            message:"Result deleted successfully"
        })
       
    } catch (error) {
         console.log("Delete Result error",error.message)
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}