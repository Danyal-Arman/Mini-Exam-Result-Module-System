import { Student } from "../models/Student.js";
import mongoose from "mongoose"

export const createStudent = async(req, res)=>{
    try {
        const { name, rollNumber, className, email, phone, section}= req.body;

        if(!name || !rollNumber || !className || !email){
             return res.status(400).json({
                success:false,
                message:"Name, rollnumber, class and email are required kjk"
             })
        }

        const newStudent = new Student({
            name,
            rollNumber,
            className,
            section,
            email,
            phone,
        })
      
      await newStudent.save();

      return res.status(201).json({
        success:true,
        message:"Student detail created successfully"
      })
        
    } catch (error) {
        console.log("Create Student error",error.message)
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}


export const listStudents = async (req, res) =>{
    try {
        const students = await Student.find();

        return res.status(200).json({
            success:true,
            count: students.length,
            students
        })


    } catch (error) {
         console.log("Create Student error",error.message)
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

export const getStudentById = async (req, res)=>{
    try {
        const {id} = req.params;
        const student = await Student.findById(id)
        
                if(!student){
                    return res.status(404).json({
                        success:false,
                        message:"Student not found"
                    })
                }

        return res.status(200).json({
            success:true,
            student
        })
    } catch (error) {
         console.log("Create Student error",error.message)
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

export const updateStudentById = async (req, res)=>{
    try {
        const {id} = req.params;
        const { name, rollNumber, className, email, phone, section}= req.body;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({
                success:false,
                message:"Invalid student ID"
            })
        }

        const updatedstudent = await Student.findByIdAndUpdate(
            id,
            {
                name,
                rollNumber,
                className,
                email,
                phone,
                section
            },
            {
                new:true,
                runValidators:true
            }
        )

        if(!updatedstudent){
            return res.status(404).json({
                success:false,
                message:"Student not found with this id"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Student details updated successfully",
            updatedstudent
        })
    } catch (error) {
         console.log("Create Student error",error.message)
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}


export const deleteStudentById = async (req, res)=>{
    try {
        const {id} = req.params;

        const student = await Student.findByIdAndDelete(id)

        if(!student){
            return res.status(404).json({
                success:false,
                message:"Student not found with this id"
            })
        }
      
        return res.status(200).json({
            success:true,
            message:"Student deleted successfully"
        })
       
    } catch (error) {
         console.log("Create Student error",error.message)
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}