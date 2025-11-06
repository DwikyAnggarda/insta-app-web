<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UserResource;
use App\Http\Resources\CommentResource;

class PostResource extends JsonResource
{
    public function toArray($request) {
        return [
            'id'=>$this->id,
            'body'=>$this->body,
            'image_url' => $this->image_path ? asset('storage/'.$this->image_path) : null,
            'user'=> new UserResource($this->whenLoaded('user')),
            'likes_count' => $this->likes()->count(),
            'liked_by_me' => $this->isLikedBy($request->user()),
            'comments' => CommentResource::collection($this->whenLoaded('comments')),
            'created_at'=>$this->created_at,
        ];
    }
}
