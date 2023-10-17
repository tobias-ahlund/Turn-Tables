import React, { useState, useEffect } from 'react';
import { fetchAllProducts } from "@/turn-table-studio/utils/sanity.queries";

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
            <ul>
                {products.map((product) => {
                    <li key={product._id}>{product.title}</li>
                })}
            </ul>
        </>
    );
}