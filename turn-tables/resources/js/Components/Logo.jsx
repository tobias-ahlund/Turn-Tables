import { Link } from '@inertiajs/react';
import LogoImage from '@/public/images/logo.svg';
import styled from 'styled-components';

const LogoStyle = styled.img`
    width: 5rem !important;
    height: 5rem !important;
    align-self: flex-start;
    animation: turn 3s ease-in-out infinite;

    @keyframes turn {
        0% {
            transform: rotate(0deg);
        }
        80% {
            transform: rotate(380deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`

export default function Logo() {
    return (
        <div>
            <Link
                href={route('home')}
            >
                <LogoStyle src={LogoImage} alt="logo" />
            </Link>
        </div>
    );
}