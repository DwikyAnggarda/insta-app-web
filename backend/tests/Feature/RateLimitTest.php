<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Post;
use Illuminate\Foundation\Testing\RefreshDatabase;

class RateLimitTest extends TestCase
{
    use RefreshDatabase;

    public function test_comment_rate_limit()
    {
        $user = User::factory()->create();
        $post = Post::factory()->create();
        $token = $user->createToken('auth')->plainTextToken;

        for ($i = 0; $i < 11; $i++) {
            $response = $this->withToken($token)->postJson("/api/posts/{$post->id}/comments", [
                'body' => 'spam test',
            ]);
        }

        $response->assertStatus(429); // Too many requests
    }
}
