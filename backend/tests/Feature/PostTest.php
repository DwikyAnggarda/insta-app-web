<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Post;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class PostTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_create_post()
    {
        Storage::fake('public');
        $user = User::factory()->create();
        $token = $user->createToken('auth')->plainTextToken;

        $response = $this->withToken($token)->postJson('/api/posts', [
            'body' => 'This is a test post',
            'image' => UploadedFile::fake()->image('post.jpg')
        ]);

        $response->assertStatus(201);
        $path = $response->json('data.image_path');
        Storage::disk('public')->assertExists($path);
    }

    public function test_user_can_update_post()
    {
        Storage::fake('public');
        $user = User::factory()->create();
        $token = $user->createToken('auth')->plainTextToken;
        $post = Post::factory()->for($user)->create([
            'body' => 'Old body text'
        ]);

        $response = $this->withToken($token)->putJson("/api/posts/{$post->id}", [
            'body' => 'Updated body text',
            'image' => UploadedFile::fake()->image('updated.jpg')
        ]);

        $response->assertStatus(200)
                 ->assertJsonPath('data.body', 'Updated body text');

        $updatedPath = $response->json('data.image_path');
        Storage::disk('public')->assertExists($updatedPath);
    }

    public function test_user_can_delete_post()
    {
        Storage::fake('public');
        $user = User::factory()->create();
        $token = $user->createToken('auth')->plainTextToken;
        $post = Post::factory()->for($user)->create();

        $response = $this->withToken($token)->deleteJson("/api/posts/{$post->id}");
        $response->assertStatus(200)
                 ->assertJson(['message' => 'Post deleted successfully']);

        $this->assertDatabaseMissing('posts', ['id' => $post->id]);
    }
}
