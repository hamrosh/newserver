import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const Schema = mongoose.Schema;

const ShoppingCartSchema = new Schema({
  appUserID: String,
  itemID: String,
  type: String,
  status: String,
  purchaseID: String,
  purchasedDate: Date,
  createdBy: String,
  createdDate: {
    type: Date,
    default: Date.now
  }
});

// cREATE Model
const ShoppingCart = mongoose.model('userpracticeset', ShoppingCartSchema);
export default ShoppingCart;
