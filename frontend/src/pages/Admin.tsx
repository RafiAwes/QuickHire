import React, { useEffect, useState } from 'react';
import { Plus, Trash2, LayoutDashboard, Briefcase, Calendar, Building2, MapPin, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'motion/react';
import { Job, TaxonomyResponse } from '../types';
import { jobApi, taxonomyApi } from '../lib/api';
import { cn } from '../lib/utils';

const jobSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  company: z.string().min(2, 'Company is required'),
  location: z.string().min(2, 'Location is required'),
  category: z.string().min(2, 'Category is required'),
  description: z.string().min(10, 'Description is required'),
  type: z.string().min(2, 'Job type is required'),
  level: z.string().min(2, 'Experience level is required'),
  logo: z.union([z.string().url('Must be a valid URL'), z.literal('')]).optional(),
});

type JobFormData = z.infer<typeof jobSchema>;

export default function Admin() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [taxonomies, setTaxonomies] = useState<TaxonomyResponse>({ categories: [], jobTypes: [], experienceLevels: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      type: 'Full-time',
      level: 'Mid',
    }
  });

  const fetchJobs = async () => {
    try {
      const data = await jobApi.getAll();
      setJobs(data);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
      // Fallback mock
      setJobs([
        { id: '1', title: 'Senior Product Designer', company: 'Tesla', location: 'Palo Alto, CA', category: 'Design', description: '...', type: 'Full-time', level: 'Senior', postedAt: '2026-04-06' },
        { id: '2', title: 'Software Engineer', company: 'Google', location: 'Mountain View, CA', category: 'Technology', description: '...', type: 'Full-time', level: 'Mid', postedAt: '2026-04-07' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTaxonomies = async () => {
    try {
      const data = await taxonomyApi.getAll();
      setTaxonomies(data);
    } catch (error) {
      console.error("Failed to fetch taxonomies:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchTaxonomies();
  }, []);

  const onDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this job?')) return;
    try {
      await jobApi.delete(id);
      setJobs(jobs.filter(j => j.id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const onSubmit = async (data: JobFormData) => {
    try {
      await jobApi.create(data);
      setIsAdding(false);
      reset();
      fetchJobs();
    } catch (error) {
      console.error("Create failed:", error);
      alert("Failed to create job. Please try again.");
    }
  };

  return (
    <div className="bg-secondary-bg min-h-screen pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-2xl text-primary">
                <LayoutDashboard className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-text-main">Admin Dashboard</h1>
                <p className="text-text-muted">Manage your job listings and applications</p>
              </div>
            </div>
            <button 
              onClick={() => setIsAdding(true)}
              className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-opacity-90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Post New Job
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">Job Details</th>
                  <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">Date Posted</th>
                  <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {isLoading ? (
                  <tr><td colSpan={4} className="px-6 py-12 text-center text-text-muted">Loading jobs...</td></tr>
                ) : jobs.length === 0 ? (
                  <tr><td colSpan={4} className="px-6 py-12 text-center text-text-muted">No jobs found.</td></tr>
                ) : (
                  jobs.map((job) => (
                    <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                            <Briefcase className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-bold text-text-main">{job.title}</p>
                            <p className="text-xs text-text-muted">{job.company} • {job.location}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-secondary-bg text-text-muted text-xs font-bold rounded-full">
                          {job.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-text-muted">
                          <Calendar className="w-4 h-4" />
                          {job.postedAt}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => onDelete(job.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Job Modal */}
      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSubmitting && setIsAdding(false)}
              className="absolute inset-0 bg-footer-bg/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-2xl rounded-[2rem] p-8 md:p-12 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Post a New Job</h2>
                  <p className="text-text-muted text-sm">Fill in the details to list a new opportunity on QuickHire.</p>
                </div>
                <button onClick={() => setIsAdding(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-text-main">Job Title</label>
                    <input 
                      {...register('title')}
                      className={cn(
                        "w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none transition-all",
                        errors.title && "ring-2 ring-red-500"
                      )}
                      placeholder="e.g. Senior Product Designer"
                    />
                    {errors.title && <p className="text-xs text-red-500 font-medium">{errors.title.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-text-main">Company Name</label>
                    <input 
                      {...register('company')}
                      className={cn(
                        "w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none transition-all",
                        errors.company && "ring-2 ring-red-500"
                      )}
                      placeholder="e.g. Tesla"
                    />
                    {errors.company && <p className="text-xs text-red-500 font-medium">{errors.company.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-text-main">Company Logo URL (Optional)</label>
                    <input 
                      {...register('logo')}
                      className={cn(
                        "w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none transition-all",
                        errors.logo && "ring-2 ring-red-500"
                      )}
                      placeholder="e.g. https://logo.com/image.png"
                    />
                    {errors.logo && <p className="text-xs text-red-500 font-medium">{errors.logo.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-text-main">Location</label>
                    <input 
                      {...register('location')}
                      className={cn(
                        "w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none transition-all",
                        errors.location && "ring-2 ring-red-500"
                      )}
                      placeholder="e.g. Palo Alto, CA"
                    />
                    {errors.location && <p className="text-xs text-red-500 font-medium">{errors.location.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-text-main">Category</label>
                    <select 
                      {...register('category')}
                      className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none transition-all"
                    >
                      {taxonomies.categories.map(c => (
                        <option key={c.id} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-text-main">Job Type</label>
                    <select 
                      {...register('type')}
                      className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none transition-all"
                    >
                      {taxonomies.jobTypes.map(t => (
                        <option key={t.id} value={t.name}>{t.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-text-main">Experience Level</label>
                    <select 
                      {...register('level')}
                      className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none transition-all"
                    >
                      {taxonomies.experienceLevels.map(e => (
                        <option key={e.id} value={e.name}>{e.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-main">Job Description (HTML allowed)</label>
                  <textarea 
                    {...register('description')}
                    rows={6}
                    className={cn(
                      "w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none transition-all resize-none",
                      errors.description && "ring-2 ring-red-500"
                    )}
                    placeholder="Describe the role, responsibilities, and requirements..."
                  />
                  {errors.description && <p className="text-xs text-red-500 font-medium">{errors.description.message}</p>}
                </div>

                <button 
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-opacity-90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? "Posting..." : "Post Job Listing"}
                  {!isSubmitting && <Plus className="w-5 h-5" />}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
