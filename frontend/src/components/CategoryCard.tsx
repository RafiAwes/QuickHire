import React from 'react';
import * as Icons from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  // Dynamically get the icon component
  const IconComponent = (Icons as any)[category.icon] || Icons.Briefcase;

  return (
    <div className="group bg-white p-8 rounded-2xl border border-gray-100 hover:bg-primary transition-all duration-300 cursor-pointer">
      <div className="flex items-start justify-between mb-8">
        <div className="w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-white/20 group-hover:text-white transition-all duration-300">
          <IconComponent className="w-8 h-8" />
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-text-main mb-2 group-hover:text-white transition-colors">
        {category.name}
      </h3>
      <div className="flex items-center justify-between">
        <p className="text-text-muted group-hover:text-white/80 transition-colors">
          {category.jobCount} jobs available
        </p>
        <ArrowRight className="w-5 h-5 text-text-main group-hover:text-white transition-all transform group-hover:translate-x-1" />
      </div>
    </div>
  );
};

export default CategoryCard;

