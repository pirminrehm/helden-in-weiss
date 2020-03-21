import * as mongoose from 'mongoose';

export const VolunteerSchema = new mongoose.Schema({
  name: String,
  email: String,
  plz: Number,
});
