import DefaultLayout from '@/Layouts/DefaultLayout';

export default function Wishlist ({ auth }) {
    return (
        <>
            <DefaultLayout>
            {auth.user ? (
                <>
                    <p>Hello</p>
                </>
                    ) : (
                <>
                    <p>You are not logged in</p>
                </>
            )}

            </DefaultLayout>
        </>
    );
};