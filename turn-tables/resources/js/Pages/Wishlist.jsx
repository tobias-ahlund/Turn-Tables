import DefaultLayout from '@/Layouts/DefaultLayout';
import { fetchWishlist } from '@/turn-table-studio/utils/sanity.queries';
import { useEffect, useState } from 'react';
import ProductCard from '@/Components/ProductCard.style';
import { ProductsWrapper } from '@/Components/ProductsWrapper.style';

export default function Wishlist({ productIds, wishlistItems }) {
    const [products, setProducts] = useState(null);
    const [wishlistUpdated, setWishlistUpdated] = useState(wishlistItems);

    useEffect(() => {
        fetchWishlist(wishlistUpdated)
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => console.error('Error fetching product:', error));
    }, [wishlistUpdated]);

    function updateWishlist(updatedWishlist) {
        setWishlistUpdated(updatedWishlist);
    }

    return (
        <>
            <DefaultLayout>
                <>
                {products ? (
                <>
                    <h1>Wishlist</h1>
                    <ProductsWrapper>
                        {products.map((product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                                showAddToCart={true}
                                showAddToWishlist={true}
                                wishlistUpdated={wishlistUpdated}
                                updateWishlist={updateWishlist}
                            />
                        ))}
                    </ProductsWrapper>
                </>
                ) : (
                    <p>No products in your wishlist</p>
                )}
                </> 
            </DefaultLayout>
        </>
    );
}
