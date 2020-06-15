<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Http\Requests\UserValidateRequest;
use App\Http\Requests\LoginRequest;
use App\User;
use Auth;

class UserController extends Controller
{
    public function register(UserValidateRequest $request)
    {
        $input = $request->all();
        $input['password'] = bcrypt("123");
        $user = User::create($input);
        $user->save();
        $tokenResult = $user->createToken('Personal Access Token');
        return response()->json([
            'message' => 'Successfully created user!',
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString()
        ], 201);
    }

    public function login( LoginRequest $request){
        $credentials = request(['email', 'password']);
        if( !Auth::attempt( $credentials )){
            return response()->json(["message" => "Invalid Login Credentials"], 400);
        }
        $accessToken = Auth::user()->createToken('authToken')->accessToken;
        return response()->json(['user' => Auth::user(), 'access_token' => $accessToken], 200);
    }

    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

    public function user(Request $request)
    {
        return response()->json(['user' => $request->user()], 200);
    }
}
