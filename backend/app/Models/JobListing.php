<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JobListing extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'slug',
        'description',
        'category_id',
        'job_type_id',
        'experience_level_id',
        'salary_range',
        'location',
        'is_remote',
        'is_active',
    ];

    /**
     * Get the category that owns the job listing.
     *
     * @return BelongsTo
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the job type that owns the job listing.
     *
     * @return BelongsTo
     */
    public function jobType(): BelongsTo
    {
        return $this->belongsTo(JobType::class);
    }

    /**
     * Get the experience level that owns the job listing.
     *
     * @return BelongsTo
     */
    public function experienceLevel(): BelongsTo
    {
        return $this->belongsTo(ExperienceLevel::class);
    }
}
