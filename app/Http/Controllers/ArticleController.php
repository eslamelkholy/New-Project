<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\ArticleRequest;
use Auth;
use App\Article;
use GuzzleHttp\Client;
class ArticleController extends Controller
{
    public function index(Request $request)
    {
        return response()->json(["userFavorites" => Auth::user()->favorites()->pluck('title')->toArray()]);
    }

    public function addArticleToFavorite(ArticleRequest $request)
    {
        $article = $article = $this->findArticle($request->title);
        if(!$article)
        {
            $newArticle = Article::create($request->all());
            $this->addArticleToUserFavorites($newArticle->id);
        }else
            $this->addArticleToUserFavorites($article->id);
        return response()->json(["message" => "Article Added To Favorites"], 201);
    }

    public function removeFromFavorites(Request $request)
    {
        $article = $this->findArticle($request->title);
        if(!$article)
            return response()->json(["message" => "Article Not Foud"], 404);
        Auth::user()->favorites()->detach($article->id);
        return response()->json(null, 204);
    }
    
    // Save News Article From The External Api
    public function saveNewsArticles(Request $request)
    {
        $articles = $this->getArticles();
        foreach($articles as $article)
            if(!Article::where('title',$article->title)->exists())
               Article::create((array)$article); 
    }
    // Fetch News From External Api
    public function getArticles()
    {
        $client = new Client();
        $response = $client->request('GET', 'http://newsapi.org/v2/top-headlines', [
            'query' => ['country' => 'eg', 'apiKey' => env('APP_NEWS_API_KEY')]
        ]);
        $json = json_decode($response->getBody());
        return $json->articles;
    }

    // Attach Articles to User Favorite
    public function addArticleToUserFavorites($articleId)
    {
        Auth::user()->favorites()->syncWithoutDetaching($articleId);
    }

    // Find Article By Title
    public function findArticle($ArticleTitle)
    {
        return Article::where('title',$ArticleTitle)->first();
    }
}
