<?php

// app/Http/Controllers/UploadProductsController.php
namespace App\Http\Controllers;

use App\Models\Products;
use Illuminate\Http\Request;

class UploadProductsController extends Controller
{
    public function products_upload(Request $request)
    {
        $productsDetails = Products::create([
            'name' => $request->name,
            'category' => $request->category,
            'price' => $request->price,
            'sellingPrice' => $request->sellingPrice,
            'description' => $request->description,
            'images' => json_encode($request->images), // Assuming this is an array
        ]);

        return response()->json(['success' => true, 'product' => $productsDetails], 201);
    }

    public function allproducts()
    {
        // Fetch all products from the database
        $products = Products::all();

        // Return the products as a JSON response
        return response()->json(['products' => $products]);
    }


    public function single_product(Request $request, $id)
    {
        // Fetch the product by ID
        $product = Products::find($id); // Assuming your Product model is named "Product"

        // Check if the product exists
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        // Return the product data as JSON
        return response()->json(['product' => $product], 200);
    }
    public function edit_product(Request $request, $id)
    {
        // Validate the request
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'price' => 'required|numeric',
            'sellingPrice' => 'required|numeric',
            'description' => 'required|string',
            'images' => 'nullable|array', // Images are optional but must be an array
            'images.*' => 'nullable|string', // Each image must be a string (URL for existing images)
        ]);

        
        $product = Products::findOrFail($id);

        // Update product details
        $product->name = $validatedData['name'];
        $product->category = $validatedData['category'];
        $product->price = $validatedData['price'];
        $product->sellingPrice = $validatedData['sellingPrice'];
        $product->description = $validatedData['description'];

        // Handling image updates
        if ($request->has('images')) {
            // Assuming 'images' is an array of URLs from Cloudinary
            $product->images = json_encode($validatedData['images']);
        }

        // Save the updated product
        $product->save();

        return response()->json([
            'message' => 'Product updated successfully!',
            'product' => $product
        ], 200);
    }



}
