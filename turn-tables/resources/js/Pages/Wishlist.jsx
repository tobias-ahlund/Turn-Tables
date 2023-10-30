import DefaultLayout from '@/Layouts/DefaultLayout';

export default function Wishlist({ auth, productId }) {
    return (
        <>
            <DefaultLayout>
                {auth.user ? (
                    <>
                        <p>Hello</p>
                        <p>Product ID: {productId}</p> {/* Display the product ID */}
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
