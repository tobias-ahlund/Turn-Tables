import { Link } from '@inertiajs/react';
import Wishlist from "@/public/images/Wishlist.svg";

export default function WishlistLink() {
    return (
        <Link
            href={route('wishlist')}
        >
                <img src={Wishlist} alt="Shopping cart icon" />
        </Link>
    );
}