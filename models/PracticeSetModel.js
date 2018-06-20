import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const Schema = mongoose.Schema;

const PracticeSetSchema = new Schema({
  description: String,
  questions: [String],
  authorName: String,
  sectionID: String,
  subSectionID: String,
  numberOfQuestion: Number,
  rate: Number,
  purchaseCount: Number,
  isFree: Boolean,
  createdBy: String,
  createdDate: {
    type: Date,
    default: Date.now
  }
});

// cREATE Model
const PracticeSet = mongoose.model('practiceset', PracticeSetSchema);
export default PracticeSet;
