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
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/cart', function () {
    return Inertia::render('Cart');
});

Route::get('/wishlist', function () {
    return Inertia::render('Wishlist');
});

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

Route::get('/products/{categorySlug}', function ($categorySlug) {
    return Inertia::render('Products/ProductsByCategory', [
        'categorySlug' => $categorySlug,
    ]);
})->name('products.category');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
