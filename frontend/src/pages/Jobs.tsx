import React, { useEffect, useState } from 'react';
import { Search, MapPin, Filter, Briefcase, ArrowRight } from 'lucide-react';
import { Job } from '../types';
import { jobApi } from '../lib/api';
import JobCard from '../components/JobCard';
import { cn } from '../lib/utils';

const CATEGORIES = ['All', 'Design', 'Technology', 'Marketing', 'Finance', 'Engineering', 'Sales'];

export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await jobApi.getAll();
        setJobs(data);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = job.location.toLowerCase().includes(locationQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || job.category === selectedCategory;
    
    return matchesSearch && matchesLocation && matchesCategory;
  });

  return (
    <div className="bg-secondary-bg min-h-screen pb-24">
      {/* Search Header */}
      <div className="bg-white border-b border-gray-100 pt-12 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-text-main mb-4">Find your dream job</h1>
            <p className="text-text-muted">Browse through thousands of opportunities from top companies</p>
          </div>

          <div className="bg-white p-2 rounded-2xl shadow-xl shadow-primary/5 flex flex-col lg:flex-row items-center gap-2 max-w-5xl mx-auto border border-gray-100">
            <div className="flex-1 flex items-center gap-3 px-4 py-3 w-full border-b lg:border-b-0 lg:border-r border-gray-100">
              <Search className="w-5 h-5 text-text-muted" />
              <input 
                type="text" 
                placeholder="Job title or keyword"
                className="w-full outline-none text-text-main placeholder:text-text-muted"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex-1 flex items-center gap-3 px-4 py-3 w-full border-b lg:border-b-0 lg:border-r border-gray-100">
              <MapPin className="w-5 h-5 text-text-muted" />
              <input 
                type="text" 
                placeholder="Location"
                className="w-full outline-none text-text-main placeholder:text-text-muted"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
              />
            </div>
            <div className="flex-1 flex items-center gap-3 px-4 py-3 w-full">
              <Filter className="w-5 h-5 text-text-muted" />
              <select 
                className="w-full outline-none text-text-main bg-transparent"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <button className="bg-primary text-white px-10 py-4 rounded-xl font-bold hover:bg-primary/90 transition-all w-full lg:w-auto whitespace-nowrap">
              Search Jobs
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters (Desktop) */}
          <aside className="w-full lg:w-64 space-y-8 hidden lg:block">
            <div>
              <h3 className="font-bold text-text-main mb-4">Categories</h3>
              <div className="space-y-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-all",
                      selectedCategory === cat 
                        ? "bg-primary text-white" 
                        : "text-text-muted hover:bg-white hover:text-primary"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Job List */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-text-main">
                {isLoading ? "Searching..." : `${filteredJobs.length} Jobs Found`}
              </h2>
            </div>

            <div className="space-y-6">
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-32 bg-white rounded-2xl animate-pulse border border-gray-100" />
                  ))}
                </div>
              ) : filteredJobs.length > 0 ? (
                filteredJobs.map(job => (
                  <JobCard key={job.id} job={job} />
                ))
              ) : (
                <div className="bg-white p-12 rounded-2xl border border-gray-100 text-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="w-8 h-8 text-gray-300" />
                  </div>
                  <h3 className="text-xl font-bold text-text-main mb-2">No jobs found</h3>
                  <p className="text-text-muted">Try adjusting your search or filters to find what you're looking for.</p>
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setLocationQuery('');
                      setSelectedCategory('All');
                    }}
                    className="mt-6 text-primary font-bold hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
