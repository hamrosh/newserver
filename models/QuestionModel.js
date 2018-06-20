import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const Schema = mongoose.Schema;

const contentSchema = new Schema(
  {
    content: String,
    contentType: String
  },
  { _id: false }
);

const optionSchema = new Schema(
  {
    option: String,
    isCorrect: Boolean
  },
  { _id: false }
);

const singleQuestion = new Schema(
  {
    language: String,
    question: contentSchema,
    subQuestion: contentSchema,
    options: [optionSchema]
  },
  { _id: false }
);

const QuestionSchema = new Schema({
  question: [singleQuestion],
  categoryID: String,
  subCategoryID: String,
  sectionID: String,
  subSectionID: String,
  createdBy: String,
  createdDate: {
    type: Date,
    default: Date.now
  }
});

// cREATE Model
const Question = mongoose.model('question', QuestionSchema);
export default Question;
