<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'slug',
        'icon',
        'description',
        'is_active',
    ];

    /**
     * Get the job listings associated with this category.
     *
     * @return HasMany
     */
    public function jobListings(): HasMany
    {
        return $this->hasMany(JobListing::class);
    }
}
