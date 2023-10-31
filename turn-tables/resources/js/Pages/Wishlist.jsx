import DefaultLayout from '@/Layouts/DefaultLayout';
import { fetchWishlist } from '@/turn-table-studio/utils/sanity.queries';
import { useEffect, useState } from 'react';


export default function Wishlist({ productIds }) {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        fetchWishlist(productIds)
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => console.error('Error fetching product:', error));
        }, []);

        console.log(products);

    return (
        <>
            <DefaultLayout>
                    <>
                        <p>Hello</p>

                        {products ? (
                            <>
                                <h2>Products in Wishlist:</h2>
                                <ul>
                                    {products.map((product) => (
                                        <li key={product._id}>{product.title}</li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <p>No products in your wishlist</p>
                        )}
                    </> 
            </DefaultLayout>
        </>
    );
}
