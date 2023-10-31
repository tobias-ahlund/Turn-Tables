<?php

namespace App\Http\Middleware;

use App\Models\Wishlist;
use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class WishlistMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (auth()->check()) {
            $wishlistItems = Wishlist::where('user_id', auth()->user()->id)->pluck('product_id')->toArray();
            Inertia::share('wishlistItems', $wishlistItems);
        } else {
            Inertia::share('wishlistItems', []);
        }
        return $next($request);
    }
}
