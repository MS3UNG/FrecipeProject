import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ShopFeatured() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.post("/randomProducts");
            setProducts(res.data);
        };
        fetchData();
    }, []);

    return (
        <div className="col-lg-12">
            <h4 className="mb-3">Featured products</h4>
            {products.map((product, index) => (
                <div className="d-flex align-items-center justify-content-start mb-3" key={index}>
                    <Link
                        to={`/shop/detail`}
                        state={product.productId}
                        className="d-flex align-items-center"
                        style={{
                            textDecoration: 'none',
                            color: 'inherit'
                        }}
                    >
                        <div
                            className="rounded me-4"
                            style={{
                                width: "100px",
                                height: "100px",
                            }}
                        >
                            <img
                                style={{
                                    width: "100px",
                                    height: "100px",
                                }}
                                src={product.imageURLs || "/img/default-image.jpg"}
                                className="img-fluid rounded"
                                alt={product.productName || "Product Image"}
                            />
                        </div>
                        <div>
                            <h6 className="mb-2">{product.productName || "Unknown Product"}</h6>
                            <div className="d-flex mb-2">
                                <h5 className="fw-bold me-2">{product.price ? `${product.price.toLocaleString()} 원` : "Unknown Price"}</h5>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
            <div className="d-flex justify-content-center my-4">
                <Link
                    to="/shop"
                    className="btn border border-secondary px-4 py-3 rounded-pill text-primary w-100"
                >
                    View More
                </Link>
            </div>
        </div>
    );
}
