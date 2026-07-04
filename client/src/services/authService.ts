import axiosInstance from './axiosInstance';
import type { AdminProfile, ApiEnvelope } from '@/types';

interface LoginResponse {
  token: string;
  admin: AdminProfile;
}

/**
 * Exchanges a verified Firebase ID token for a backend-issued JWT.
 * The backend verifies the Firebase token with the Admin SDK, confirms the
 * email matches the configured admin, then signs a short-lived JWT that
 * protects the /admin API routes (projects CRUD, messages).
 */
export const loginWithFirebaseToken = async (idToken: string): Promise<LoginResponse> => {
  const { data } = await axiosInstance.post<ApiEnvelope<LoginResponse>>('/auth/login', { idToken });
  return data.data;
};

export const getCurrentAdmin = async (): Promise<AdminProfile> => {
  const { data } = await axiosInstance.get<ApiEnvelope<AdminProfile>>('/auth/me');
  return data.data;
};
