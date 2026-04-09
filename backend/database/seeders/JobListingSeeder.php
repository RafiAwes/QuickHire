<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\ExperienceLevel;
use App\Models\JobListing;
use App\Models\JobType;
use Illuminate\Support\Str;

class JobListingSeeder extends Seeder
{
    public function run(): void
    {
        // Cache our taxonomies into ID lookup maps so we don't query the DB inside the loop
        $categories = Category::pluck('id', 'name')->toArray();
        $jobTypes = JobType::pluck('id', 'name')->toArray();
        $levels = ExperienceLevel::pluck('id', 'name')->toArray();

        // Safety check to ensure we have seeded taxa first
        if (empty($categories) || empty($jobTypes) || empty($levels)) {
            $this->command->error('Taxonomies not found! Please run TaxonomySeeder first.');
            return;
        }

        $jobs = [
            [
                'title' => 'Senior Frontend Developer',
                'company' => 'Stripe',
                'logo' => 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg',
                'description' => '<p>We are looking for an experienced frontend developer to build world-class user interfaces using React and modern CSS.</p><ul><li>5+ years of React experience</li><li>History of high quality UI/UX</li></ul>',
                'location' => 'San Francisco, CA',
                'salary' => '$140k - $180k',
                'category_id' => $categories['Technology'] ?? array_values($categories)[0],
                'job_type_id' => $jobTypes['Full-time'] ?? array_values($jobTypes)[0],
                'experience_level_id' => $levels['Senior'] ?? array_values($levels)[0],
            ],
            [
                'title' => 'Product Designer',
                'company' => 'Airbnb',
                'logo' => 'https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg',
                'description' => '<p>Join our core trips team to design the future of travel. You will have extreme ownership over user journeys and booking flows.</p>',
                'location' => 'Remote',
                'salary' => '$120k - $150k',
                'category_id' => $categories['Design'] ?? array_values($categories)[0],
                'job_type_id' => $jobTypes['Remote'] ?? array_values($jobTypes)[0],
                'experience_level_id' => $levels['Mid'] ?? array_values($levels)[0],
            ],
            [
                'title' => 'Enterprise Sales Lead',
                'company' => 'Salesforce',
                'logo' => 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg',
                'description' => '<p>Lead our hyper-growth enterprise sector. Strong B2B sales background required.</p>',
                'location' => 'New York, NY',
                'salary' => '$200k+ OTE',
                'category_id' => $categories['Sales'] ?? array_values($categories)[0],
                'job_type_id' => $jobTypes['Full-time'] ?? array_values($jobTypes)[0],
                'experience_level_id' => $levels['Lead'] ?? array_values($levels)[0],
            ],
            [
                'title' => 'Backend Engineering Intern',
                'company' => 'Vercel',
                'logo' => 'https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png',
                'description' => '<p>Help build the infrastructure underlying the modern web! Ideal for upcoming computer science graduates with strong Rust or Go knowledge.</p>',
                'location' => 'Austin, TX',
                'salary' => '$5k / month',
                'category_id' => $categories['Engineering'] ?? array_values($categories)[0],
                'job_type_id' => $jobTypes['Part-time'] ?? array_values($jobTypes)[0],
                'experience_level_id' => $levels['Junior'] ?? array_values($levels)[0],
            ],
            [
                'title' => 'Growth Automation Marketer',
                'company' => 'Notion',
                'logo' => 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png',
                'description' => '<p>Looking to supercharge Notion adoption through creative pipeline generation and programmatic email campaigns.</p>',
                'location' => 'Toronto, ON',
                'salary' => '$90k - $110k',
                'category_id' => $categories['Marketing'] ?? array_values($categories)[0],
                'job_type_id' => $jobTypes['Contract'] ?? array_values($jobTypes)[0],
                'experience_level_id' => $levels['Mid'] ?? array_values($levels)[0],
            ],
            [
                'title' => 'VP of Finance',
                'company' => 'Coinbase',
                'logo' => 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Coinbase_Logo_2013.v1.svg',
                'description' => '<p>We need an experienced leader natively familiar with high-volume fintech regulatory management and cap-table structuring.</p>',
                'location' => 'Remote',
                'salary' => '$250k - $300k',
                'category_id' => $categories['Finance'] ?? array_values($categories)[0],
                'job_type_id' => $jobTypes['Full-time'] ?? array_values($jobTypes)[0],
                'experience_level_id' => $levels['Lead'] ?? array_values($levels)[0],
            ],
        ];

        foreach ($jobs as $job) {
            $baseSlug = Str::slug($job['company'] . ' ' . $job['title']);
            $slug = $baseSlug;
            $counter = 1;

            while (JobListing::where('slug', $slug)->exists()) {
                $slug = $baseSlug . '-' . $counter;
                $counter++;
            }

            JobListing::create(array_merge($job, ['slug' => $slug, 'is_active' => true]));
        }
    }
}
