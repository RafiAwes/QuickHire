<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\JobApplication;
use App\Http\Resources\ApplicationResource;
use App\Http\Requests\StoreJobApplicationRequest;
use Illuminate\Http\JsonResponse;

class JobApplicationController extends Controller
{
    public function index(): JsonResponse
    {
        $applications = JobApplication::with('job')->latest()->get();
        return response()->json(ApplicationResource::collection($applications));
    }

    public function store(StoreJobApplicationRequest $request): JsonResponse
    {
        $validated = $request->validated();
        
        $application = JobApplication::create([
            'job_listing_id' => $validated['jobId'],
            'user_name' => $validated['userName'],
            'user_email' => $validated['userEmail'],
            'resume_url' => $validated['resumeUrl'],
            'cover_note' => $validated['coverNote'],
        ]);

        return response()->json(new ApplicationResource($application), 201);
    }
}
