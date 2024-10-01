<?php

namespace App\Http\Controllers;

use App\Models\Products;
use App\Models\User;
use Illuminate\Http\Request;
use Validator;
use Auth;

class UpdateProfileController extends Controller
{
    //
    public function upload(Request $request)
    {
        // Get the currently authenticated user
        $user = Auth::user();

        // Validate the input data
        $credentials = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id, // Ignore the current user's email
            'phone' => 'required|regex:/^\+?[0-9]{7,15}$/',
            'file' => 'nullable|file|mimes:jpg,jpeg,png|max:2048', // File is nullable (optional)
            'address' => 'required|string|max:255'
        ]);

        // Handle validation errors
        if ($credentials->fails()) {
            return response()->json($credentials->errors(), 422);
        }

        // Handle image upload (if a new file is uploaded)
        if ($request->hasFile('file')) {
            // Store the new image and replace the existing one
            $imagePath = $request->file('file')->store('uploads', 'public');

            // Get the full URL
            $fullUrl = asset('storage/' . $imagePath);
            
            // Optionally delete the old image from storage if required
            if ($user->image) {
                \Storage::disk('public')->delete($user->image);
            }

            // Update user with the new image path
            $user->image = $fullUrl;
        }

        // Update the user's other details
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->phone = $request->input('phone');
        $user->address = $request->input('address');

        // Save the updated user profile
        $user->save();

        // Return success response
        return response()->json([
            'message' => 'User profile updated successfully',
            'user' => $user
        ], 200);
    }

    public function delete_product(Request $request, $id)
{
    // Find the product by its ID
    $product = Products::findOrFail($id);
    
    // Attempt to delete the product
    if ($product->delete()) {
        return response()->json([
            'status' => 'success',
            'message' => 'Product deleted successfully'
        ]);
    } else {
        return response()->json([
            'status' => 'error',
            'message' => 'Failed to delete product'
        ]);
    }
}

}
