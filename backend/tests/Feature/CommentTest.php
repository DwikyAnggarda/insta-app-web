<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Post;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CommentTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_comment_on_post()
    {
        $user = User::factory()->create();
        $post = Post::factory()->create();
        $token = $user->createToken('auth')->plainTextToken;

        $response = $this->withToken($token)->postJson("/api/posts/{$post->id}/comments", [
            'body' => 'Nice post mate!',
        ]);

        $response->assertStatus(201)
                 ->assertJsonStructure(['comment']);
    }
}
