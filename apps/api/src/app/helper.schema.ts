import * as mongoose from 'mongoose';

export const HelperSchema = new mongoose.Schema({
  name: String,
  email: String,
  plz: Number,
});
