import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import Technician from '../models/technician';
import generateToken from '../utils/jwt';
import { AuthRequest } from '../middleware/auth';
import Booking from '../models/booking';

// =========================================
// Register Technician
// =========================================
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

    // Required field validation
    if (
      !name ||
      !email ||
      !phone ||
      !password ||
      !profession ||
      !city
    ) {
      res.status(400).json({
        success: false,
        message: 'Please fill all required fields',
      });
      return;
    }

    // Check duplicate email or phone
    const technicianExists = await Technician.findOne({
      $or: [
        { email: email.toLowerCase() },
        { phone },
      ],
    });

    if (technicianExists) {
      if (technicianExists.email === email.toLowerCase()) {
        res.status(400).json({
          success: false,
          message: 'Email already registered',
        });
        return;
      }

      if (technicianExists.phone === phone) {
        res.status(400).json({
          success: false,
          message: 'Phone number already registered',
        });
        return;
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create technician
    const technician = await Technician.create({
      name,
      email: email.toLowerCase(),
      phone,
      password: hashedPassword,
      profession,
      experience: experience || 0,
      city,
    });

    res.status(201).json({
      success: true,
      message: 'Technician registered successfully',
      technician: {
        id: technician._id,
        name: technician.name,
        email: technician.email,
        phone: technician.phone,
        profession: technician.profession,
        experience: technician.experience,
        city: technician.city,
        isAvailable: technician.isAvailable,
        rating: technician.rating,
        role: technician.role,
      },
    });
  } catch (error: any) {
    console.error('Register Technician Error:', error);

    res.status(500).json({
      success: false,
      message: error.message || 'Failed to register technician',
    });
  }
};

// =========================================
// Login Technician
// =========================================
export const loginTechnician = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
      return;
    }

    const technician = await Technician.findOne({
      email: email.toLowerCase(),
    });

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
        phone: technician.phone,
        profession: technician.profession,
        experience: technician.experience,
        city: technician.city,
        isAvailable: technician.isAvailable,
        rating: technician.rating,
        role: technician.role,
      },
    });
  } catch (error: any) {
    console.error('Technician Login Error:', error);

    res.status(500).json({
      success: false,
      message: error.message || 'Failed to login',
    });
  }
};

// =========================================
// Get All Technicians
// =========================================
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
  } catch (error: any) {
    console.error('Get Technicians Error:', error);

    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch technicians',
    });
  }
};
       


// =========================================
// Get Technician By ID
// =========================================
// (Function implementation omitted or handled elsewhere)










// ================================
// UPDATE TECHNICIAN (ADMIN)
// ===============================




export const updateTechnician = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const technician = await Technician.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!technician) {
      res.status(404).json({
        success: false,
        message: "Technician not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      technician,
    });
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};










// ================================
// TOGGLE AVAILABILITY (ADMIN)
// ================================





export const toggleAvailability = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const technician = await Technician.findById(req.params.id);

    if (!technician) {
      res.status(404).json({
        success: false,
        message: "Technician not found",
      });
      return;
    }

    technician.isAvailable = !technician.isAvailable;

    await technician.save();

    res.status(200).json({
      success: true,
      technician,
    });
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};





// ================================
// DELETE TECHNICIAN (ADMIN)
// ================================



export const deleteTechnician = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const technician = await Technician.findByIdAndDelete(
      req.params.id
    );

    if (!technician) {
      res.status(404).json({
        success: false,
        message: "Technician not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Technician deleted successfully",
    });
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


  // =========================================
// Get Technician Profile
// =========================================

export const getTechnicianProfile = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const technician = await Technician.findById(req.user._id).select('-password');

    if (!technician) {
      res.status(404).json({
        success: false,
        message: 'Technician not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      technician,
    });

  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  };
}

// =========================================
// Update Technician Profile
// =========================================

export const updateTechnicianProfile = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {

    const {
      name,
      phone,
      profession,
      experience,
      city,
    } = req.body;

    const technician = await Technician.findById(req.user._id);

    if (!technician) {
      res.status(404).json({
        success: false,
        message: 'Technician not found',
      });
      return;
    }

    if (name) technician.name = name;
    if (phone) technician.phone = phone;
    if (profession) technician.profession = profession;
    if (experience !== undefined) technician.experience = experience;
    if (city) technician.city = city;

    await technician.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      technician,
    });

  } catch (error: any) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// =========================================
// Update Availability
// =========================================

export const updateAvailability = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {

  try {

    const technician = await Technician.findById(req.user._id);

    if (!technician) {

      res.status(404).json({
        success: false,
        message: 'Technician not found',
      });

      return;
    }

    technician.isAvailable = !technician.isAvailable;

    await technician.save();

    res.status(200).json({
      success: true,
      message: 'Availability updated',
      isAvailable: technician.isAvailable,
    });

  } catch (error: any) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// =========================================
// Get My Assigned Bookings
// =========================================
export const getMyBookings = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {

    const bookings = await Booking.find({
      technician: req.user._id,
    })
      .populate(
        "service",
        "name category price duration image"
      )
      .populate(
        "user",
        "name phone email"
      )
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });

  } catch (error: any) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// =========================================
// Get Assigned Bookings
// =========================================

export const getAssignedBookings = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {

    const bookings = await Booking.find({
      technician: req.user._id,
    })
      .populate('user', 'name email phone')
      .populate('service', 'name category price duration');

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });

  } catch (error: any) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// GET SINGLE TECHNICIAN BY ID
export const getTechnicianById = async (
  req: Request,
  res: Response
) => {
  try {
    const technician = await Technician.findById(req.params.id);

    if (!technician) {
      return res.status(404).json({
        success: false,
        message: "Technician not found",
      });
    }

    res.status(200).json({
      success: true,
      technician,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// CREATE TECHNICIAN
export const createTechnician = async (
  req: Request,
  res: Response
) => {

  try {

    const {
      name,
      email,
      phone,
      password,
      profession,
      experience,
      city,
      state
    } = req.body;


    if (
      !name ||
      !email ||
      !phone ||
      !password ||
      !profession
    ) {

      return res.status(400).json({
        success:false,
        message:"Required fields missing"
      });

    }



    const existingTechnician =
      await Technician.findOne({
        email
      });



    if(existingTechnician){

      return res.status(400).json({
        success:false,
        message:"Technician already exists"
      });

    }




    const hashedPassword =
      await bcrypt.hash(password,10);



    const technician =
      await Technician.create({

        name,

        email,

        phone,

        password:hashedPassword,

        profession,

        experience:Number(experience) || 0,

        city,

        state,


        photo:req.file
        ? `/uploads/${req.file.filename}`
        : "",


        isVerified:false,

        isAvailable:true

      });





    return res.status(201).json({

      success:true,

      message:"Technician created successfully",

      technician

    });



  }
  catch(error:any){

    console.log(error);


    return res.status(500).json({

      success:false,

      message:error.message

    });

  }

};