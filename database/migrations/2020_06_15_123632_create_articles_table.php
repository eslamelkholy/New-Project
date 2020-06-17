<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateArticlesTable extends Migration
{
    public function up()
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->bigIncrements("id");
            $table->string("title");
            $table->text("description")->nullable();
            $table->text("urlToImage")->nullable();
            $table->text("content")->nullable();
            $table->text("url");
            $table->timestamps();
        });
    }
    public function down()
    {
        Schema::dropIfExists('articles');
    }
}
