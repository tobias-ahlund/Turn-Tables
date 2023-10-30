import DefaultLayout from '@/Layouts/DefaultLayout';
import product from '@/turn-table-studio/schemas/product';
import { fetchWishlist } from '@/turn-table-studio/utils/sanity.queries';
import { useEffect, useState } from 'react';


export default function Wishlist({ productIds }) {

    const [products, setProducts] = useState(null);

    const newArray = productIds.map((item, index) => {
        if (index === productIds.length - 1) {
            return item + '"';
        }
        else if (index === (productIds.length - productIds.length)) {
            console.log(index);
                return '"' + item + '" || _id == "';
            }
        else {
            return item + '" || _id == "';
        }
    })

    const newString = newArray.join('');

    console.log(newString);


    useEffect(() => {
        fetchWishlist(newString)
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
