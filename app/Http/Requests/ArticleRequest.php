<?php

namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
class ArticleRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }
    public function rules()
    {
        return [
            'title' => 'required|string',
            'description' => 'required|string',
            'content' => 'required|string',
            'picture' => 'required',
            'source_url' => 'required',
        ];
    }
    public function messages(){
        return [
            'title.required' => 'Article title is Required',
            'description.required' => 'Description is Required',
            'content.required' => 'Content is Required',
            'source_url.required' => 'Source url is Required',
            'title.string' => 'Title must be string',
            'description.string' => 'Description must be string',
            'content.string' => 'content must be string',
            'picture' => 'Picture is required',
            'source_url' => 'source url is required',
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
