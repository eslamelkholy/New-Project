<?php

namespace App;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $fillable = [
        'title', 'description', 'urlToImage', 'content', 'url',
    ];

    public function users()
    {
        return $this->belongsToMany('App\User', 'user_favorites')->withTimestamps();;
    }
}
