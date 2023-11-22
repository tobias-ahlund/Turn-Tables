<?php

namespace App\Http\Controllers;

use Error;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderConfirmedController extends Controller
{
    public function checkSessionId() 
    {
        $stripe = new \Stripe\StripeClient(env("VITE_STRIPE_SECRET_KEY"));
        try {
            $session = $stripe->checkout->sessions->retrieve($_GET['session_id']);
            
            return Inertia::render("OrderConfirmed");
        } catch (Error $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
}