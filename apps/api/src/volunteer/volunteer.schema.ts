import * as mongoose from 'mongoose';

export const VolunteerSchema = new mongoose.Schema({
  privateUuid: { type: String, required: true },
  publicUuid: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  zipcode: { type: Number, required: true },
  city: { type: String, required: true },
  phone: { type: String, required: true },
  description: String,
  qualification: { type: [String], required: true },
  active: { type: Boolean, default: false },
  registeredAt: { type: Date, default: Date.now },
  location: {
    type: {
      type: String,
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  privacyAccepted: { type: Boolean, required: true }
});
