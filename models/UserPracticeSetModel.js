import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const Schema = mongoose.Schema;

const UserPracticeSetSchema = new Schema({
  appUserID: String,
  practiceSetID: String,
  active: Boolean,
  createdBy: String,
  purchaseDate: {
    type: Date,
    default: Date.now
  }
});

// cREATE Model
const UserPracticeSet = mongoose.model(
  'userpracticeset',
  UserPracticeSetSchema
);
export default UserPracticeSet;
