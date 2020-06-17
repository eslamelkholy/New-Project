<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Authentication & User Api's
Route::group(['prefix' => 'auth'], function () {
    Route::post('login', 'UserController@login');
    Route::post('register', 'UserController@register');
    Route::group([
        'middleware' => 'auth:api'
    ], function () {
        Route::get('logout', 'UserController@logout');
        Route::get('user', 'UserController@user');
    });
});

// Normal Api's >> Tokens & application/json Must Be Included to work
Route::group(['middleware' => 'auth:api'], function () {
    Route::get("getLatestArticles", 'ArticleController@getLatestArticles');
    Route::get("article", 'ArticleController@getUserFavorites');
    Route::post("article", 'ArticleController@addArticleToFavorite');
    Route::post("article/remove", 'ArticleController@removeFromFavorites');
});
