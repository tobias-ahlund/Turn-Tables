import DefaultLayout from '@/Layouts/DefaultLayout';
import { fetchWishlist } from '@/turn-table-studio/utils/sanity.queries';
import { useEffect, useState } from 'react';
import ProductCard from '@/Components/ProductCard.style';
import { ProductsWrapper } from '@/Components/ProductsWrapper.style';

export default function Wishlist({ productIds }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchWishlist(productIds)
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => console.error('Error fetching product:', error));
    }, []);

    const removeFromWishlist = (productId) => {
        const updatedProducts = products.filter((product) => product._id !== productId);
        setProducts(updatedProducts);
    };

    return (
        <>
            <DefaultLayout>
                <>
                {products.length > 0 ? (
                <>
                    <h1>Wishlist</h1>
                    <ProductsWrapper>
                        {products.map((product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                                showAddToCart={true}
                                showAddToWishlist={true}
                                onRemoveFromWishlist={removeFromWishlist}
                            />
                        ))}
                    </ProductsWrapper>
                </>
                ) : (
                    <>
                        <h1>Wishlist</h1>
                        <p>Your wishlist appears to be empty.</p>
                    </>
                )}
                </> 
            </DefaultLayout>
        </>
    );
}
