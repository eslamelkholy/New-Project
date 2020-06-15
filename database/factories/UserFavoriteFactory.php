<?php

use Faker\Generator as Faker;
use App\Article;
use App\User;
$factory->define(App\UserFavorite::class, function (Faker $faker)  use ($factory) {
    $userIds = User::all()->pluck('id')->toArray();
    $articleIds = Article::all()->pluck('id')->toArray();
    return [
        'user_id' => $faker->randomElement($userIds),
        'article_id' => $faker->randomElement($articleIds),
    ];
});
