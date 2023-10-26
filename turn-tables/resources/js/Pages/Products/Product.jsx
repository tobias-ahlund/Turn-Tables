import React, { useState, useEffect } from 'react';
import { fetchProductBySlug } from "@/turn-table-studio/utils/sanity.queries"
import { urlFor } from '@/turn-table-studio/utils/sanity.client';
import { ProductWrapper } from '@/Components/ProductWrapper.style';
import StockStatus from '@/Components/StockStatus';
import DefaultLayout from '@/Layouts/DefaultLayout';
import { useShoppingCart } from 'use-shopping-cart';
import { BreadcrumbsWrapper } from '@/Components/Breadcrumbs.style';
import Increment from '@/public/images/Increment.svg';
import Decrement from '@/public/images/Decrement.svg';
import Wishlist from '@/public/images/Wishlist.svg';

export default function Product() {
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [confirmCart, setConfirmCart] = useState("");

    function cartAddedConfirmed() {
        setConfirmCart(<span>&#10003; {quantity > 1 ? "Items" : "Item"} added to cart</span>)

        setTimeout(() => {
            setConfirmCart("")
        }, 2000)
    }

    const slug = "/" + location.pathname.split('/').slice(-1)[0];

    useEffect(() => {
        fetchProductBySlug(slug)
            .then((data) => {
                setProduct(data);
            })
            .catch((error) => console.error('Error fetching product:', error));
        }, [slug]);

    function handleDecrement() {
        setQuantity(prevQuantity => prevQuantity - 1)
        quantity <= 0 && setQuantity(0);
    }

    function handleIncrement() {
        setQuantity(prevQuantity => prevQuantity + 1)
    }

    const { addItem } = useShoppingCart();

    const handleAddToCart = () => {
        if (product) {
            addItem({
                id: product.id,
                name: product.title,
                price: product.price,
                currency: product.currency,
                image: product.image,
            },
            {
                count: quantity
            });
            cartAddedConfirmed();
        };
    };

    return (
        <>
            <DefaultLayout>
                <BreadcrumbsWrapper>
                    <a href="/products"><span>Products</span></a>
                    <span> &gt; </span>
                    <a href={`/products${product && product.subcategory.category.slug.current}`}><span>{product && product.subcategory.category.title}</span></a>
                    <span> &gt; </span>
                    <span>{product && product.subcategory.title}</span>
                    <span> &gt; </span>
                    <span>{product && product.title}</span>
                </BreadcrumbsWrapper>
                <ProductWrapper>
                    {product && (
                        <>
                            <div>
                                <img src={urlFor(product.image)} alt="Image of the product." />
                                <div>
                                    <img src={Wishlist} alt="Wishlist icon" />
                                </div>
                            </div>
                            <div>
                                <p>{product.title}</p>
                                <p>{product.description}</p>
                                <p>{product.price}:-</p>
                                <StockStatus />
                                <div>
                                    <div>
                                        <button onClick={() => {handleDecrement()}}>
                                            <img src={Decrement} alt="Decrement icon" />
                                        </button>
                                        <span>{quantity}</span>
                                        <button onClick={() => {handleIncrement()}}>
                                            <img src={Increment} alt="Increment icon" />
                                        </button>
                                    </div>
                                    <div>
                                        <button onClick={handleAddToCart}>{confirmCart ? confirmCart : "Add to cart"}</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </ProductWrapper>
            </DefaultLayout>
        </>
    )
} 