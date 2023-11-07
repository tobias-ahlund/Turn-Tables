import React, { useState, useEffect } from 'react';
import { fetchAllProducts, fetchAllCategories } from "@/turn-table-studio/utils/sanity.queries";
import { ProductsWrapper } from '../../Components/ProductsWrapper.style';
import DefaultLayout from '@/Layouts/DefaultLayout';
import { CategoriesWrapper } from '@/Components/CategoriesWrapper.style';
import SortButton from '@/Components/SortButton.style';
import ProductCard from '@/Components/ProductCard.style';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [prodsByCat, setProdsByCat] = useState("");
    const [runEffectSortAlphabetical, setRunEffectSortAlphabetical] = useState(false);
    const [runEffectSortPriceAsc, setRunEffectSortPriceAsc] = useState(false);

    useEffect(() => {
        if (runEffectSortAlphabetical) {
            console.log("sort alphabetical")

            const productsSortedAlphabetical = products.sort((a, b) => {
                const titleA = a.title.toUpperCase();
                const titleB = b.title.toUpperCase();
                
                if (titleA < titleB) {
                    return -1;
                }
                if (titleA > titleB) {
                    return 1;
                }
                return 0;
            });

            setProducts(productsSortedAlphabetical);

            setRunEffectSortAlphabetical(false);
        }
    }, [handleSortAlphabetical]);

    useEffect(() => {
        if (runEffectSortPriceAsc) {
            console.log("sort price ascending")

            const productsSortedPriceAsc = products.sort((a, b) => a.price - b.price);

            setProducts(productsSortedPriceAsc);

            setRunEffectSortPriceAsc(false);
        }
    }, [handleSortPriceAsc]);

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

    function handleSortAlphabetical() {
        setRunEffectSortAlphabetical(true);
    }

    function handleSortPriceAsc() {
        setRunEffectSortPriceAsc(true);
    }

    function fetchProdByCat(category) {
        fetchAllProducts()
            .then((data) => {
                if (category === "All products") {
                    setProducts(data);
                    setProdsByCat("");
                    return;
                }
                const filteredData = data.filter((product) =>
                    product.subcategory.category.title === category
                );
                setProdsByCat(filteredData);
            })
            .catch((error) => console.error('Error fetching products:', error));
    }

    return (
        <>
            <DefaultLayout>
                {/* {categories.map((category) =>
                    <div key={category._id}>
                        <a href={`/products${category.slug.current}`}>
                        <button onClick={() => fetchProdByCat(category.title)}>{category.title}</button>
                        </a>
                        <br />
                    </div>
                )} */}
                    
                {/* Filtered products by category */}
                {prodsByCat && <ProductsWrapper>
                    {prodsByCat.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            showAddToCart={true}
                            showAddToWishlist={true}
                        />
                    ))}
                </ProductsWrapper>}
                
                {/* All products */}
                <h1>All products</h1>
                <CategoriesWrapper>
                    <h2>Shop by category</h2>
                    {categories.map((category) => (
                        <div key={category._id}>
                            <a href={`/products${category.slug.current}`}>
                                <button onClick={() => fetchProdByCat(category.title)}>{category.title}</button>
                            </a>
                        </div>
                    ))}
                </CategoriesWrapper>

                <SortButton 
                    handleSortAlphabetical={() => {handleSortAlphabetical()}} 
                    handleSortPriceAsc={() => {handleSortPriceAsc()}} 
                />

                {!prodsByCat && <ProductsWrapper>
                    {products.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            showAddToCart={true}
                            showAddToWishlist={true}
                        />
                    ))}
                </ProductsWrapper>}
            </DefaultLayout>
        </>
    );
}
