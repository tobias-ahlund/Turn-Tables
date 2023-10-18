import React, { useState, useEffect } from 'react';
import { fetchAllProducts } from "@/turn-table-studio/utils/sanity.queries";
import { urlFor } from '@/turn-table-studio/utils/sanity.client';
import { ProductsWrapper } from '../../Components/ProductsWrapper.style';

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
            <ProductsWrapper>
                {products.map((product) => (
                    <div key={product._id}>
                        <a href={`/products${product.slug.current}`}>
                            <p>{product.title}</p>
                            <img src={urlFor(product.image)} alt="Picture of the product." />
                            <p>{product.description}</p>
                            <p>{product.price} {product.currency}</p>
                        </a>
                    </div>
                ))}
            </ProductsWrapper>
        </>
    );
}