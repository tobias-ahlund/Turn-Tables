<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use App\Models\Wishlist;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;

class WishlistController extends Controller
{

    public function show(Request $request)
    {
        $user = $request->user();

        $productIds = Wishlist::where('user_id', $user->id)->pluck('product_id');

        return Inertia::render('Wishlist', [
            'productIds' => $productIds,
        ]);
    }

    public function getWishlist(Request $request)
    {
        if(Auth::user()) {

            $user = $request->user();

            $productIds = Wishlist::where('user_id', $user->id)->pluck('product_id');

            Inertia::share('wishlistItems', $productIds);

            return response()->json(['productIds' => $productIds]);
        } else {
            return response()->json(['productIds' => []]);
        }
    }

    public function addToWishlist(Request $request)
    {
        $user = $request->user();

        $productId = $request->input('product_id');

        Wishlist::create([
            'user_id' => $user->id,
            'product_id' => $productId
        ]);
    }

    public function removeFromWishlist(Request $request)
    {
        $user = $request->user();

        $productId = $request->input('product_id');

        Wishlist::where('user_id', $user->id)
            ->where('product_id', $productId)
            ->delete();
    }
}
