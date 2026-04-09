import axios from 'axios';
import { Job, Application } from '../types';

const API_URL = '/api';

const api = axios.create({
  baseURL: API_URL,
});

export const jobApi = {
  getAll: async () => {
    const response = await api.get<Job[]>('/jobs');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get<Job>(`/jobs/${id}`);
    return response.data;
  },
  create: async (job: Omit<Job, 'id' | 'postedAt'>) => {
    const response = await api.post<Job>('/jobs', job);
    return response.data;
  },
  delete: async (id: string) => {
    await api.delete(`/jobs/${id}`);
  },
};

export const applicationApi = {
  submit: async (application: Omit<Application, 'id' | 'appliedAt'>) => {
    const response = await api.post<Application>('/applications', application);
    return response.data;
  },
};
