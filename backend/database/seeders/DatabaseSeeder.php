<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Clear existing jobs and applications ONLY
        // We use DB::statement to avoid foreign key constraints during the process
        \Illuminate\Support\Facades\DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        \App\Models\JobApplication::truncate();
        \App\Models\JobListing::truncate();
        \Illuminate\Support\Facades\DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // 2. Call the high-quality JobListingSeeder
        $this->call(JobListingSeeder::class);

        // 3. Populate applications for the new jobs
        \App\Models\JobListing::all()->each(function ($job) {
            \App\Models\JobApplication::factory(rand(3, 5))->create([
                'job_listing_id' => $job->id
            ]);
        });
        
        $this->command->info('Successfully refreshed jobs and applications with high-quality data.');
    }
}
