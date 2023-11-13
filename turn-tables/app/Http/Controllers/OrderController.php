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

            $cartDetails = json_decode("{$cartDetails}", true);

            $totalPrice = $request->input('total_price');

            $order_id = uniqid();

            $orderItems = [];

            foreach ($cartDetails as $cartDetail => $productData) {

                
                $productIds = $productData['id'];
                $resultData[] = $productIds;
                
                Log::info('LOOOOOOOG:', $resultData);

                    $orderItems[] = [
                        'user_id' => $user->id,
                        'order_id' => $order_id,
                        'price' => $totalPrice,
                        'product_id' => $resultData
                    ];
                };

            Order::insert($orderItems);
        }
    }
}
