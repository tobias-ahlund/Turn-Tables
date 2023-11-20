<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class OrderController extends Controller
{
    public function storeOrder(Request $request)
    {

        $userId = Auth::check() ? Auth::user()->id : null;

        $cartDetails = $request->input('cart_details');

        $totalPrice = $request->input('total_price');

        $orderId = uniqid();

        $orderItems = [];

        foreach ($cartDetails as $cartDetail => $productData) {

            $productIds = $productData['id'];
            $productQuantity = $productData['quantity'];

                $orderItems[] = [
                    'user_id' => $userId,
                    'order_id' => $orderId,
                    'price' => $totalPrice,
                    'product_id' => $productIds,
                    'quantity' => $productQuantity
                ];
            };

        Order::insert($orderItems);
        }
    }
