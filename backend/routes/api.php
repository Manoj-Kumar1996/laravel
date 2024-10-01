<?php

use App\Http\Controllers\UpdateProfileController;
use App\Http\Controllers\UploadProductsController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|----------------------------------------------------------------------
| API Routes
|----------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes
Route::post('login', [UserController::class, 'login']);
Route::post('register', [UserController::class, 'register']);
Route::get('/user', [UserController::class, 'user']);
Route::get('/getAllUser', [UserController::class, 'getAllUser']);
Route::get('/allproducts', [UploadProductsController::class, 'allproducts']);
Route::get('/singleProduct/{id}', [UploadProductsController::class, 'single_product']);
Route::put('/editProduct/{id}', [UploadProductsController::class, 'edit_product']);
Route::delete('/deleteProduct/{id}', [UpdateProfileController::class, 'delete_product']);
// Protected routes
Route::middleware('auth:api')->group(function () {
    Route::post('products', [UploadProductsController::class, 'products_upload']);
    Route::post('upload', [UpdateProfileController::class, 'upload']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('me', [AuthController::class, 'me']);
});
