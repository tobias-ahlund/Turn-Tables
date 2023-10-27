import DefaultLayout from '@/Layouts/DefaultLayout';
import { fetchAllProducts } from "@/turn-table-studio/utils/sanity.queries";
import { useState, useEffect } from 'react';
import { ProductsWrapper } from '@/Components/ProductsWrapper.style';
import { AddToCart } from '@/Components/AddToCart';
import { urlFor } from '@/turn-table-studio/utils/sanity.client';
import ShoppingCart from '@/public/images/ShoppingCart.svg';
import Wishlist from '@/public/images/Wishlist.svg';
import Check from '@/public/images/Check.svg';

export default function Search() {
    const [products, setProducts] = useState([]);
    const [confirmCart, setConfirmCart] = useState("");
    const [productSearch, setProductSearch] = useState("")

    useEffect(() => {
        const url = window.location.href;
        const parts = url.split('/');
        const searchQuery = parts[4];
        setProductSearch(searchQuery);

        fetchAllProducts()
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => console.error('Error fetching products:', error));
    }, []);

    function cartAddedConfirmed(productId) {
        setConfirmCart(productId);

        setTimeout(() => {
            setConfirmCart(null)
        }, 2000)
    }

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().indexOf(productSearch.toLowerCase()) !== -1
    );

    return (
        <>
            <DefaultLayout>
                {productSearch && filteredProducts.length !== 0 && (
                    <>
                        <h2>Showing results for "{productSearch}"</h2>
                        <p>We found {filteredProducts.length} product{filteredProducts.length > 1 && "s"}.</p>
                    </>
                )}
                {productSearch && filteredProducts.length === 0 && <h2>No results for "{productSearch}"</h2>}
                <ProductsWrapper>
                    {productSearch && filteredProducts.map((product) => (
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
                                <div>
                                    <img src={Wishlist} alt="Wishlist icon" />
                                </div>
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
                </ProductsWrapper>
            </DefaultLayout>
        </>
    );
};