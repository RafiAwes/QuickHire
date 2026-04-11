<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ApplicationResource extends JsonResource
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
            'jobId' => (string) $this->job_listing_id,
            'userName' => $this->user_name,
            'userEmail' => $this->user_email,
            'resumeUrl' => $this->resume_url,
            'coverNote' => $this->cover_note,
            'appliedAt' => $this->created_at->format('M d, Y'),
            'job' => $this->whenLoaded('job', function () {
                return [
                    'title' => $this->job->title,
                    'company' => $this->job->company,
                    'logo' => $this->job->logo,
                ];
            }),
        ];
    }
}
