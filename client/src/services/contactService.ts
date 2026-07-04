import axiosInstance from './axiosInstance';
import type { ApiEnvelope, ContactFormValues, ContactMessage } from '@/types';

/** Public: submit the contact form. Stored server-side for you to review. */
export const sendMessage = async (payload: ContactFormValues): Promise<ContactMessage> => {
  const { data } = await axiosInstance.post<ApiEnvelope<ContactMessage>>('/contact', payload);
  return data.data;
};

/** Admin only (JWT required): list submitted messages. */
export const getMessages = async (): Promise<ContactMessage[]> => {
  const { data } = await axiosInstance.get<ApiEnvelope<ContactMessage[]>>('/contact');
  return data.data;
};
