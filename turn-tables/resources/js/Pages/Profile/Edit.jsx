import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import DefaultLayout from '@/Layouts/DefaultLayout';
import styled from 'styled-components';
import { Link } from '@inertiajs/react';

const UpdateProfileArticle = styled.article`
    padding: 1rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
`

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <DefaultLayout>
            <Head title="Profile" />
            <h1>Profile</h1>

            <section>
                <Link href={route("logout")} as="button" method="post">Log out</Link>
                <div>
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
