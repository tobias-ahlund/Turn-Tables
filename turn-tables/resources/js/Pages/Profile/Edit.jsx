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

const UpdateProfileArticle = styled.article`
    padding: 1rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
`

export default function Edit({ mustVerifyEmail, status, orders }) {

    const [previousOrders, setPreviousOrders] = useState([]);
    const [products, setProducts] = useState([]);

    const groupedOrders = Object.groupBy(orders, ({ order_id }) => order_id);

    const productIds = Array.from(
        new Set(
            orders.flatMap(order => order.product_id)
        )
    );

    useEffect(() => {

        fetchPreviousOrders()
        .then((data) => {
            setProducts(data);
        })
        .catch((error) => console.error('Error fetching products:', error));

        setPreviousOrders(groupedOrders);
    }, []);

    console.log(previousOrders);

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
                            <div key={orderGroup[0].order_id}>
                                <h3>Order ID: {orderGroup[0].order_id}</h3>
                                {orderGroup.map(individualOrder => (
                                    <div key={individualOrder.id}>
                                        <p>Product Id: {individualOrder.product_id}</p>
                                        <p>Total Cost: {individualOrder.price} SEK</p>
                                    </div>
                                ))}
                            </div>
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
