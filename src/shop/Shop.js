// src/shop/Shop.js
import SinglePageHeader from "./SinglePageHeader";
import ShopBody from "./ShopBody";

export default function Shop({ addToCart }) {
    return (
        <>
            <SinglePageHeader />
            <ShopBody addToCart={addToCart} />
        </>
    );
}
