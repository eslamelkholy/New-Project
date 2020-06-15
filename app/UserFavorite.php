<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserFavorite extends Model
{
    protected $fillable = [
        'user_id', 'article_id'
    ];
}
