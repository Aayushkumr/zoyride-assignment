import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const RelatedProducts = observer(({ category, subCategory }) => {
    const { products, setRelatedProducts, relatedProducts } = useContext(ShopContext);

    useEffect(() => {
        if (products.length > 0) {
            let relatedProducts = products.filter(
                (item) => item.category === category && item.subCategory === subCategory
            );
            setRelatedProducts(relatedProducts.slice(0, 5));
        }
    }, [products, category, subCategory, setRelatedProducts]);

    return (
        <div className="my-24">
            <div className="text-center text-3xl py-2">
                <Title text1={"Related"} text2={"Products"}></Title>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {relatedProducts.map((item, index) => (
                    <ProductItem
                        key={index}
                        id={item._id}
                        image={item.image}
                        name={item.name}
                        price={item.price}
                    ></ProductItem>
                ))}
            </div>
        </div>
    );
});

export default RelatedProducts;
