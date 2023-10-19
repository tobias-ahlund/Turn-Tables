import Header from "@/Components/Header.style";
import Footer from "@/Components/Footer.style";

export default function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
   
            <main>
                {children}
            </main>

            <Footer>
                <p>Footer</p>
            </Footer>
        </div>
    );
}