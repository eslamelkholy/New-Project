<?php

namespace Tests\Unit;
use Tests\TestCase;
use App\User;
use App\Article;

class ArticleApiTest extends TestCase
{
    public function testSuccessFetchingArticles()
    {
        $user = $this->createUser();
        $response = $this->actingAs($user)->get('/api/getLatestArticles');
        $response->assertStatus(200)->assertJsonStructure(['articles']);
    }

    public function testFetchingUserFavorites()
    {
        $user = $this->createUser();
        $response = $this->actingAs($user)->get('/api/article');
        $response->assertStatus(200)->assertJsonStructure(['FavoritesData' => ['UserFavoritesId', 'Favorites']]);
    }

    public function testFailGetArticle()
    {
        $this->get('/api/article/0')->assertStatus(404);
    }
    public function testSuccessGetArticle()
    {
        $article = $this->createArticle();
        $this->get('/api/article/'.$article->id)->assertStatus(200);
    }

    public function testAddUserFavorite()
    {
        $user = $this->createUser();
        $article = $this->createArticle();
        $response = $this->actingAs($user)->post('/api/article', ['articleId' => $article->id]);
        $response->assertStatus(201);
    }

    public function testFailAddUserFavorite()
    {
        $response = $this->post('/api/article', ['articleId' => 0])->assertStatus(404);
    }

    public function testRemoveUserFavorite()
    {
        $user = $this->createUser();
        $article = $this->createArticle();
        $response = $this->actingAs($user)->post('/api/article/remove', ['articleId' => $article->id]);   
        $response->assertStatus(204);
    }

    public function testFailRemoveUserFavorite()
    {
        $response = $this->post('/api/article/remove', ['articleId' => 0])->assertStatus(404);
    }
    public function createUser()
    {
        return factory(User::class)->create();
    }
    
    public function createArticle()
    {
        return factory(Article::class)->create();
    }
}
