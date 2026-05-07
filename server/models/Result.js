import mongoose from "mongoose";

const MarksSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  examName: {
    type: String,
    required: true,
  },
  subjects: [
    {
      subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
      },
      
      marksObtained: {
        type: Number,
        required: true,
        min: [0, "Marks cannot be negative"],
      },
    },
  ],
  totalMarks: {
    type: Number,
    required: true,
  },
  percentage: Number,
  grade: String,
  isPass: Boolean,
}, {timestamps: true});

export const Result = mongoose.model("Result", MarksSchema);
