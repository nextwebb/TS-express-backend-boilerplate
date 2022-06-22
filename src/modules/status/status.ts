import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) =>
  res.status(200).json({ up: true, env: process.env.NODE_ENV }),
);

export default router;
