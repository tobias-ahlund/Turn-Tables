<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

/* Route::get('/welcome', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
}); */

Route::get('/order-confirmed', 'App\Http\Controllers\OrderConfirmedController@checkSessionId')->name('order-confirmed');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/cart', function () {
    return Inertia::render('Cart');
})->name('cart');

// Route::get('/wishlist', function () {
//     return Inertia::render('Wishlist');
// })->middleware(['auth'])->name('wishlist');

Route::post('/create-session', 'App\Http\Controllers\SessionController@session')->name('create-session');

Route::get('/wishlist', 'App\Http\Controllers\WishlistController@show')->middleware('auth')->name('wishlist');

Route::get('/products', function () {
    return Inertia::render('Products/Products');
})->name('products');

Route::get('/products/{categorySlug}/{subCategorySlug}/{productSlug}', function ($categorySlug, $subCategorySlug, $productSlug) {
    return Inertia::render('Products/Product', [
        'categorySlug' => $categorySlug,
        'subCategorySlug' => $subCategorySlug,
        'productSlug' => $productSlug,
    ]);
});

Route::get('/search/{searchQuerySlug}', function ($searchQuerySlug) {
    return Inertia::render('Search', [
        'searchQuerySlug' => $searchQuerySlug,
    ]);
})->name('search');

Route::get('/products/{categorySlug}', function ($categorySlug) {
    if ($categorySlug != "home-decor" && $categorySlug != "furniture" && $categorySlug != "lighting") {
        abort(404);
    }

    return Inertia::render('Products/ProductsByCategory', [
        'categorySlug' => $categorySlug,
    ]);
})->name('products.category');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/api/wishlist', 'App\Http\Controllers\WishlistController@getWishlist');

Route::post('/wishlist/add', 'App\Http\Controllers\WishlistController@addToWishlist')->name('wishlist.add');

Route::post('/wishlist/remove', 'App\Http\Controllers\WishlistController@removeFromWishlist')->name('wishlist.remove');

Route::post('/store-order', 'App\Http\Controllers\OrderController@storeOrder')->name('store.order');

Route::post("/webhook", "App\Http\Controllers\WebhookController@getWebhook")->name("webhook");

require __DIR__ . '/auth.php';
