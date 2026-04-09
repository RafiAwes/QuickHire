<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\JobType;
use App\Models\ExperienceLevel;
use Illuminate\Support\Str;

class TaxonomySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Design', 'icon' => 'Palette'],
            ['name' => 'Sales', 'icon' => 'BarChart'],
            ['name' => 'Marketing', 'icon' => 'Megaphone'],
            ['name' => 'Finance', 'icon' => 'DollarSign'],
            ['name' => 'Technology', 'icon' => 'Code'],
            ['name' => 'Engineering', 'icon' => 'Settings'],
            ['name' => 'Business', 'icon' => 'Briefcase'],
            ['name' => 'Human Resources', 'icon' => 'Users'],
        ];

        foreach ($categories as $cat) {
            Category::firstOrCreate(
                ['slug' => Str::slug($cat['name'])],
                ['name' => $cat['name'], 'icon' => $cat['icon']]
            );
        }

        $jobTypes = [
            'Full-time',
            'Part-time',
            'Contract',
            'Remote'
        ];

        foreach ($jobTypes as $type) {
            JobType::firstOrCreate(
                ['slug' => Str::slug($type)],
                ['name' => $type]
            );
        }

        $experienceLevels = [
            'Junior',
            'Mid',
            'Senior',
            'Lead'
        ];

        foreach ($experienceLevels as $level) {
            ExperienceLevel::firstOrCreate(
                ['slug' => Str::slug($level)],
                ['name' => $level]
            );
        }
    }
}
