import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Scrollbar, Navigation } from "swiper/modules";
import axios from "axios";
import "swiper/css";
import "swiper/css/navigation";

export default function ShopRelatedProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.post("/getRelatedProducts");
                setProducts(res.data);
            } catch (error) {
                console.error('Error fetching related products:', error);
            }
        };
        fetchData();
    }, []);


    return (
        <div
            className="vesitable"
            style={{
                marginTop: "20px",
                marginLeft: "40px",
                marginRight: "40px",
            }}
        >
            <Swiper
                slidesPerView={5}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                scrollbar={{
                    hide: true,
                }}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                navigation={true}
                loop={true}
                modules={[Autoplay, Scrollbar, Navigation]}
                className="RelatedProducts"
            >
                {products.map((product, index) => (
                    <SwiperSlide key={index}>
                        <div className="border border-primary rounded position-relative vesitable-item" style={{height:"500px"}}>
                            <div className="vesitable-img">
                                <img
                                    src={product.imageURLs || "/img/default-image.jpg"}
                                    className="img-fluid w-100 rounded-top"
                                    alt={product.productName || "Product Image"}
                                    style={{height:"300px"}}
                                />
                            </div>
                            <div
                                className="text-white bg-primary px-3 py-1 rounded position-absolute"
                                style={{ top: "10px", right: "10px" }}
                            >
                                {product.category || "Unknown Category"}
                            </div>
                            <div className="p-4 pb-0 rounded-bottom">
                                <h5>{product.productName || "Unknown Product"}</h5>
                                <p>{product.description || "No description available."}</p>
                                <div className="d-flex justify-content-between flex-lg-wrap">
                                    <p className="text-dark fs-5 fw-bold">
                                        {product.price ? `${product.price.toLocaleString()} 원` : "Unknown Price"}
                                    </p>
                                    <a
                                        href="#"
                                        className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"
                                    >
                                        <i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
                                    </a>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
