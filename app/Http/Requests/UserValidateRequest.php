<?php

namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class UserValidateRequest extends FormRequest
{
    public function rules()
    {
        return [
            'name' => 'required|string|max:100',
            'email' => 'required|string|email|unique:users',
        ];
    }
    public function messages()
    {
        return [
            'name.required' => 'name is required',
            'name.string' => 'name is string',
            'name.max' => 'name should not be more than 100 character',
            'email.required' => 'email is required',
            'email.email' => 'you should enter a valid email',
            'email.unique' => 'this email already exists',

        ];
    }
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'errors' => $validator->errors(),
            'status' => false
        ], 400));
    }
}
