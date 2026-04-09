<?php

namespace App\Services;

use App\Models\Category;
use App\Models\ExperienceLevel;
use App\Models\JobListing;
use App\Models\JobType;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class JobListingService
{
    /**
     * Create a new Job Listing from raw data.
     * Maps frontend string fields to existing foreign keys,
     * or creates new missing entries to avoid breaking the UI.
     *
     * @param array $data
     * @return JobListing
     */
    public function createJob(array $data): JobListing
    {
        return DB::transaction(function () use ($data) {
            // Retrieve or dynamically create related taxonomy entries
            $categoryId = Category::firstOrCreate(
                ['name' => $data['category']],
                ['slug' => Str::slug($data['category'])]
            )->id;

            $jobTypeId = JobType::firstOrCreate(
                ['name' => $data['type']],
                ['slug' => Str::slug($data['type'])]
            )->id;

            $experienceLevelId = ExperienceLevel::firstOrCreate(
                ['name' => $data['level']],
                ['slug' => Str::slug($data['level'])]
            )->id;

            // Generate unique slug for the job listing
            $baseSlug = Str::slug($data['company'] . ' ' . $data['title']);
            $slug = $baseSlug;
            $counter = 1;

            // Simple uniqueness check
            while (JobListing::where('slug', $slug)->exists()) {
                $slug = $baseSlug . '-' . $counter;
                $counter++;
            }

            // Provision the job listing model
            return JobListing::create([
                'title' => $data['title'],
                'slug' => $slug,
                'company' => $data['company'],
                'logo' => $data['logo'] ?? null,
                'description' => $data['description'],
                'location' => $data['location'],
                'salary' => $data['salary'] ?? null,
                'category_id' => $categoryId,
                'job_type_id' => $jobTypeId,
                'experience_level_id' => $experienceLevelId,
                'is_active' => true,
            ]);
        });
    }
}
