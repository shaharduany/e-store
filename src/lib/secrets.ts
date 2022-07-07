import dotenv from 'dotenv';
dotenv.config();

export const googleClient = process.env.GOOGLE_CLIENT as string;
export const googleSecret = process.env.GOOGLE_SECRET as string;

export const SECRET = process.env.SECRET as string;
