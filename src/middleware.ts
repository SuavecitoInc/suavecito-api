import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

export function verifyRequest(req: Request, res: Response, next: NextFunction) {
  const key = process.env.SECRET_KEY;
  const hmac = req.get('X-ShopifyProduct-Hmac-Sha256');
  const hash = crypto
    .createHmac('sha256', key)
    .update(req.rawBody, 'utf8') // removed hex
    .digest('base64');
  if (hmac === hash) {
    console.log('+++++++++++++++++ REQUEST VERIFIED +++++++++++++++++>');
    next();
  } else {
    console.log('+++++++++++++++++ ERROR - FORBIDDEN +++++++++++++++++>');
    res.status(403).json({
      success: false,
      error: 'Forbidden',
    });
  }
}

export function noIndex(req: Request, res: Response, next: NextFunction) {
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  next();
}

export default {};
