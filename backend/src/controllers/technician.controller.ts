import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import Technician from '../models/technician';
import generateToken from '../utils/jwt';

// Register Technician
export const registerTechnician = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      name,
      email,
      phone,
      password,
      profession,
      experience,
      city,
    } = req.body;

    const technicianExists = await Technician.findOne({ email });

    if (technicianExists) {
      res.status(400).json({
        success: false,
        message: 'Technician already exists',
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const technician = await Technician.create({
      name,
      email,
      phone,
      password: hashedPassword,
      profession,
      experience,
      city,
    });

    res.status(201).json({
      success: true,
      message: 'Technician registered successfully',
      technician: {
        id: technician._id,
        name: technician.name,
        email: technician.email,
        profession: technician.profession,
        city: technician.city,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to register technician',
    });
  }
};

// Login Technician
export const loginTechnician = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const technician = await Technician.findOne({ email });

    if (!technician) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
      return;
    }

    const isMatch = await bcrypt.compare(
      password,
      technician.password
    );

    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
      return;
    }

    const token = generateToken(
  technician._id.toString()
);
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      technician: {
        id: technician._id,
        name: technician.name,
        email: technician.email,
        profession: technician.profession,
        city: technician.city,
        role: technician.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to login',
    });
  }
};

// Get All Technicians
export const getTechnicians = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const technicians = await Technician.find().select('-password');

    res.status(200).json({
      success: true,
      count: technicians.length,
      technicians,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch technicians',
    });
  }
};