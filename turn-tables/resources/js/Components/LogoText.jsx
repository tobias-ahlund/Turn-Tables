import { Link } from '@inertiajs/react';
import LogoImage from '@/public/images/logo.svg';
import styled from 'styled-components';

const LogoWrapper = styled.div`
    & > a {
        display: flex;
        align-items: center;
        font-weight: bold;
        gap: .5rem;
    }

    & > a > img {
        width: 2.5rem !important;
        height: 2.5rem !important;
    }
`

export default function Logo() {
    return (
        <LogoWrapper>
            <Link
                href={route('home')}
            >
                <img src={LogoImage} alt="logo" />
                <p>Turn Tables</p>
            </Link>
        </LogoWrapper>
    );
}