import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Job } from '../types';

interface JobCardProps {
  job: Job;
  variant?: 'list' | 'featured';
}

const JobCard: React.FC<JobCardProps> = ({ job, variant = 'list' }) => {
  const isFeatured = variant === 'featured';

  if (isFeatured) {
    return (
      <Link to={`/jobs/${job.id}`} className="min-w-[320px] bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 group cursor-pointer block">
        <div className="flex items-start justify-between mb-8">
          <div className="w-16 h-16 rounded-xl bg-white shadow-sm border border-gray-50 p-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <img src={job.logo} alt={job.company} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
          </div>
          <span className="px-4 py-1.5 rounded-lg border border-primary text-primary text-xs font-bold bg-primary/5">
            {job.type}
          </span>
        </div>

        <h3 className="text-2xl font-bold text-text-main mb-3 group-hover:text-primary transition-colors leading-tight">
          {job.title}
        </h3>
        <p className="text-base text-text-muted mb-6 flex items-center gap-2">
          {job.company} <span className="w-1.5 h-1.5 rounded-full bg-gray-200" /> {job.location}
        </p>

        <p className="text-text-muted text-sm line-clamp-2 mb-8 leading-relaxed">
          {job.description.replace(/<[^>]*>/g, '')}
        </p>

        <div className="flex flex-wrap gap-2">
          <span className="px-5 py-2 rounded-full bg-orange-50 text-orange-500 text-xs font-bold">
            {job.category}
          </span>
          <span className="px-5 py-2 rounded-full bg-green-50 text-green-500 text-xs font-bold">
            {job.level}
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/jobs/${job.id}`} className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col md:flex-row items-center gap-8 group cursor-pointer block">
      <div className="w-16 h-16 rounded-xl bg-white shadow-sm border border-gray-50 p-3 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
        <img src={job.logo} alt={job.company} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
      </div>
      
      <div className="flex-1 text-center md:text-left">
        <h3 className="text-2xl font-bold text-text-main mb-2 group-hover:text-primary transition-colors">
          {job.title}
        </h3>
        <p className="text-base text-text-muted flex items-center justify-center md:justify-start gap-2">
          {job.company} <span className="w-1.5 h-1.5 rounded-full bg-gray-200" /> {job.location}
        </p>
      </div>

      <div className="flex flex-wrap justify-center md:justify-end gap-3">
        <span className="px-5 py-2 rounded-full bg-green-50 text-green-500 text-xs font-bold">
          {job.type}
        </span>
        <div className="w-[1px] h-6 bg-gray-100 hidden md:block mx-2" />
        <span className="px-5 py-2 rounded-full border border-orange-100 text-orange-500 text-xs font-bold bg-orange-50/30">
          {job.category}
        </span>
        <span className="px-5 py-2 rounded-full border border-primary/10 text-primary text-xs font-bold bg-primary/5">
          {job.level}
        </span>
      </div>
    </Link>
  );
};

export default JobCard;
