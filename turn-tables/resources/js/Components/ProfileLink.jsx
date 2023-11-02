import Profile from '@/public/images/Profile.svg';
import { Link } from '@inertiajs/react';

export default function ProfileLink() {
    return (
        <>
        <Link 
            href={route('profile.edit')}
        >
            <img src={Profile} alt="Profile page link icon" />
        </Link>
        </>
    );
}