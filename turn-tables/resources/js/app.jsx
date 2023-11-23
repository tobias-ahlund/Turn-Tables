import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

import { GlobalStyle } from './Components/GlobalStyle';
import { CartProvider } from 'use-shopping-cart';
import { WishlistProvider } from './Components/WishlistProvider';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const stripeKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <CartProvider 
                mode="payment"
                cartMode='checkout-session'
                stripe={stripeKey}
                currency="sek"
            >
                <>
                <WishlistProvider>
                    <GlobalStyle />
                    <App {...props} />
                </WishlistProvider>
                </>
            </CartProvider>);
    },
    progress: {
        color: '#4B5563',
    },
});
