<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SessionController extends Controller
{
    public function session() {
        $stripe = new \Stripe\StripeClient(env("STRIPE_SECRET_KEY"));

        $session = $stripe->checkout->sessions->create([
            'success_url' => 'https://localhost:8000',
            'cancel_url' => 'https://localhost:8000',
            'line_items' => [
                [
                    'price_data' => [
                        "currency" => "sek",
                        "unit_amount" => 500,
                        "product_data" => [
                            "name" => "Whatever man",
                        ],
                    ],
                    'quantity' => 2,
                ],
            ],
            'mode' => 'payment',
        ]);
    
        return response()->json(['sessionId' => $session->id]);
    }
}
