import React, { useState, useEffect } from 'react';
import { fetchProductBySlug } from "@/turn-table-studio/utils/sanity.queries"
import { ProductWrapper } from '@/Components/ProductWrapper.style';
import StockStatus from '@/Components/StockStatus';
import DefaultLayout from '@/Layouts/DefaultLayout';
import { useShoppingCart } from 'use-shopping-cart';
import { BreadcrumbsWrapper } from '@/Components/Breadcrumbs.style';
import Increment from '@/public/images/Increment.svg';
import Decrement from '@/public/images/Decrement.svg';
import styled from 'styled-components';
import SingleProductCard from '@/Components/SingleProductCard';

const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
`;

const Test = styled.span`
    width: 2ch;
    text-align: center;
`;

const Added = styled.button`
    min-width: 3.86rem;
`;

export default function Product({ wishlistItems }) {
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [confirmCart, setConfirmCart] = useState("");
    const [wishlistUpdated, setWishlistUpdated] = useState(wishlistItems);

    function cartAddedConfirmed() {
        setConfirmCart(<span>&#10003; Added</span>)

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
        quantity == 1 && setQuantity(1);
    }

    function handleIncrement() {
        setQuantity(prevQuantity => prevQuantity + 1)
    }

    const { addItem } = useShoppingCart();

    const handleAddToCart = () => {
        if (product) {
            addItem({
                id: product._id,
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

    function updateWishlist(updatedWishlist) {
        setWishlistUpdated(updatedWishlist);
    }

    return (
        <>
            <DefaultLayout>
                <BreadcrumbsWrapper $singleProduct>
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
                        <SingleProductCard 
                            product={product}
                            showAddToWishlist={true}
                            wishlistUpdated={wishlistUpdated}
                            updateWishlist={updateWishlist}
                        />
                        <InfoWrapper>
                            <p>{product.title}</p>
                            <p>{product.description}</p>
                            <p>{product.price}:-</p>
                            <StockStatus />
                            <div>
                                <div>
                                    <button onClick={() => {handleDecrement()}}>
                                        <img src={Decrement} alt="Decrement icon" />
                                    </button>
                                    <Test>{quantity}</Test>
                                    <button onClick={() => {handleIncrement()}}>
                                        <img src={Increment} alt="Increment icon" />
                                    </button>
                                </div>
                                <div>
                                    <Added onClick={handleAddToCart}>{confirmCart ? confirmCart : "Add to cart"}</Added>
                                </div>
                            </div>
                        </InfoWrapper>
                        </>
                    )}
                </ProductWrapper>
            </DefaultLayout>
        </>
    )
} 