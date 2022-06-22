import { Request, Response } from 'express';
import { Conflict, BadRequest } from 'http-errors';
import { customAlphabet } from 'nanoid';

import axios from 'axios';
import { IWaitlist } from '../../../database/interfaces';
import { Waitlist } from '../../../database/models';
import { Email } from '../../../services';

const nanoid = customAlphabet('1234567890', 4);

type waitlistPayload = {
  email: string;
  name: string;
  referredBy?: string;
  token: string;
};
const AddToWaitlist = async (req: Request, res: Response) => {
  try {
    const { email, name, referredBy, token } = req.body as waitlistPayload;
    let googleResponse = null;
    try {
      googleResponse = await axios({
        method: 'post',
        url: `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
      });
    } catch (error) {
      throw new BadRequest(error);
    }

    const nameSlice = name.trim().replace(/\s+/g, ' ').split(' ');

    const referralCode = `${nameSlice[0][0]}${
      nameSlice[1] ? nameSlice[1][0] : 'M'
    }${nanoid()}`;

    // Check if email exist
    const emailSearch = await Waitlist.findOne({ email });

    if (emailSearch) {
      throw new Conflict(
        'You have already joined our waiting list, thank you!',
      );
    }

    let referralCodeSearch: IWaitlist | null = null;

    if (referredBy) {
      // Check if referral code exist
      referralCodeSearch = await Waitlist.findOne({
        referralCode: referredBy,
      });
    }

    // add to waitlist
    await Waitlist.create({
      email,
      firstName: nameSlice[0],
      lastName: nameSlice[1] || null,
      referralCode,
      // eslint-disable-next-line no-underscore-dangle
      referredById: referralCodeSearch ? referralCodeSearch._id : null,
    });

    // send email
    const data = {
      from: 'contact@mentavisor.com',
      to: `${email}`,
      subject: 'Mentavisor Waitlist ',
      text: 'You have already joined our waiting list, thank you!',
    };

    await Email.sendMail.messages().send(data);

    return res.status(201).json({
      message: 'You have been added to our waiting list, thank you!',
      data: {
        referralId: referralCode,
      },
      googleResponse,
    });
  } catch (error) {
    return res.status(error.status || 400).json({
      message: error.message || 'bad request',
    });
  }
};

export default AddToWaitlist;
