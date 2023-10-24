import React, { useState, useEffect } from 'react';
import { fetchAllProducts, fetchAllCategories } from "@/turn-table-studio/utils/sanity.queries";
import { urlFor } from '@/turn-table-studio/utils/sanity.client';
import { ProductsWrapper } from '../../Components/ProductsWrapper.style';
import DefaultLayout from '@/Layouts/DefaultLayout';
import ShoppingCart from '@/public/images/ShoppingCart.svg';
import Wishlist from '@/public/images/Wishlist.svg';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [productSearch, setProductSearch] = useState("")
    const [prodsByCat, setProdsByCat] = useState("");

    useEffect(() => {
        fetchAllProducts()
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => console.error('Error fetching products:', error));

        fetchAllCategories()
            .then((data) => {
                setCategories(data);
                console.log(data);
            })
            .catch((error) => console.error('Error fetching categories:', error));
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

    // const categories = [
    //     "All products",
    //     "Furniture",
    //     "Lighting",
    //     "Decoration"
    // ]

    return (
        <>
            <DefaultLayout onSearch={onSearch}>
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
                    <div key={category._id}>
                        <a href={`/products${category.slug.current}`}>
                        <button onClick={() => fetchProdByCat(category.title)}>{category.title}</button>
                        </a>
                        <br />
                    </div>
                )}
                
                {/* Search result products */}
                <ProductsWrapper>
                    {productSearch && filteredProducts.map((product) => (
                        <div key={product._id}>
                            <a href={`/products/${product.subcategory.category.title}/${product.subcategory.title}${product.slug.current}`}>
                                <img src={urlFor(product.image)} alt="Picture of the product." />
                                <p>{product.title}</p>
                                <p>{product.price} {product.currency}</p>
                            </a>
                        </div>
                    ))}
                </ProductsWrapper>
                    
                {/* Filtered products by category */}
                {!productSearch && <ProductsWrapper>
                    {prodsByCat && prodsByCat.map((product) => (
                        <div key={product._id}>
                            <a href={`/products/${product.subcategory.category.title}/${product.subcategory.title}${product.slug.current}`}>
                                <img src={urlFor(product.image)} alt="Picture of the product." />
                                <p>{product.title}</p>
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
                            <a href={`/products/${product.subcategory.category.title.toLowerCase()}/${product.subcategory.title.toLowerCase().replace(/\s+/g, '-')}${product.slug.current}`}>
                                <div id="imagesWrapper">
                                    <img src={urlFor(product.image)} alt="Picture of the product." />
                                    <div>
                                        <div>
                                            <img src={ShoppingCart} alt="Shopping cart icon"/>
                                        </div>
                                        <div>
                                            <img src={Wishlist} alt="Wishlist icon" />
                                        </div>
                                    </div>
                                </div>
                                <div id="prodInfoWrapper">
                                    <p>{product.title}</p>
                                    <p>{product.price}:-</p>
                                </div>
                            </a>
                        </div>
                    ))}
                </ProductsWrapper>}
            </DefaultLayout>
        </>
    );
}