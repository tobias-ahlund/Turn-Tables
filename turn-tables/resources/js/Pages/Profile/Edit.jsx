import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useEffect, useState } from 'react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import DefaultLayout from '@/Layouts/DefaultLayout';
import styled from 'styled-components';
import { Link } from '@inertiajs/react';
import { fetchPreviousOrders } from '@/turn-table-studio/utils/sanity.queries';
import PreviousOrderCard from '@/Components/PreviousOrderCard';

const UpdateProfileArticle = styled.article`
    padding: 1rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
    height: auto;
`

export default function Edit({ mustVerifyEmail, status, orders }) {

    const [previousOrders, setPreviousOrders] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productIds = Array.from(
                    new Set(
                        orders.map(order => order.product_id)
                    )
                );
    
                const products = await fetchPreviousOrders(productIds);
                setProducts(products);

                const groupedOrders = Object.groupBy(orders, ({ order_id }) => order_id);
                setPreviousOrders(groupedOrders);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
    
        fetchProducts();
    }, [orders]);

    const getProductTitle = (productId) => {
        const product = products.find(product => product._id === productId);
        return product ? product.title : 'Product Title Not Found';
    };

    const getProductImage = (productId) => {
        const product = products.find(product => product._id === productId);
        return product ? product.image : 'Product Image Not Found';
    }

    return (
        <DefaultLayout>
            <Head title="Profile" />
            <h1>Profile</h1>

            <section>
                <Link href={route("logout")} as="button" method="post">Log out</Link>
                <div>
                    <UpdateProfileArticle>
                        <h2>Previous Orders</h2>
                        {Object.values(previousOrders).map(orderGroup => (
                            <PreviousOrderCard key={orderGroup[0].order_id} previousOrders={orderGroup} products={products}></PreviousOrderCard>

                            // <div key={orderGroup[0].order_id}>
                            //     <h3>Order ID: {orderGroup[0].order_id}</h3>
                            //     {orderGroup.map(individualOrder => (
                            //         <div key={individualOrder.id}>
                            //             <p>Product Id: {individualOrder.product_id}</p>
                            //             <p>Product Title: {getProductTitle(individualOrder.product_id)}</p>
                            //             <img src={getProductImage(individualOrder.product_id)} alt="Image of the product."></img>
                            //             <p>Total Cost: {individualOrder.price} SEK</p>
                            //         </div>
                            //     ))}
                            // </div>
                        ))}
                    </UpdateProfileArticle>

                    <UpdateProfileArticle>
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </UpdateProfileArticle>

                    <UpdateProfileArticle>
                        <UpdatePasswordForm className="max-w-xl" />
                    </UpdateProfileArticle>

                    <UpdateProfileArticle>
                        <DeleteUserForm className="max-w-xl" />
                    </UpdateProfileArticle>
                </div>
            </section>
        </DefaultLayout>
    );
}
