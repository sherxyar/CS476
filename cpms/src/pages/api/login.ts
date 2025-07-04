// src/pages/api/login.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const loginAttempts = new Map<string, { count: number; timestamp: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 5 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = loginAttempts.get(ip);

  if (!entry) {
    loginAttempts.set(ip, { count: 1, timestamp: now });
    return false;
  }

  const { count, timestamp } = entry;

  if (now - timestamp > WINDOW_MS) {
    loginAttempts.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (count >= MAX_ATTEMPTS) return true;

  loginAttempts.set(ip, { count: count + 1, timestamp });
  return false;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let ip = 'unknown';
  try {
    const ipHeader = req.headers?.['x-forwarded-for'];
    ip = Array.isArray(ipHeader) ? ipHeader[0] : ipHeader || req.socket?.remoteAddress || 'unknown';
  } catch {}

  if (isRateLimited(ip.toString())) {
    return res.status(429).json({ error: 'Too many login attempts. Please try again later.' });
  }

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

  const isCorrect = await bcrypt.compare(password, user.hashedPassword);

  if (!isCorrect) {
    return res.status(401).json({ error: 'Incorrect password.' });
  }

  return res.status(200).json({ message: 'Login successful!' });
}
