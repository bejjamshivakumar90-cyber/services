import asyncHandler from '../utils/asyncHandler';

import { Request, Response } from 'express';
import Service from '../models/service';

// GET ALL SERVICES
export const getServices = asyncHandler(async (_req, res) => {
  const services = await Service.find();

  res.status(200).json({
    success: true,
    count: services.length,
    services,
  });
});

// GET SINGLE SERVICE
export const getServiceById = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    const error: any = new Error('Service not found');
    error.status = 404;
    throw error;
  }

  res.status(200).json({
    success: true,
    service,
  });
});

// CREATE SERVICE
export const createService = asyncHandler(async (req, res) => {
  const service = await Service.create(req.body);

  res.status(201).json({
    success: true,
    service,
  });
});

// UPDATE SERVICE
export const updateService = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!service) {
    const error: any = new Error('Service not found');
    error.status = 404;
    throw error;
  }

  res.status(200).json({
    success: true,
    service,
  });
});

// DELETE SERVICE
export const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndDelete(req.params.id);

  if (!service) {
    const error: any = new Error('Service not found');
    error.status = 404;
    throw error;
  }

  res.status(200).json({
    success: true,
    message: 'Service deleted successfully',
  });
});