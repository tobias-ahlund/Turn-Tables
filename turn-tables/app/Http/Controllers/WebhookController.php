<?php

// webhook.php
//
// Use this sample code to handle webhook events in your integration.
//
// 1) Paste this code into a new file (webhook.php)
//
// 2) Install dependencies
//   composer require stripe/stripe-php
//
// 3) Run the server on http://localhost:4242
//   php -S localhost:4242

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WebhookController extends Controller
{
    public function getWebhook()
    {
        /* require 'vendor/autoload.php'; */

        // The library needs to be configured with your account's secret key.
        // Ensure the key is kept out of any version control system you might be using.
        $stripe = new \Stripe\StripeClient(env("VITE_STRIPE_SECRET_KEY"));

        // This is your Stripe CLI webhook secret for testing your endpoint locally.
        $endpoint_secret = 'whsec_8c0f24b16ac3c9e4354cc772c35db7fcd5ddbe7df9fb1b90a2f39b2552135f43';

        $payload = @file_get_contents('php://input');
        $sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'];
        $event = null;

        try {
            $event = \Stripe\Webhook::constructEvent(
                $payload, $sig_header, $endpoint_secret
            );
        } catch(\UnexpectedValueException $e) {
            // Invalid payload
            http_response_code(400);
            exit();
        } catch(\Stripe\Exception\SignatureVerificationException $e) {
            // Invalid signature
            http_response_code(400);
            exit();
        }

        // Handle the event
        switch ($event->type) {
        case 'payment_intent.succeeded':
            $paymentIntent = $event->data->object;
            echo 'Event type succeded' . $paymentIntent;
        // ... handle other event types
        default:
            echo 'Received unknown event type ' . $event->type;
        }

        http_response_code(200);
        }
}