import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user';
import generateToken from '../utils/jwt';
import asyncHandler from '../utils/asyncHandler';


// REGISTER USER
export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {

    const {
      name,
      email,
      phone,
      password,
    } = req.body;


    const existingUser = await User.findOne({
      email,
    });


    if (existingUser) {
      const error: any = new Error(
        'User already exists'
      );

      error.status = 400;
      throw error;
    }


    const hashedPassword = await bcrypt.hash(
      password,
      10
    );


    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });


    const token = generateToken(
      user._id.toString()
    );


    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  }
);


// LOGIN USER
export const loginUser = asyncHandler(
  async (req: Request, res: Response) => {

    const {
      email,
      password,
    } = req.body;


    const user = await User.findOne({
      email,
    });


    if (!user) {
      const error: any = new Error(
        'Invalid email or password'
      );

      error.status = 401;
      throw error;
    }


    const isPasswordMatch =
      await bcrypt.compare(
        password,
        user.password
      );


    if (!isPasswordMatch) {
      const error: any = new Error(
        'Invalid email or password'
      );

      error.status = 401;
      throw error;
    }


    const token = generateToken(
      user._id.toString()
    );


    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  }
);