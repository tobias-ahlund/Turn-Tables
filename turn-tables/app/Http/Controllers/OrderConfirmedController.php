<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderConfirmedController extends Controller
{
    public function checkSessionId() 
    {
        $stripe = new \Stripe\StripeClient(env("VITE_STRIPE_SECRET_KEY"));

        try {
            $sessionId = $stripe->checkout->sessions->retrieve($_GET['session_id']);
        
        if ($sessionId) {
            return Inertia::render("OrderConfirmed");
        } else {
            abort(403);
        };

        } catch (Exception) {
            abort(403);
        }
    }
}