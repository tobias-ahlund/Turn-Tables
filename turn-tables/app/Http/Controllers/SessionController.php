<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SessionController extends Controller
{
    public function session(Request $request) {
        $lineItems = $request->input("lineItems");
        $stripe = new \Stripe\StripeClient(env("VITE_STRIPE_SECRET_KEY"));

        $session = $stripe->checkout->sessions->create([
            'success_url' => 'http://localhost:8000/order-confirmed?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => 'http://localhost:8000/cart',
            'line_items' => [
                $lineItems,
            ],
            'mode' => 'payment',
        ]);
        
        return response(['sessionId' => $session->id]);
    }
}
