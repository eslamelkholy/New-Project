<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserFavoritesTable extends Migration
{
    public function up()
    {
        Schema::create('user_favorites', function (Blueprint $table) {
            $table->bigIncrements("id");
            $table->unsignedBigInteger("user_id");
            $table->unsignedBigInteger("article_id");
            $table->foreign("user_id")->references("id")->on("users")->onDelete('cascade');
            $table->foreign("article_id")->references("id")->on("articles")->onDelete('cascade');
            $table->timestamps();
        });
    }
    public function down()
    {
        Schema::dropIfExists('user_favorites');
    }
}
