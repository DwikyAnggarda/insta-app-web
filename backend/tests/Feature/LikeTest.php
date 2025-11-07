<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Post;
use Illuminate\Foundation\Testing\RefreshDatabase;

class LikeTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_like_and_unlike_post()
    {
        $user = User::factory()->create();
        $post = Post::factory()->create();
        $token = $user->createToken('auth')->plainTextToken;

        // Like
        $this->withToken($token)->postJson("/api/posts/{$post->id}/like")
             ->assertStatus(200);

        // Unlike
        $this->withToken($token)->postJson("/api/posts/{$post->id}/like")
             ->assertStatus(200);
    }
}
