<?php
use App\User;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

$factory->define(User::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'username' => $faker->userName,
        'password' => '$2y$10$G0N2VvlUiw7O5f.CG5/UF.TqHDh4xr8UqDry/y.ZWRZ3hPbD1Gno.', // password >> 123
        'picture' => $faker->imageUrl,
        'email' => $faker->unique()->safeEmail,
        'email_verified_at' => now(),
        'remember_token' => Str::random(10),
    ];
});
