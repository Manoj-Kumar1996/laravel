<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Storage;

class UploadController extends Controller
{
    //

    public function storeProduct(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'longDesc' => 'required|string',
            'shortDesc' => 'required|string',
            'stock' => 'required|integer',
            'category' => 'required|string',
            'image' => 'required|file|mimes:jpg,jpeg,png|max:2048', // Validation for single image
        ]);

        $imageUrl = null;
        try {
            // Store the uploaded image
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imageName = time() . '_' . $image->getClientOriginalName();
                $imagePath = $image->storeAs('public/images', $imageName); // Save the image
                $imageUrl = Storage::url($imagePath); // Get the URL for the stored image
            }
        } catch (\Exception $e) {
            // Log the error and return a response
            \Log::error('Image upload error: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to upload image: ' . $e->getMessage()], 500);
        }

        // Store the product details in the database
       

        // Return a success response
        return response()->json([
            'message' => 'Product added successfully',
            'product' => 'data',
        ]);
    }
}
