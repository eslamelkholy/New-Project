<?php

use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    public function run()
    {
        factory(App\User::class, 15)->create();
    }
}
