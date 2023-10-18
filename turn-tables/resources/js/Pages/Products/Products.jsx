import React, { useState, useEffect } from 'react';
import { fetchAllProducts } from "@/turn-table-studio/utils/sanity.queries";
import { urlFor } from '@/turn-table-studio/utils/sanity.client';
import { ProductsWrapper } from '../../Components/ProductsWrapper.style';
import SearchBar from '@/Components/SearchBar';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [productSearch, setProductSearch] = useState("")
    const [prodsByCat, setProdsByCat] = useState("");

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

    function fetchProdByCat(category) {
        fetchAllProducts()
            .then((data) => {
                if (category === "All products") {
                    setProducts(data);
                    setProdsByCat("");
                    setProductSearch("");
                    return;
                }
                const filteredData = data.filter((product) =>
                    product.subcategory.category.title === category
                )
                setProdsByCat(filteredData);
                setProductSearch("");
            })
            .catch((error) => console.error('Error fetching products:', error));
    }

    const categories = [
        "All products",
        "Furniture",
        "Lighting",
        "Decoration"
    ]

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
            
            <br />
            <br />
            {categories.map((category) =>
                <>
                    <button onClick={() => fetchProdByCat(category)}>{category}</button>
                    <br />
                </>
            )}
            
            {/* Search result products */}
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
                
            {/* Filtered products by category */}
            {!productSearch && <ProductsWrapper>
                {prodsByCat && prodsByCat.map((product) => (
                    <div key={product._id}>
                        <a href={`/products${product.slug.current}`}>
                            <p>{product.title}</p>
                            <img src={urlFor(product.image)} alt="Picture of the product." />
                            <p>{product.description}</p>
                            <p>{product.price} {product.currency}</p>
                        </a>
                    </div>
                ))}
            </ProductsWrapper>}

            {productSearch && <hr />}
            
            {/* All products */}
            {!prodsByCat && !productSearch && <ProductsWrapper>
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
            </ProductsWrapper>}
        </>
    );
}