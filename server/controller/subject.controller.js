import { Subject } from "../models/Subject.js";
import mongoose from "mongoose";

export const createSubject = async(req, res)=>{
    try {
        const { subjectName, subjectCode, fullMarks, passMarks }= req.body;

        if(!subjectName || !subjectCode){
             return res.status(404).json({
                success:false,
                message:"Subject name, subject code are required"
             })
        }

        const parsedFullMarks = Number(fullMarks);
        const parsedPassMarks = Number(passMarks);
       
        if(isNaN(parsedFullMarks) || isNaN(parsedPassMarks)){
            return res.status(400).json({
                success:false,
                message:"Full marks and pass marks must be valid numbers"
            })
        }

        if(parsedPassMarks > parsedFullMarks){
            return res.status(400).json({
                success:false,
                message:"Pass marks cannot be greater than full marks"
            })
        }

        const newSubject = new Subject({
            subjectName,
            subjectCode,
            fullMarks: parsedFullMarks,
            passMarks: parsedPassMarks
        })
        await newSubject.save();

      return res.status(201).json({
        success:true,
        message:"Subject created successfully",
        newSubject
      })
        
    } catch (error) {
        console.log("Create Subject error",error.message)
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}


export const ListSubjects = async (req, res) =>{
    try {
        const subjects = await Subject.find();

        return res.status(200).json({
            success:true,
            count: subjects.length,
            subjects
        })


    } catch (error) {
         console.log("List Subjects error",error.message)
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

export const getSubjectById = async (req, res)=>{
    try {
        const {id} = req.params;
        const subject = await Subject.findById(id)
        
                if(!subject){
                    return res.status(404).json({
                        success:false,
                        message:"Subject not found"
                    })
                }

        return res.status(200).json({
            success:true,
            subject
        })
    } catch (error) {
         console.log("Get Subject error",error.message)
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

export const updateSubjectById = async (req, res)=>{
    try {
        const {id} = req.params;
        const { subjectName, subjectCode, fullMarks, passMarks}= req.body;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({
                success:false,
                message:"Invalid Subject ID"
            })
        }
        if(!subjectName || !subjectCode){
             return res.status(404).json({
                success:false,
                message:"Subject name, subject code are required"
             });
            }
        const parsedFullMarks = Number(fullMarks);
        const parsedPassMarks = Number(passMarks);
        
        if(isNaN(parsedFullMarks) || isNaN(parsedPassMarks)){
            return res.status(400).json({
                success:false,
                message:"Full marks and pass marks must be valid numbers"
             })
        }
        if(parsedPassMarks > parsedFullMarks){
            return res.status(400).json({
                success:false,
                message:"Pass marks cannot be greater than full marks"
             })
        }

        const updatedSubject = await Subject.findByIdAndUpdate(
            id,
            {
                subjectName,
                subjectCode,
                fullMarks: parsedFullMarks,
                passMarks: parsedPassMarks
            },
            {
                new:true,
                runValidators:true
            }
        )
      console.log("Not found subject")
        if(!updatedSubject){
            return res.status(404).json({
                success:false,
                message:"Subject not found with this id"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Subject details updated successfully",
            updatedSubject
        })
    } catch (error) {
         console.log("Update Subject error",error.message)
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}


export const deleteSubjectById = async (req, res)=>{
    try {
        const {id} = req.params;

        const subject = await Subject.findByIdAndDelete(id)

        if(!subject){
            return res.status(404).json({
                success:false,
                message:"Subject not found with this id"
            })
        }
      
        return res.status(200).json({
            success:true,
            message:"Subject deleted successfully"
        })
       
    } catch (error) {
         console.log("Delete Subject error",error.message)
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}