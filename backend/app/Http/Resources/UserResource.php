<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray($request) {
        return [
            'id'=>$this->id,
            'name'=>$this->name,
            'username'=>$this->username,
            'email'=>$this->when($request->user() && $request->user()->id === $this->id, $this->email),
            'avatar_url'=>$this->avatar ? asset('storage/'.$this->avatar) : null,
        ];
    }
}
