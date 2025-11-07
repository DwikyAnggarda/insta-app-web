<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'post_id', 'body'];

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function post()
    {
        return $this->belongsTo(Post::class);
    }

    /*
    |--------------------------------------------------------------------------
    | Accessors & Helpers
    |--------------------------------------------------------------------------
    */

    /**
     * Tentukan apakah komentar ini dimiliki oleh user tertentu
     */
    public function isOwnedBy(?User $user): bool
    {
        if (!$user) return false;
        return $this->user_id === $user->id;
    }

    /*
    |--------------------------------------------------------------------------
    | Booted (opsional)
    |--------------------------------------------------------------------------
    | Jika kamu nanti ingin menambahkan aksi lain saat komentar dihapus.
    | Misalnya log aktivitas, notifikasi, dll.
    */
    protected static function booted()
    {
        //
    }
}
