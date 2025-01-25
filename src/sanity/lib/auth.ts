import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
};


export const verifyPassword = async (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword);
};


export const createToken = (user: { _id: string; email: string }) => {
  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: '1d' }
  );
};
