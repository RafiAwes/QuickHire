<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreJobListingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // No auth system per requirements
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'min:2', 'max:255'],
            'company' => ['required', 'string', 'min:2', 'max:255'],
            'location' => ['required', 'string', 'min:2', 'max:255'],
            'category' => ['required', 'string', 'min:2', 'max:255'],
            'description' => ['required', 'string', 'min:10'],
            'type' => ['required', 'string', 'in:Full-time,Part-time,Contract,Remote'],
            'level' => ['required', 'string', 'in:Junior,Mid,Senior,Lead'],
            'salary' => ['nullable', 'string', 'max:255'],
            'logo' => ['nullable', 'string', 'url', 'max:1024'],
        ];
    }
}
