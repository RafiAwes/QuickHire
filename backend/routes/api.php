<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

use App\Http\Controllers\Api\JobListingController;
use App\Http\Controllers\Api\TaxonomyController;
use App\Http\Controllers\Api\JobApplicationController;

Route::apiResource('jobs', JobListingController::class)->only(['index', 'store', 'show', 'destroy']);
Route::apiResource('applications', JobApplicationController::class)->only(['index', 'store']);
Route::get('/taxonomies', [TaxonomyController::class, 'index']);
