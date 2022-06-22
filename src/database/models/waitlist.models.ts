import { Schema, model } from 'mongoose';
import { IWaitlist } from '../interfaces';
import { ReferralType } from '../../types';

const schema = new Schema<IWaitlist>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    type: {
      type: String,
      enum: ReferralType,
    },
    email: { type: String, required: true, unique: true },
    referralCode: { type: String, required: true, unique: true },
    referredById: { type: String },
  },
  { timestamps: true },
);

const Waitlist = model<IWaitlist>('Waitlist', schema);

export default Waitlist;
