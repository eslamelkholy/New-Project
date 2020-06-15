<?php

use App\Article;
use Faker\Generator as Faker;
use App\User;
$factory->define(Article::class, function (Faker $faker)  use ($factory) {
    $userIds = User::all()->pluck('id')->toArray();
    return [
        'title' => $faker->title,
        'description' => $faker->paragraph,
        'picture' => $faker->imageUrl,
        'content' => $faker->paragraph,
        'source_url' => $faker->url,
        'user_id' => $faker->randomElement($userIds)
    ];
});
