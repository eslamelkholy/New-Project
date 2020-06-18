<?php

namespace Tests\Unit;
use Tests\TestCase;
use App\User;
use App\Article;
use App\Http\Controllers\ArticleController;
class ArticleTest extends TestCase
{
    public $ArticleController;
    public function setUp(): void
    {   
        parent::setUp();
        $this->ArticleController = new ArticleController();
    }
    public function testFindArticle()
    {
        $article = $this->createArticle();
        $this->assertTrue($this->ArticleController->findArticle($article->id)->is($article));
    }

    public function testFailFindArticle()
    {
        $this->assertNull($this->ArticleController->findArticle(0));
    }

    public function testUserFavoritesRelationship()
    {
        $article = $this->createArticle();
        $user = $this->createUser();
        $user->favorites()->attach($article->id);
        $this->assertDatabaseHas('user_favorites', [
            'user_id' => $user->id,
            'article_id' => $article->id
        ]);
    }

    public function testAddUserFavorites()
    {
        $article = $this->createArticle();
        $user = $this->createUser();
        $this->actingAs($user);
        $this->ArticleController->addArticleToUserFavorites($article->id);
        $this->assertTrue(in_array($article->id, $user->favorites()->pluck('article_id')->toArray()));
    }

    public function testdetachArticleFromUserFavorites()
    {
        $article = $this->createArticle();
        $user = $this->createUser();
        $this->actingAs($user);
        $this->ArticleController->addArticleToUserFavorites($article->id);
        $this->ArticleController->detachArticleFromUserFavorites($article->id);
        $this->assertFalse(in_array($article->id, $user->favorites()->pluck('article_id')->toArray()));
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
