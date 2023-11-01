import DefaultLayout from "@/Layouts/DefaultLayout";
import { CategoriesWrapper } from "@/Components/CategoriesWrapper.style";
import { fetchAllCategories } from "@/turn-table-studio/utils/sanity.queries";
import { useState, useEffect } from "react";
import Collage from '@/Components/Collage.style';

export default function Home() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchAllCategories()
            .then((data) => {
                setCategories(data);
                console.log(data);
            })
            .catch((error) => console.error('Error fetching categories:', error));
    }, []);
    
    return (
        <DefaultLayout>
            <h1>Welcome to Turn Tables</h1>
            <CategoriesWrapper>
                    <h2>Shop by category</h2>
                    {categories.map((category) =>
                        <div key={category._id}>
                            <a href={`/products${category.slug.current}`}>
                                <button>{category.title}</button>
                            </a>
                        </div>
                    )}
            </CategoriesWrapper>
            <Collage />
        </DefaultLayout>
    );
}