import ProductDetail from "../../components/shop/ProductDetail";
import SearchBar from "../../components/SearchBar";
import ShopAd from "../../components/shop/ShopAd";
import ShopCategories from "../../components/shop/ShopCategories";
import ShopFeatured from "../../components/shop/ShopFeatured";
import ShopRealatedProducts from "../../components/shop/ProductSlider";
import { useEffect } from "react";

export default function ShopDetailBody({ itemId, addToCart }) {


  return (
      <div className="container-fluid py-5 mt-5">
        <div className="container py-5">
          <div className="row g-4 mb-5">
            {/* 여기가 상품 상세설명 ~ Post Comment까지 */}
            <div className="col-lg-8 col-xl-9">
              <ProductDetail itemId={itemId} addToCart={addToCart} />
            </div>

            {/* 여기가 사이드바 */}
            <div className="col-lg-4 col-xl-3">
              <div className="row g-4 fruite">
                <div className="col-lg-12">
                  {/* 여기가 사이드바 */}
                </div>

                {/* 추천상품 ShopFeatured */}
                <ShopFeatured />

                {/* 광고배너 */}
                <ShopAd />
              </div>
            </div>
          </div>
          <h1 className="fw-bold mb-0">Related products</h1>
          <ShopRealatedProducts />
        </div>
      </div>
  );
}
