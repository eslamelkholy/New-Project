<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $fillable = [
        'title', 'description', 'picture', 'content', 'source_url', 'user_id'
    ];
    // Inverse Relationship
    public function user()
    {
        return $this->belongsTo('App\User', 'user_id');
    }
}
