<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use App\Models\Wishlist;
use Inertia\Inertia;

class WishlistController extends Controller
{
    public function addToWishlist(Request $request)
    {
        $user = $request->user();

        $productId = $request->input('product_id');

        Wishlist::create([
            'user_id' => $user->id,
            'product_id' => $productId
        ]);

        Log::info('Product added to wishlist. User ID: ' . $user->id . ', Product ID: ' . $productId);

        return Inertia::render('Wishlist', [
            'productId' => $productId,
        ]);
    }
}
