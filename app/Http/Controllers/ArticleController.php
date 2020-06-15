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
        $request['user_id'] = Auth::id();
        $article = Article::create($request->all());
        Auth::user()->favorites()->syncWithoutDetaching($article->id);
        return response()->json(["message" => "Article Saved to Favorite Successfully"], 201);
    }

    public function destroy($id)
    {
        $article = Article::find($id);
        if(is_null($article))
            return response()->json(["message" => "Article Not Found"]);
        $article->delete();
        return response()->json(null, 204);
    }
}
