import * as mongoose from 'mongoose';

export const VolunteerSchema = new mongoose.Schema({
  name: { type: String, required: true},
  firstname: { type: String, required: true},
  email: { type: String, required: true},
  zipcode: { type: Number, required: true},
  city: { type: String, required: true},
  age: { type: Number, required: true},
  phone: { type: String, required: true},
  description: String,
  registeredAt: { type: Date, default: Date.now }
});
