<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use Illuminate\Support\Facades\Log;

class OrderController extends Controller
{
    public function storeOrder(Request $request)
    {
        if (auth()->check()) {

            $user = $request->user();

            $cartDetails = $request->input('cart_details');

            $totalPrice = $request->input('total_price');

            $order_id = uniqid();

            $orderItems = [];

            foreach ($cartDetails as $cartDetail => $productData) {

                $productIds = $productData['id'];
                $productQuantity = $productData['quantity'];

                    $orderItems[] = [
                        'user_id' => $user->id,
                        'order_id' => $order_id,
                        'price' => $totalPrice,
                        'product_id' => $productIds,
                        'quantity' => $productQuantity
                    ];
                };

            Order::insert($orderItems);
        }
    }
}
