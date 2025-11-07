<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Post;
use App\Models\Comment;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PostRelationTest extends TestCase
{
    use RefreshDatabase;

    public function test_deleting_post_also_deletes_comments()
    {
        $user = User::factory()->create();
        $post = Post::factory()->for($user)->create();

        Comment::factory()->count(3)->for($post)->for($user)->create();

        $this->assertDatabaseCount('comments', 3);

        $post->delete();

        $this->assertDatabaseMissing('posts', ['id' => $post->id]);
        $this->assertDatabaseCount('comments', 0);
    }
}
