import { Link } from '@inertiajs/react';

export default function Logo() {
    return (
        <Link
            href={route('products')}
        >
            <p>Turn Tables</p>
        </Link>
    );
}