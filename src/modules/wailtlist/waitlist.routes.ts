import express from 'express';

import { AddToWaitlist } from './handlers';
import { validator } from '../../middlewares';
import { waitlistSchema } from '../../middlewares/joi';

const router = express.Router();

router.post('/waitlist', validator(waitlistSchema), AddToWaitlist);

export default router;
