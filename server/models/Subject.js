import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
    subjectName: {
        type: String,
        required: true,
    },
    subjectCode: {
        type: String,
        required: true,
        unique: true,
    },
    fullMarks: {
        type: Number,        
    },
    passMarks: {
        type: Number,
    }
}, {
    timestamps: true,
});

subjectSchema.pre("validate", function (next){
    if (this.passMarks > this.fullMarks){
        this.invalidate("passMarks", "Pass marks cannot be greater than full marks");
    }
})
export const Subject = mongoose.model("Subject", subjectSchema);