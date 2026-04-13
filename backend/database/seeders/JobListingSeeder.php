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
            // Technology
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
                'title' => 'DevOps Engineer',
                'company' => 'HashiCorp',
                'logo' => 'https://www.vectorlogo.zone/logos/hashicorp/hashicorp-icon.svg',
                'description' => '<p>Help us build the next generation of infrastructure automation tools. Experience with Terraform, Vault, and Nomad is a plus.</p>',
                'location' => 'Remote',
                'salary' => '$150k - $190k',
                'category_id' => $categories['Technology'] ?? array_values($categories)[0],
                'job_type_id' => $jobTypes['Remote'] ?? array_values($jobTypes)[0],
                'experience_level_id' => $levels['Mid'] ?? array_values($levels)[0],
            ],
            // Design
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
                'title' => 'Brand Designer',
                'company' => 'Figma',
                'logo' => 'https://www.vectorlogo.zone/logos/figma/figma-icon.svg',
                'description' => '<p>Help us evolve the Figma brand. You will work on marketing campaigns, product illustrations, and brand systems.</p>',
                'location' => 'San Francisco, CA',
                'salary' => '$110k - $140k',
                'category_id' => $categories['Design'] ?? array_values($categories)[0],
                'job_type_id' => $jobTypes['Full-time'] ?? array_values($jobTypes)[0],
                'experience_level_id' => $levels['Senior'] ?? array_values($levels)[0],
            ],
            // Sales
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
                'title' => 'Account Executive',
                'company' => 'HubSpot',
                'logo' => 'https://www.vectorlogo.zone/logos/hubspot/hubspot-icon.svg',
                'description' => '<p>Manage relationships with key accounts and drive growth within our platform ecosystem.</p>',
                'location' => 'Boston, MA',
                'salary' => '$90k - $120k',
                'category_id' => $categories['Sales'] ?? array_values($categories)[0],
                'job_type_id' => $jobTypes['Full-time'] ?? array_values($jobTypes)[0],
                'experience_level_id' => $levels['Mid'] ?? array_values($levels)[0],
            ],
            // Engineering
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
                'title' => 'Full Stack Engineer',
                'company' => 'Linear',
                'logo' => 'https://www.vectorlogo.zone/logos/linear/linear-icon.svg',
                'description' => '<p>Build the future of project management. We are a small, focused team looking for engineers who care deeply about craft.</p>',
                'location' => 'Remote',
                'salary' => '$160k - $200k',
                'category_id' => $categories['Engineering'] ?? array_values($categories)[0],
                'job_type_id' => $jobTypes['Remote'] ?? array_values($jobTypes)[0],
                'experience_level_id' => $levels['Senior'] ?? array_values($levels)[0],
            ],
            // Marketing
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
                'title' => 'Content Strategist',
                'company' => 'Ghost',
                'logo' => 'https://www.vectorlogo.zone/logos/ghost/ghost-icon.svg',
                'description' => '<p>Define our content strategy and help publishers succeeds with modern publishing tools.</p>',
                'location' => 'Remote',
                'salary' => '$80k - $100k',
                'category_id' => $categories['Marketing'] ?? array_values($categories)[0],
                'job_type_id' => $jobTypes['Full-time'] ?? array_values($jobTypes)[0],
                'experience_level_id' => $levels['Mid'] ?? array_values($levels)[0],
            ],
            // Finance
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
            [
                'title' => 'Senior Accountant',
                'company' => 'Mercury',
                'logo' => 'https://www.vectorlogo.zone/logos/mercury/mercury-icon.svg',
                'description' => '<p>Join our finance team to manage accounting operations for a fast-growing banking platform.</p>',
                'location' => 'San Francisco, CA',
                'salary' => '$100k - $130k',
                'category_id' => $categories['Finance'] ?? array_values($categories)[0],
                'job_type_id' => $jobTypes['Full-time'] ?? array_values($jobTypes)[0],
                'experience_level_id' => $levels['Senior'] ?? array_values($levels)[0],
            ],
            // Business
            [
                'title' => 'Operations Manager',
                'company' => 'Uber',
                'logo' => 'https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg',
                'description' => '<p>Optimize our market operations and driver engagement strategies.</p>',
                'location' => 'Chicago, IL',
                'salary' => '$120k - $150k',
                'category_id' => $categories['Business'] ?? array_values($categories)[0],
                'job_type_id' => $jobTypes['Full-time'] ?? array_values($jobTypes)[0],
                'experience_level_id' => $levels['Mid'] ?? array_values($levels)[0],
            ],
            [
                'title' => 'Strategy Consultant',
                'company' => 'McKinsey',
                'logo' => 'https://upload.wikimedia.org/wikipedia/commons/4/4e/McKinsey_%26_Company_logo.svg',
                'description' => '<p>Advise top-tier clients on their most critical business challenges.</p>',
                'location' => 'London, UK',
                'salary' => '$140k - $180k',
                'category_id' => $categories['Business'] ?? array_values($categories)[0],
                'job_type_id' => $jobTypes['Full-time'] ?? array_values($jobTypes)[0],
                'experience_level_id' => $levels['Lead'] ?? array_values($levels)[0],
            ],
            // Human Resources
            [
                'title' => 'People Ops Manager',
                'company' => 'Remote',
                'logo' => 'https://www.vectorlogo.zone/logos/remote/remote-icon.svg',
                'description' => '<p>Help us scale our remote-first culture and employee experience programs.</p>',
                'location' => 'Remote',
                'salary' => '$110k - $140k',
                'category_id' => $categories['Human Resources'] ?? array_values($categories)[0],
                'job_type_id' => $jobTypes['Remote'] ?? array_values($jobTypes)[0],
                'experience_level_id' => $levels['Mid'] ?? array_values($levels)[0],
            ],
            [
                'title' => 'Talent Acquisition Specialist',
                'company' => 'Deel',
                'logo' => 'https://www.vectorlogo.zone/logos/letsdeel/letsdeel-icon.svg',
                'description' => '<p>Identify and hire top talent for our fast-growing global team.</p>',
                'location' => 'Remote',
                'salary' => '$90k - $120k',
                'category_id' => $categories['Human Resources'] ?? array_values($categories)[0],
                'job_type_id' => $jobTypes['Full-time'] ?? array_values($jobTypes)[0],
                'experience_level_id' => $levels['Mid'] ?? array_values($levels)[0],
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
