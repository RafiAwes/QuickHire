<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreJobApplicationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Allow all for this job board test
    }

    public function rules(): array
    {
        return [
            'jobId' => 'required|exists:job_listings,id',
            'userName' => 'required|string|max:255',
            'userEmail' => 'required|email|max:255',
            'resumeUrl' => 'required|url|max:255',
            'coverNote' => 'required|string',
        ];
    }
}
