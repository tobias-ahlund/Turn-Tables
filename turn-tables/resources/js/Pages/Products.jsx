import React, { useState, useEffect } from 'react';
import { fetchAllProducts } from "@/turn-table-studio/utils/sanity.queries";
import { urlFor } from '@/turn-table-studio/utils/sanity.client';

export default function Products() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchAllProducts()
          .then((data) => {
            setProducts(data);
          })
          .catch((error) => console.error('Error fetching products:', error));
      }, []);

    return (
        <>
            <h1>Products</h1>
            <section>
                {products.map((product) => (
                    <div key={product._id}>
                        <p>{product.title}</p>
                        <img src={urlFor(product.image)} alt="Picture of the product." />
                        <p>{product.description}</p>
                        <p>{product.price} {product.currency}</p>
                    </div>
                ))}
            </section>
        </>
    );
}