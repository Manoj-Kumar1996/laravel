<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    public function upload(Request $request)
    {
        // Check if an image is provided
        if($request->hasFile('image')) {
            $image = $request->file('image');

            // Generate a unique name for the image
            $name = time().'.'.$image->getClientOriginalExtension();
            
            // Move the image to the 'images' folder
            $image->move(public_path('images'), $name);
            
            // Create a new Image record
            Image::create(['image' => $name]);

            return response()->json(['success' => 'Uploaded Successfully!']);
        }

        // If image not provided or upload fails
        return response()->json(['error' => 'Please try again'], 400);
    }
}
