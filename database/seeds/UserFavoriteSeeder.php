<?php

use Illuminate\Database\Seeder;

class UserFavoriteSeeder extends Seeder
{
    public function run()
    {
        factory(App\UserFavorite::class, 40)->create();
    }
}
