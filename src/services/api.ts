/**
 * API Service Layer
 * 
 * This file provides a foundation for API integration.
 * Replace mock implementations with actual API calls.
 */

import { SignupFormData, TrackingResult } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * Signup API
 * POST /api/auth/signup
 */
export const signupUser = async (data: SignupFormData): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Signup failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

/**
 * Track Order API
 * GET /api/orders/track/:trackingId
 */
export const trackOrder = async (trackingId: string): Promise<TrackingResult> => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/track/${trackingId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Order not found');
    }

    return await response.json();
  } catch (error) {
    console.error('Tracking error:', error);
    throw error;
  }
};

/**
 * Get Packages API
 * GET /api/packages
 */
export const getPackages = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/packages`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch packages');
    }

    return await response.json();
  } catch (error) {
    console.error('Packages error:', error);
    throw error;
  }
};

/**
 * Get Benefits API
 * GET /api/benefits
 */
export const getBenefits = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/benefits`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch benefits');
    }

    return await response.json();
  } catch (error) {
    console.error('Benefits error:', error);
    throw error;
  }
};
