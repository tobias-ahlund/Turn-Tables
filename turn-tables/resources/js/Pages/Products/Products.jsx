import React, { useState, useEffect } from 'react';
import { fetchAllProducts, fetchAllCategories } from "@/turn-table-studio/utils/sanity.queries";
import { urlFor } from '@/turn-table-studio/utils/sanity.client';
import { ProductsWrapper } from '../../Components/ProductsWrapper.style';
import DefaultLayout from '@/Layouts/DefaultLayout';
import ShoppingCart from '@/public/images/ShoppingCart.svg';
import Wishlist from '@/public/images/Wishlist.svg';
import WishlistAdded from '@/public/images/WishlistAdded.svg';
import { AddToCart } from '@/Components/AddToCart';
import { AddToWishlist } from '@/Components/AddToWishlist';
import Check from '@/public/images/Check.svg';
import { CategoriesWrapper } from '@/Components/CategoriesWrapper.style';

export default function Products({ wishlistItems }) {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [prodsByCat, setProdsByCat] = useState("");
    const [confirmCart, setConfirmCart] = useState("");

    useEffect(() => {
        fetchAllProducts()
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => console.error('Error fetching products:', error));

        fetchAllCategories()
            .then((data) => {
                setCategories(data);
                console.log(data);
            })
            .catch((error) => console.error('Error fetching categories:', error));
    }, []);

    function cartAddedConfirmed(productId) {
        setConfirmCart(productId);

        setTimeout(() => {
            setConfirmCart(null)
        }, 2000)
    }

    function fetchProdByCat(category) {
        fetchAllProducts()
            .then((data) => {
                if (category === "All products") {
                    setProducts(data);
                    setProdsByCat("");
                    return;
                }
                const filteredData = data.filter((product) =>
                    product.subcategory.category.title === category
                )
                setProdsByCat(filteredData);
            })
            .catch((error) => console.error('Error fetching products:', error));
    }

    return (
        <>
            <DefaultLayout>
                {/* {categories.map((category) =>
                    <div key={category._id}>
                        <a href={`/products${category.slug.current}`}>
                        <button onClick={() => fetchProdByCat(category.title)}>{category.title}</button>
                        </a>
                        <br />
                    </div>
                )} */}
                    
                {/* Filtered products by category */}
                {prodsByCat && <ProductsWrapper>
                    {prodsByCat.map((product) => (
                        <div key={product._id}>
                            <a href={`/products${product.subcategory.category.slug.current}${product.subcategory.slug.current}${product.slug.current}`}>
                                <img src={urlFor(product.image)} alt="Picture of the product." />
                                <p>{product.title}</p>
                                <p>{product.price} {product.currency}</p>
                            </a>
                        </div>
                    ))}
                </ProductsWrapper>}
                
                {/* All products */}
                <h1>All products</h1>
                <CategoriesWrapper>
                    <h2>Shop by category</h2>
                    {categories.map((category) =>
                        <div key={category._id}>
                            <a href={`/products${category.slug.current}`}>
                                <button onClick={() => fetchProdByCat(category.title)}>{category.title}</button>
                            </a>
                        </div>
                    )}
                </CategoriesWrapper>
                {!prodsByCat && <ProductsWrapper>
                    {products.map((product) => (
                        <div key={product._id}>
                            <div id="imagesWrapper">
                            <a 
                                href={`/products${product.subcategory.category.slug.current}${product.subcategory.slug.current}${product.slug.current}`}
                            >
                                <img src={urlFor(product.image)} alt="Picture of the product." />
                            </a>
                            <div>
                                <AddToCart
                                    product={product}
                                    cartAddedConfirmed={() => cartAddedConfirmed(product._id)}
                                >
                                    <img
                                        src={confirmCart === product._id ? Check : ShoppingCart} 
                                        alt="Shopping cart icon"
                                    />
                                </AddToCart>
                                <AddToWishlist
                                    productId={product._id}
                                    isWishlistItem={wishlistItems.includes(product._id)}
                                >
                                    <img 
                                        src={wishlistItems.includes(product._id) ? WishlistAdded : Wishlist}  
                                        alt="Wishlist icon." />
                                </AddToWishlist>

                            </div>
                            </div>
                            <a 
                                href={`/products${product.subcategory.category.slug.current}${product.subcategory.slug.current}${product.slug.current}`}
                            >
                                <div id="prodInfoWrapper">
                                    <p>{product.title}</p>
                                    <p>{product.price}:-</p>
                                </div>
                            </a>
                        </div>
                    ))}
                </ProductsWrapper>}
            </DefaultLayout>
        </>
    );
}