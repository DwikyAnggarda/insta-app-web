<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;

class LikeController extends Controller
{
    public function toggle(Request $req, Post $post)
    {
        $user = $req->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $like = $post->likes()->firstOrCreate(['user_id' => $user->id]);
        $liked = $like->wasRecentlyCreated;

        if (!$liked) {
            $like->delete();
        }

        return response()->json([
            'liked' => $liked,
            'likes_count' => $post->likes()->count(),
        ]);
    }
}
