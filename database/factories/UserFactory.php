<?php
use App\User;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

$factory->define(User::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'password' => '$2y$10$G0N2VvlUiw7O5f.CG5/UF.TqHDh4xr8UqDry/y.ZWRZ3hPbD1Gno.', // password >> 123
        'email' => $faker->unique()->safeEmail,
        'date_of_birth' => $faker->dateTime(),
        'email_verified_at' => now(),
        'remember_token' => Str::random(10),
    ];
});
