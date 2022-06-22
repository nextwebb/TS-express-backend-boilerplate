import { ObjectId } from 'mongoose';
import { ReferralType } from '../../types';

interface IWaitlist {
  _id: ObjectId;
  firstName: string;
  lastName?: string;
  email: string;
  type: ReferralType.Waitlist;
  referralCode: string;
  referredById?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export default IWaitlist;
