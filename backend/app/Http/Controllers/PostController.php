<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Http\Resources\PostResource;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    public function index(Request $req) {
        $posts = Post::with(['user','comments.user'])
            ->latest()
            ->paginate(10);
        return PostResource::collection($posts);
    }

    public function show(Post $post) {
        $post->load(['user','comments.user']);
        return new PostResource($post);
    }

    public function store(Request $req) {
        $data = $req->validate([
            'body'=>'nullable|string',
            'image'=>'nullable|image|max:5120',
            'visibility'=>'nullable|in:public,private'
        ]);

        $post = new Post();
        $post->user()->associate($req->user());
        $post->body = $data['body'] ?? null;
        $post->visibility = $data['visibility'] ?? 'public';

        if ($req->hasFile('image')) {
            $path = $req->file('image')->store('posts', 'public');
            $post->image_path = $path;
        }

        $post->save();
        $post->load(['user','comments.user']);
        return new PostResource($post);
    }

    public function update(Request $req, Post $post) {
        $this->authorize('update', $post);

        $data = $req->validate([
            'body'=>'nullable|string',
            'image'=>'nullable|image|max:5120',
            'visibility'=>'nullable|in:public,private'
        ]);

        if ($req->hasFile('image')) {
            if ($post->image_path) Storage::disk('public')->delete($post->image_path);
            $post->image_path = $req->file('image')->store('posts','public');
        }

        if (isset($data['body'])) $post->body = $data['body'];
        if (isset($data['visibility'])) $post->visibility = $data['visibility'];

        $post->save();
        return new PostResource($post->load(['user','comments.user']));
    }

    public function destroy(Post $post) {
        $this->authorize('delete', $post);
        if ($post->image_path) Storage::disk('public')->delete($post->image_path);
        $post->delete();
        return response()->json(['message'=>'Post deleted']);
    }
}
