import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
   name:{
    type: String,
    required: true,
   },
   email:{
    type: String,
    required: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
   },
   phone:{
    type: String,
    required: true,
    match: [/^[6-9]\d{9}$/, "Please enter a valid phone number"]
   },
    rollNumber:{
    type: String,
    required: true,
    unique: true,
   },
   className:{
    type: String,
    required: true,
   },
   section: String, 
}, {
    timestamps: true,
});

export const Student = mongoose.model("Student", studentSchema);