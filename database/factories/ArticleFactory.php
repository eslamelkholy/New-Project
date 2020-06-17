<?php

use App\Article;
use Faker\Generator as Faker;
$factory->define(Article::class, function (Faker $faker)  use ($factory) {
    return [
        'title' => $faker->title,
        'description' => $faker->title,
        'urlToImage' => $faker->imageUrl,
        'content' => $faker->paragraph,
        'url' => $faker->url,
    ];
});
