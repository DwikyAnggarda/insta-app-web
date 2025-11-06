<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\CommentController;

Route::post('/register', [AuthController::class,'register']);
Route::post('/login', [AuthController::class,'login']);

Route::get('/posts', [PostController::class,'index']);
Route::get('/posts/{post}', [PostController::class,'show']);

Route::middleware('auth:sanctum')->group(function(){
    Route::post('/logout', [AuthController::class,'logout']);
    Route::get('/user', [AuthController::class,'me']);

    Route::post('/posts', [PostController::class,'store']);
    Route::put('/posts/{post}', [PostController::class,'update']);
    Route::delete('/posts/{post}', [PostController::class,'destroy']);

    Route::post('/posts/{post}/like', [LikeController::class,'toggle']);

    Route::post('/posts/{post}/comments', [CommentController::class,'store']);
    Route::delete('/comments/{comment}', [CommentController::class,'destroy']);
});
