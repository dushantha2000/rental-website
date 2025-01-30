<?php

use App\Http\Controllers\admin\AuthController;
use App\Http\Controllers\admin\CategoryController;
use App\Http\Controllers\admin\subCategoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\common\PropertyController;
use App\Http\Controllers\common\TempImageController;
use App\Http\Controllers\TourBookingController;

Route::post('/admin/login', [AuthController::class, 'authenticate']);
Route::post('/register', [AuthController::class, 'register']);

  Route::get('/properties', [PropertyController::class, 'index']);
  Route::get('/properties/{id}', [PropertyController::class, 'show']);
  Route::put('/properties/{id}', [PropertyController::class, 'update']);
  Route::delete('/properties/{id}', [PropertyController::class, 'destroy']);
  Route::post('/properties', [PropertyController::class, 'store']);

  //Search
  Route::POST('/properties/search', [PropertyController::class, 'search']);

  
  Route::POST('/temp-image', [PropertyController::class, 'store']);



  Route::get('/booking', [ TourBookingController::class, 'index']);
  Route::get('/booking/{id}', [ TourBookingController::class, 'show']);
  Route::put('/booking/{id}', [ TourBookingController::class, 'update']);
  Route::delete('/booking/{id}', [ TourBookingController::class, 'destroy']);
  Route::post('/booking', [ TourBookingController::class, 'store']);

//Route::get('/user', function (Request $request) {
//  return $request->user();
//})->middleware('auth:sanctum');

Route::group(['middleware' => 'auth:sanctum'], function () {
  Route::get('categories', [CategoryController::class, 'index']);
  Route::get('categories/{id}', [CategoryController::class, 'show']);
  Route::put('categories/{id}', [CategoryController::class, 'update']);
  Route::delete('categories/{id}', [CategoryController::class, 'destroy']);
  Route::post('categories', [CategoryController::class, 'store']);

  Route::get('subCategories', [subCategoryController::class, 'index']);
  Route::get('subCategories/{id}', [subCategoryController::class, 'show']);
  Route::put('subCategories/{id}', [subCategoryController::class, 'update']);
  Route::delete('subCategories/{id}', [subCategoryController::class, 'destroy']);
  Route::post('subCategories', [subCategoryController::class, 'store']);

 
  
});
