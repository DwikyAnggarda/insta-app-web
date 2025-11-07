<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class PostTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_create_post()
    {
        // Fake storage agar tidak benar-benar menyimpan file
        Storage::fake('public');

        // Buat user dan token auth
        $user = User::factory()->create();
        $token = $user->createToken('auth')->plainTextToken;

        // Kirim request untuk membuat post baru
        $response = $this->withToken($token)->postJson('/api/posts', [
            'body' => 'This is a test post',
            'image' => UploadedFile::fake()->image('post.jpg'), // ✅ ubah jadi 'image'
        ]);

        // Cek response
        $response->assertStatus(201)
                 ->assertJsonStructure(['message', 'post', 'image_path']);

        // Ambil path image dari response
        $path = $response->json('image_path');

        // Pastikan file benar-benar ada di storage fake
        Storage::disk('public')->assertExists($path); // ✅ jangan ditambah 'posts/'
    }
}
