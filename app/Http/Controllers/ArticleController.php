<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\ArticleRequest;
use Auth;
use App\Article;
class ArticleController extends Controller
{
    public function store(ArticleRequest $request)
    {
        $article = Article::where('title', $request->title)->first();
        if(!$article)
        {
            $newArticle = Article::create($request->all());
            $this->addArticleToUserFavorites($newArticle->id);
        }else
            $this->addArticleToUserFavorites($article->id);
        return response()->json(["message" => "Article Added To Favorites"], 201);
    }

    public function destroy($id)
    {
        $article = Article::find($id);
        if(is_null($article))
            return response()->json(["message" => "Article Not Found"]);
        $article->delete();
        return response()->json(null, 204);
    }

    public function addArticleToUserFavorites($articleId)
    {
        Auth::user()->favorites()->syncWithoutDetaching($articleId);
    }
}
