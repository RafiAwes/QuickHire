<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JobListingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => (string) $this->id,
            'title' => $this->title,
            'company' => $this->company,
            'location' => $this->location,
            'category' => $this->category ? $this->category->name : 'Unknown',
            'description' => $this->description,
            'type' => $this->jobType ? $this->jobType->name : 'Unknown',
            'level' => $this->experienceLevel ? $this->experienceLevel->name : 'Unknown',
            'salary' => $this->salary,
            'logo' => $this->logo,
            'postedAt' => $this->created_at->diffForHumans(), // Match "2 days ago" display format from frontend
        ];
    }
}
