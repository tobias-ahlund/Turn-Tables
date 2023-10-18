import React, { useState, useEffect } from 'react';
import { fetchAllProducts } from "@/turn-table-studio/utils/sanity.queries";
import { urlFor } from '@/turn-table-studio/utils/sanity.client';
import { ProductsWrapper } from '../../Components/ProductsWrapper.style';
import SearchBar from '@/Components/SearchBar';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [productSearch, setProductSearch] = useState("")

    useEffect(() => {
        fetchAllProducts()
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => console.error('Error fetching products:', error));
    }, []);

    function onSearch(searchQuery) {
        setProductSearch(searchQuery);
    }

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().indexOf(productSearch.toLowerCase()) !== -1
    );

    return (
        <>
            <SearchBar onSearch={onSearch}/>
            {productSearch && filteredProducts.length !== 0 && (
                <>
                    <h2>Showing results for "{productSearch}"</h2>
                    <p>We found {filteredProducts.length} products.</p>
                </>
            )}
            {productSearch && filteredProducts.length === 0 && <h2>No results for "{productSearch}"</h2>}
            <ProductsWrapper>
                {productSearch && filteredProducts.map((product) => (
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
            {productSearch && <hr />}
            <h2>All products</h2>
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