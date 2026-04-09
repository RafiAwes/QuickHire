import React, { useEffect, useState } from 'react';
import { Search, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import JobCard from '../components/JobCard';
import CategoryCard from '../components/CategoryCard';
import { Job, Category } from '../types';
import { jobApi } from '../lib/api';

import { taxonomyApi } from '../lib/api';

const PARTNERS = [
  { name: 'Vodafone', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Vodafone_icon.svg' },
  { name: 'Intel', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Intel-logo.svg' },
  { name: 'Tesla', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg' },
  { name: 'AMD', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/AMD_Logo.svg' },
  { name: 'Talkit', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Talkit_logo.svg/2560px-Talkit_logo.svg.png' },
];

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await jobApi.getAll();
        setJobs(data);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
        setJobs([
          {
            id: '1',
            title: 'Email Marketing',
            company: 'Revolut',
            location: 'Madrid, Spain',
            category: 'Marketing',
            description: 'Revolut is looking for Email Marketing to help team ma ...',
            type: 'Full Time',
            level: 'Mid',
            postedAt: '2 days ago',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Revolut_logo.svg/1200px-Revolut_logo.svg.png'
          },
          {
            id: '2',
            title: 'Brand Designer',
            company: 'Dropbox',
            location: 'San Fransisco, USA',
            category: 'Design',
            description: 'Dropbox is looking for Brand Designer to help the team t ...',
            type: 'Full Time',
            level: 'Senior',
            postedAt: '1 day ago',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Dropbox_Icon.svg'
          },
          {
            id: '3',
            title: 'Social Media Assistant',
            company: 'Nomad',
            location: 'Paris, France',
            category: 'Marketing',
            description: 'Nomad is looking for Social Media Assistant to help team ...',
            type: 'Full-Time',
            level: 'Junior',
            postedAt: '3 days ago',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Nomad_logo.svg/2560px-Nomad_logo.svg.png'
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    const fetchTaxonomies = async () => {
      try {
        const data = await taxonomyApi.getAll();
        setCategories(data.categories);
      } catch (error) {
        console.error("Failed to fetch taxonomies:", error);
      }
    };

    fetchJobs();
    fetchTaxonomies();
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 geometric-pattern" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-5xl lg:text-7xl font-bold text-text-main leading-tight mb-6">
                Discover <br />
                more than <br />
                <span className="relative inline-block text-accent-blue">
                  5000+ Jobs
                  <svg className="underline-svg" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 10C50 4 150 4 298 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>
              <p className="text-lg text-text-muted mb-10 max-w-xl mx-auto lg:mx-0">
                Great platform for the job seeker that searching for new career heights and passionate about startups.
              </p>

              <div className="bg-white p-2 rounded-2xl shadow-xl shadow-primary/5 flex flex-col md:flex-row items-center gap-2 max-w-3xl border border-gray-100">
                <div className="flex-1 flex items-center gap-3 px-4 py-3 w-full border-b md:border-b-0 md:border-r border-gray-100">
                  <Search className="w-5 h-5 text-text-muted" />
                  <input 
                    type="text" 
                    placeholder="Job title or keyword"
                    className="w-full outline-none text-text-main placeholder:text-text-muted"
                  />
                </div>
                <div className="flex-1 flex items-center gap-3 px-4 py-3 w-full">
                  <MapPin className="w-5 h-5 text-text-muted" />
                  <input 
                    type="text" 
                    placeholder="Florence, Italy"
                    className="w-full outline-none text-text-main placeholder:text-text-muted"
                  />
                </div>
                <button className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary/90 transition-all w-full md:w-auto whitespace-nowrap">
                  Search my job
                </button>
              </div>

              <p className="mt-6 text-sm text-text-muted">
                <span className="font-medium text-text-main">Popular :</span> UI Designer, UX Researcher, Android, Admin
              </p>
            </div>

            <div className="flex-1 relative hidden lg:block">
              <div className="relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800" 
                  alt="Happy professional" 
                  className="rounded-3xl shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-blue/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-primary/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-12 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-text-muted mb-10 text-center lg:text-left font-medium">Companies we helped grow</p>
          <div className="flex flex-wrap justify-center lg:justify-between items-center gap-10 lg:gap-4">
            {PARTNERS.map((partner) => (
              <div key={partner.name} className="group cursor-pointer">
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="h-8 lg:h-10 max-w-[140px] object-contain opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500" 
                  referrerPolicy="no-referrer" 
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore by Category */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-text-main">
              Explore by <span className="text-accent-blue">category</span>
            </h2>
            <Link to="/jobs" className="text-primary font-bold flex items-center gap-2 group hover:gap-3 transition-all">
              Show all jobs
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-[40px] overflow-hidden relative">
            <div className="absolute inset-0 geometric-pattern opacity-10" />
            <div className="flex flex-col lg:flex-row items-center relative z-10">
              <div className="flex-1 p-12 lg:p-20 text-center lg:text-left">
                <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                  Start posting <br /> jobs today
                </h2>
                <p className="text-white/80 text-lg mb-10">
                  Start posting jobs for only $10.
                </p>
                <button className="bg-white text-primary px-10 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all">
                  Sign Up For Free
                </button>
              </div>
              <div className="flex-1 w-full lg:w-auto">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200" 
                  alt="Dashboard preview" 
                  className="w-full h-full object-cover lg:rounded-l-[40px] shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-24 bg-secondary-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-text-main">
              Featured <span className="text-accent-blue">jobs</span>
            </h2>
            <Link to="/jobs" className="text-primary font-bold flex items-center gap-2 group hover:gap-3 transition-all">
              Show all jobs
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="flex overflow-x-auto gap-6 pb-8 scrollbar-hide">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} variant="featured" />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Jobs */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-text-main">
              Latest <span className="text-accent-blue">jobs open</span>
            </h2>
            <Link to="/jobs" className="text-primary font-bold flex items-center gap-2 group hover:gap-3 transition-all">
              Show all jobs
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
