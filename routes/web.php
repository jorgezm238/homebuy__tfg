<?php

use Illuminate\Support\Facades\Route;

Route::get('/{any}', function () {
    return view('app');
})

->where('any', '^(?!api\/|sanctum\/|@vite\/|__vite_ping$|favicon\.ico|robots\.txt).*');


Route::get('/{any}', fn()=> view('app'))
     ->where('any','^(?!api).*$');

