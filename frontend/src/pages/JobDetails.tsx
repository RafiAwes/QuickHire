import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Clock, Briefcase, Building2, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'motion/react';
import { Job } from '../types';
import { jobApi, applicationApi } from '../lib/api';
import { cn } from '../lib/utils';

const applicationSchema = z.object({
  userName: z.string().min(2, 'Name is required'),
  userEmail: z.string().email('Invalid email address'),
  resumeUrl: z.string().url('Invalid resume URL'),
  coverNote: z.string().min(10, 'Cover note must be at least 10 characters'),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isApplying, setIsApplying] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
  });

  useEffect(() => {
    const fetchJob = async () => {
      if (!id) return;
      try {
        const data = await jobApi.getById(id);
        setJob(data);
      } catch (error) {
        console.error("Failed to fetch job:", error);
        // Fallback mock
        setJob({
          id: id,
          title: 'Senior Product Designer',
          company: 'Tesla',
          location: 'Palo Alto, CA',
          category: 'Design',
          description: `
            <p>We are looking for a Senior Product Designer to join our team and help us build the future of sustainable energy. You will be responsible for designing intuitive and beautiful interfaces for our web and mobile applications.</p>
            <br/>
            <h3 class="font-bold text-lg">Responsibilities:</h3>
            <ul class="list-disc pl-5 space-y-2 mt-2">
              <li>Lead design projects from concept to launch.</li>
              <li>Collaborate with engineers and product managers.</li>
              <li>Create high-fidelity prototypes and design specs.</li>
              <li>Conduct user research and usability testing.</li>
            </ul>
            <br/>
            <h3 class="font-bold text-lg">Requirements:</h3>
            <ul class="list-disc pl-5 space-y-2 mt-2">
              <li>5+ years of experience in product design.</li>
              <li>Strong portfolio demonstrating UX/UI skills.</li>
              <li>Proficiency in Figma and other design tools.</li>
              <li>Excellent communication and collaboration skills.</li>
            </ul>
          `,
          type: 'Full-time',
          level: 'Senior',
          postedAt: '2 days ago',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg'
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const onSubmit = async (data: ApplicationFormData) => {
    if (!id) return;
    try {
      await applicationApi.submit({
        ...data,
        jobId: id,
      });
      setIsSubmitted(true);
      setTimeout(() => {
        setIsApplying(false);
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Application failed:", error);
      alert("Failed to submit application. Please try again.");
    }
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!job) return <div className="min-h-screen flex items-center justify-center">Job not found</div>;

  return (
    <div className="bg-secondary-bg min-h-screen pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 pt-12 pb-20">
        <div className="max-w-4xl mx-auto px-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to jobs
          </button>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-secondary-bg flex items-center justify-center p-4">
                {job.logo ? (
                  <img src={job.logo} alt={job.company} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                ) : (
                  <Building2 className="w-10 h-10 text-primary" />
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-text-main mb-2">{job.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted font-medium">
                  <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4" /> {job.company}</span>
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {job.location}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {job.postedAt}</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsApplying(true)}
              className="bg-primary text-white px-10 py-4 rounded-xl font-bold hover:bg-opacity-90 transition-all shadow-lg shadow-primary/20"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold mb-6">Job Description</h2>
              <div 
                className="text-text-muted leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ __html: job.description }}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="font-bold mb-6">Job Overview</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted font-medium uppercase tracking-wider">Date Posted</p>
                    <p className="text-sm font-bold">{job.postedAt}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted font-medium uppercase tracking-wider">Location</p>
                    <p className="text-sm font-bold">{job.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted font-medium uppercase tracking-wider">Job Type</p>
                    <p className="text-sm font-bold">{job.type}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      <AnimatePresence>
        {isApplying && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSubmitting && setIsApplying(false)}
              className="absolute inset-0 bg-footer-bg/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-lg rounded-[2rem] p-8 md:p-12 shadow-2xl overflow-hidden"
            >
              {isSubmitted ? (
                <div className="text-center py-12 space-y-6">
                  <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h2 className="text-2xl font-bold">Application Sent!</h2>
                  <p className="text-text-muted">Your application for {job.title} has been submitted successfully. Good luck!</p>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-2">Apply for this job</h2>
                    <p className="text-text-muted text-sm">Fill in the details below to submit your application to {job.company}.</p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-text-main">Full Name</label>
                      <input 
                        {...register('userName')}
                        className={cn(
                          "w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none transition-all",
                          errors.userName && "ring-2 ring-red-500"
                        )}
                        placeholder="John Doe"
                      />
                      {errors.userName && <p className="text-xs text-red-500 font-medium">{errors.userName.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-text-main">Email Address</label>
                      <input 
                        {...register('userEmail')}
                        className={cn(
                          "w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none transition-all",
                          errors.userEmail && "ring-2 ring-red-500"
                        )}
                        placeholder="john@example.com"
                      />
                      {errors.userEmail && <p className="text-xs text-red-500 font-medium">{errors.userEmail.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-text-main">Resume URL</label>
                      <input 
                        {...register('resumeUrl')}
                        className={cn(
                          "w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none transition-all",
                          errors.resumeUrl && "ring-2 ring-red-500"
                        )}
                        placeholder="https://drive.google.com/..."
                      />
                      {errors.resumeUrl && <p className="text-xs text-red-500 font-medium">{errors.resumeUrl.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-text-main">Cover Note</label>
                      <textarea 
                        {...register('coverNote')}
                        rows={4}
                        className={cn(
                          "w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none transition-all resize-none",
                          errors.coverNote && "ring-2 ring-red-500"
                        )}
                        placeholder="Tell us why you're a great fit..."
                      />
                      {errors.coverNote && <p className="text-xs text-red-500 font-medium">{errors.coverNote.message}</p>}
                    </div>

                    <button 
                      disabled={isSubmitting}
                      className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-opacity-90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                      {!isSubmitting && <Send className="w-4 h-4" />}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
