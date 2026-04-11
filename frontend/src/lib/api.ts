import axios from 'axios';
import { Job, Application } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
});

export const jobApi = {
  getAll: async () => {
    const response = await api.get('/jobs');
    return response.data.data ? response.data.data : response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/jobs/${id}`);
    return response.data.data ? response.data.data : response.data;
  },
  create: async (job: Omit<Job, 'id' | 'postedAt'>) => {
    const response = await api.post('/jobs', job);
    return response.data.data ? response.data.data : response.data;
  },
  delete: async (id: string) => {
    await api.delete(`/jobs/${id}`);
  },
};

export const applicationApi = {
  getAll: async () => {
    const response = await api.get('/applications');
    return response.data.data ? response.data.data : response.data;
  },
  submit: async (application: Omit<Application, 'id' | 'appliedAt'>) => {
    const response = await api.post('/applications', application);
    return response.data.data ? response.data.data : response.data;
  },
};

export const taxonomyApi = {
  getAll: async () => {
    const response = await api.get('/taxonomies');
    return response.data;
  }
};
