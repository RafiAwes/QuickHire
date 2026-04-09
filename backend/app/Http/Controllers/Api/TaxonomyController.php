<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Category;
use App\Models\JobType;
use App\Models\ExperienceLevel;

class TaxonomyController extends Controller
{
    /**
     * Get all taxonomies in a single request for the frontend dropdowns.
     */
    public function index(): JsonResponse
    {
        return response()->json([
            'categories' => Category::where('is_active', true)->get(['id', 'name']),
            'jobTypes' => JobType::where('is_active', true)->get(['id', 'name']),
            'experienceLevels' => ExperienceLevel::where('is_active', true)->get(['id', 'name'])
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
    public function destroy(string $id)
    {
        //
    }
}
