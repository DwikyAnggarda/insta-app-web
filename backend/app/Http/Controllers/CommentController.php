<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Comment;
use App\Http\Resources\CommentResource;

class CommentController extends Controller
{
    public function store(Request $req, Post $post) {
        $data = $req->validate([
            'body'=>'required|string|max:1000'
        ]);

        $comment = $post->comments()->create([
            'user_id' => $req->user()->id,
            'body' => $data['body']
        ]);

        return new CommentResource($comment->load('user'));
    }

    public function destroy(Request $req, Comment $comment) {
        $this->authorize('delete', $comment);
        $comment->delete();
        return response()->json(['message'=>'Comment deleted']);
    }
}
