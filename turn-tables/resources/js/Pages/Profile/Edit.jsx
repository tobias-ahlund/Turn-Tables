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

    return (
        <DefaultLayout>
            <Head title="Profile" />
            <h1>Profile</h1>

            <section>
                <Link href={route("logout")} as="button" method="post">Log out</Link>
                <div>
                    <UpdateProfileArticle>
                        <h2>Orders</h2>
                        {orders.map(order => (
                            <div key={order.id}>
                                <p>Order Id: {order.order_id}</p>
                                <p>Product Id: {order.product_id}</p>
                                <p>Total Cost: {order.price} SEK</p>
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
