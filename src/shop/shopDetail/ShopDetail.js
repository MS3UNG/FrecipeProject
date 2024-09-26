import React from 'react';
import { useLocation } from 'react-router-dom';
import SinglePageHeader from "./SinglePageHeader";
import ShopDetailBody from "./ShopDetailBody";

export default function ShopDetail({ addToCart }) {
    const itemId = useLocation().state;

    return (
        <>
            <SinglePageHeader />
            <ShopDetailBody itemId={itemId} addToCart={addToCart} />
        </>
    );
}
