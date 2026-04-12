<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\ExperienceLevel;
use App\Models\JobType;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\JobListing>
 */
class JobListingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->jobTitle();
        
        return [
            'title' => $title,
            'slug' => Str::slug($title) . '-' . Str::random(5),
            'company' => $this->faker->company(),
            'logo' => 'https://api.dicebear.com/7.x/initials/svg?seed=' . urlencode($this->faker->company()),
            'description' => $this->faker->paragraphs(5, true),
            'category_id' => Category::inRandomOrder()->first()?->id ?? Category::factory(),
            'job_type_id' => JobType::inRandomOrder()->first()?->id ?? JobType::factory(),
            'experience_level_id' => ExperienceLevel::inRandomOrder()->first()?->id ?? ExperienceLevel::factory(),
            'salary' => $this->faker->randomElement(['$40k - $60k', '$70k - $90k', '$100k - $130k', '$150k+']),
            'location' => $this->faker->city() . ', ' . $this->faker->country(),
            'is_active' => true,
        ];
    }
}
