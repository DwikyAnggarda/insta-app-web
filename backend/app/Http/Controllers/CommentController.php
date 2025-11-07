<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Comment;
use App\Http\Resources\CommentResource;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    /**
     * Store a new comment for a post
     */
    public function store(Request $req, Post $post)
    {
        // Validasi input
        $validator = Validator::make($req->all(), [
            'body' => 'required|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Simpan komentar
        $comment = $post->comments()->create([
            'user_id' => $req->user()->id,
            'body' => strip_tags($validator->validated()['body']), // sanitasi teks
        ]);

        // Muat relasi user agar resource lengkap
        $comment->load('user');

        // Kembalikan format JSON yang cocok untuk test otomatis
        return response()->json([
            'message' => 'Comment created successfully',
            'comment' => new CommentResource($comment),
        ], 201);
    }

    /**
     * Delete a comment
     */
    public function destroy(Request $req, Comment $comment)
    {
        $this->authorize('delete', $comment);

        $comment->delete();

        return response()->json([
            'message' => 'Comment deleted successfully',
        ]);
    }
}
