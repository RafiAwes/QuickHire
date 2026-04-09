<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

use App\Http\Controllers\Api\JobListingController;

Route::apiResource('jobs', JobListingController::class)->only(['index', 'store', 'destroy']);
