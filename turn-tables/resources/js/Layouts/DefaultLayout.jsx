import Header from "@/Components/Header.style";
import Footer from "@/Components/Footer.style";

export default function DefaultLayout({ children, onSearch }) {
    return (
        <div>
            <Header onSearch={onSearch}/>
   
            <main>
                {children}
            </main>

            <Footer>
                <p>Footer</p>
            </Footer>
        </div>
    );
}