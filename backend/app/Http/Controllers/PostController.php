<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Http\Resources\PostResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    /**
     * Display list of posts (public feed)
     */
    public function index(Request $req)
    {
        $posts = Post::with(['user', 'comments.user'])
            ->latest()
            ->paginate(10);

        return PostResource::collection($posts);
    }

    /**
     * Display a single post detail
     */
    public function show(Post $post)
    {
        $post->load(['user', 'comments.user']);
        return new PostResource($post);
    }

    /**
     * Store a new post (text + image)
     */
    public function store(Request $req)
    {
        // Validasi input
        $validator = Validator::make($req->all(), [
            'body' => 'nullable|string|max:2000',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
            'visibility' => 'nullable|in:public,private',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Inisialisasi post baru
        $post = new Post();
        $post->user()->associate($req->user());
        $post->body = strip_tags($validator->validated()['body'] ?? '');
        $post->visibility = $validator->validated()['visibility'] ?? 'public';

        // Upload gambar jika ada
        if ($req->hasFile('image')) {
            $path = $req->file('image')->store('posts', 'public');
            $post->image_path = $path;
        }

        $post->save();
        $post->load(['user', 'comments.user']);

        // JSON Response terstruktur (supaya test lulus)
        return response()->json([
            'message' => 'Post created successfully',
            'post' => new PostResource($post),
            'image_path' => $post->image_path, // untuk test assertExists
        ], 201);
    }

    /**
     * Update an existing post
     */
    public function update(Request $req, Post $post)
    {
        $this->authorize('update', $post);

        $data = $req->validate([
            'body' => 'nullable|string|max:2000',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
            'visibility' => 'nullable|in:public,private',
        ]);

        // Update gambar jika dikirim
        if ($req->hasFile('image')) {
            if ($post->image_path) {
                Storage::disk('public')->delete($post->image_path);
            }

            $path = $req->file('image')->store('posts', 'public');
            $post->image_path = $path;
        }

        if (isset($data['body'])) {
            $post->body = strip_tags($data['body']);
        }

        if (isset($data['visibility'])) {
            $post->visibility = $data['visibility'];
        }

        $post->save();
        $post->load(['user', 'comments.user']);

        // return new PostResource($post);
        return response()->json([
            'message' => 'Post updated successfully',
            'post' => new PostResource($post),
        ]);
    }

    /**
     * Delete a post
     */
    public function destroy(Post $post)
    {
        $this->authorize('delete', $post);

        if ($post->image_path) {
            Storage::disk('public')->delete($post->image_path);
        }

        $post->delete();

        return response()->json([
            'message' => 'Post deleted successfully',
        ]);
    }
}
