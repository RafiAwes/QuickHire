<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\StoreJobListingRequest;
use App\Http\Resources\JobListingResource;
use App\Services\JobListingService;
use App\Models\JobListing;
use Illuminate\Http\JsonResponse;

class JobListingController extends Controller
{
    private JobListingService $jobListingService;

    public function __construct(JobListingService $jobListingService)
    {
        $this->jobListingService = $jobListingService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        // Eager load relationships for optimization (avoids N+1 query problem)
        $jobs = JobListing::with(['category', 'jobType', 'experienceLevel'])
            ->where('is_active', true)
            ->latest()
            ->get();

        return response()->json(JobListingResource::collection($jobs));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreJobListingRequest $request): JsonResponse
    {
        // Offloads processing to the service class
        $job = $this->jobListingService->createJob($request->validated());

        // Reload relationships to return standard resource representation
        $job->load(['category', 'jobType', 'experienceLevel']);

        return response()->json(new JobListingResource($job), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $job = JobListing::with(['category', 'jobType', 'experienceLevel'])->findOrFail($id);
        
        return response()->json(new JobListingResource($job));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        $job = JobListing::findOrFail($id);
        $job->delete();

        return response()->json(null, 204);
    }
}
