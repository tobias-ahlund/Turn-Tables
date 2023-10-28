import { Link } from '@inertiajs/react';

export default function Logo() {
    return (
        <div>
            <Link
                href={route('products')}
            >
                <p>Turn Tables</p>
            </Link>
        </div>
    );
}