<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use GuzzleHttp\Client;
use App\Article;

class everyThirtyMinutes extends Command
{
    protected $signature = 'everyThirtyMinutes:update';

    protected $description = 'This Command Will Fetch Data Every Thirty Minutes from Externl Api and Save it to Database';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $this->saveNewsArticles();
    }
    // Save News Article From The External Api
    public function saveNewsArticles()
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
}
