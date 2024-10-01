<?php

namespace App\Http\Controllers;

use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    public function register(Request $request)
    {
        // Validation rules
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed', // "confirmed" expects a 'password_confirmation' field
        ]);

        // If validation fails, return errors
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        // Create the user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password), // Hash the password
        ]);

        

        // Return success response with user data and token
        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user,
        ], 201);
    }

    public function login(Request $request)
{
    $credentials = $request->only('email', 'password');

    if (!$token = Auth::attempt($credentials)) {
        return response()->json(['error' => 'Unauthorized'], 401);
    }

    // Auth::user() should return the authenticated User instance
    $user = Auth::user();

    // Return token and user data
    return response()->json([
        'token' => $token,
        'user' => $user
    ], 200);
}


public function user(Request $request)
    {
        // Assuming the user is authenticated
        $user = Auth::user();

        if ($user) {
            return response()->json([
                'status' => 'success',
                'user' => $user
            ], 200);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'User not authenticated'
            ], 401);
        }
    }

    public function getAllUser(){
        $user = User::all();

        if($user){
            return response()->json([
                'user' => $user
            ]);
        }
    }

}
