<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasApiTokens,Notifiable;

    protected $fillable = [
        'name', 'email', 'password', 'picture'
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function articles()
    {
        return $this->hasMany('App\Article', 'user_id');
    }
    
    public function favorites()
    {
        return $this->belongsToMany('App\Article', 'user_favorites')->withTimestamps();
    }
}
