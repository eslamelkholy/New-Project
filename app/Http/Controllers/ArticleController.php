<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\ArticleRequest;
use Auth;
use App\Article;
class ArticleController extends Controller
{
    // Get Latest Released Articles
    public function getLatestArticles(Request $request)
    {
        return response()->json([ 'articles'=> Article::orderBy('id', 'desc')->take(20)->get()], 200);
    }

    // Get Article Details
    public function showArticle(Request $request, $id)
    {
        $article = $this->findArticle($id);
        if(!$article)
            return response()->json(["message" => "Article Not Found"], 404);
        return response()->json(['article' => $article], 200);
    }

    // Get User Favorites Articles
    public function getUserFavorites(Request $request)
    {
        return response()->json(["FavoritesData" => ['UserFavoritesId' => Auth::user()->favorites()->pluck('article_id')->toArray(), "Favorites" => Auth::user()->favorites]], 200);
    }

    // Add Article To User Favorites
    public function addArticleToFavorite(Request $request)
    {
        $article = $this->findArticle($request->articleId);
        if(!$article)
            return response(["message" => "Article Not Found"], 404);
        $this->addArticleToUserFavorites($article->id);
        return response()->json(["message" => "Article Added To Favorites"], 201);
    }

    // Detach Articles from User Favorites
    public function removeFromFavorites(Request $request)
    {
        $article = $this->findArticle($request->articleId);
        if(!$article)
            return response()->json(["message" => "Article Not Foud"], 404);
        $this->detachArticleFromUserFavorites($article->id);
        return response()->json(null, 204);
    }
    
    // Attach Articles to User Favorite
    public function addArticleToUserFavorites($articleId)
    {
        Auth::user()->favorites()->syncWithoutDetaching($articleId);
    }

    public function detachArticleFromUserFavorites($articleId)
    {
        Auth::user()->favorites()->detach($articleId);
    }

    // Find Article By ID
    public function findArticle($articleId)
    {
        return Article::find($articleId);
    }
}
