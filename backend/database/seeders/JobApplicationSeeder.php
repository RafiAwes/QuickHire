<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;
use App\Models\JobListing;
use App\Models\JobApplication;

class JobApplicationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        
        // Fetch all existing job listings to link applications to
        $jobs = JobListing::pluck('id')->toArray();

        if (empty($jobs)) {
            // Exit if there are no job listings
            return;
        }

        $applications = [];

        for ($i = 0; $i < 30; $i++) {
            $applications[] = [
                'job_listing_id' => $faker->randomElement($jobs),
                'user_name' => $faker->name,
                'user_email' => $faker->unique()->safeEmail,
                'resume_url' => $faker->url . '/resume.pdf',
                'cover_note' => $faker->paragraphs(2, true),
                'created_at' => $faker->dateTimeBetween('-2 months', 'now'),
                'updated_at' => now(),
            ];
        }

        DB::table('job_applications')->insert($applications);
    }
}
