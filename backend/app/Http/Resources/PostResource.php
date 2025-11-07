<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UserResource;
use App\Http\Resources\CommentResource;

class PostResource extends JsonResource
{
    public function toArray($request) {
        // Use eager loaded data when available, fallback to query
        $likesCount = $this->likes_count ?? $this->likes()->count();
        
        // Check if user liked this post using eager loaded data
        $likedByMe = false;
        if ($request->user() && $this->relationLoaded('likes')) {
            $likedByMe = $this->likes->contains('user_id', $request->user()->id);
        } else {
            $likedByMe = $this->isLikedBy($request->user());
        }

        return [
            'id'=>$this->id,
            'body'=>$this->body,
            'image_url' => $this->image_path ? asset('storage/'.$this->image_path) : null,
            'user'=> new UserResource($this->whenLoaded('user')),
            'likes_count' => $likesCount,
            'liked_by_me' => $likedByMe,
            'comments' => CommentResource::collection($this->whenLoaded('comments')),
            'created_at'=>$this->created_at,
        ];
    }
}
