import Header from "@/Components/Header.style";
import Footer from "@/Components/Footer.style";
import { Head } from '@inertiajs/react'
import LogoImage from '@/public/images/logo.svg';

export default function DefaultLayout({ children }) {
    return (
        <>
            <Head>
                <link rel="icon" type="image/svg+xml" href={LogoImage} />
                <title>Turn Tables</title>
            </Head>
            <div>
                <Header />
    
                <main>
                    {children}
                </main>

                <Footer>
                    <p>Footer</p>
                </Footer>
            </div>
        </>
    );
}