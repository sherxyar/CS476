// src/pages/api/login.ts

import rateLimit from 'express-rate-limit';
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// --- Rate Limit: 5 attempts per 5 minutes ---
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
  message: {
    error: 'Too many login attempts. Please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// --- Middleware wrapper for Next.js ---
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      return result instanceof Error ? reject(result) : resolve(result);
    });
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res, limiter);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Please enter both email and password.' });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(401).json({ error: 'User does not exist.' });
  }

  const isCorrect = password === user.hashedPassword; // In production, use bcrypt to compare

  if (!isCorrect) {
    return res.status(401).json({ error: 'Incorrect password.' });
  }

  // Successful login (e.g., save session)
  return res.status(200).json({ message: 'Login successful!' });
}
