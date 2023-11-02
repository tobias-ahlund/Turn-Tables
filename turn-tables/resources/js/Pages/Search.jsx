import DefaultLayout from '@/Layouts/DefaultLayout';
import { fetchAllProducts } from "@/turn-table-studio/utils/sanity.queries";
import { useState, useEffect } from 'react';
import { ProductsWrapper } from '@/Components/ProductsWrapper.style';
import ProductCard from '@/Components/ProductCard.style';

export default function Search({ wishlistItems }) {
    const [products, setProducts] = useState([]);
    const [confirmCart, setConfirmCart] = useState("");
    const [productSearch, setProductSearch] = useState("")
    const [wishlistUpdated, setWishlistUpdated] = useState(wishlistItems);

    useEffect(() => {
        const url = window.location.href;
        const parts = url.split('/');
        const searchQuery = parts[4];
        setProductSearch(searchQuery);

        fetchAllProducts()
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => console.error('Error fetching products:', error));
    }, []);

    function cartAddedConfirmed(productId) {
        setConfirmCart(productId);

        setTimeout(() => {
            setConfirmCart(null)
        }, 2000)
    }

    function updateWishlist(updatedWishlist) {
        setWishlistUpdated(updatedWishlist);
    }

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().indexOf(productSearch.toLowerCase()) !== -1
    );

    return (
        <>
            <DefaultLayout>
                {productSearch && filteredProducts.length !== 0 && (
                    <>
                        <h2>Showing results for "{productSearch}"</h2>
                        <p>We found {filteredProducts.length} product{filteredProducts.length > 1 && "s"}.</p>
                    </>
                )}
                {productSearch && filteredProducts.length === 0 && <h2>No results for "{productSearch}"</h2>}
                <ProductsWrapper>
                    {productSearch && filteredProducts.map((product) => (
                        <ProductCard
                        key={product._id}
                        product={product}
                        showAddToCart={true}
                        showAddToWishlist={true}
                        wishlistUpdated={wishlistUpdated}
                        updateWishlist={updateWishlist}
                        />
                    ))}
                </ProductsWrapper>
            </DefaultLayout>
        </>
    );
};