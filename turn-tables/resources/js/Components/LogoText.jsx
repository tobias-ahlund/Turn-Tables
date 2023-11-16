import { Link } from '@inertiajs/react';

export default function Logo() {
    return (
        <div>
            <Link
                href={route('home')}
            >
                <p>Turn Tables</p>
            </Link>
        </div>
    );
}