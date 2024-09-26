import {useEffect, useState} from "react";
import axios from "axios";
import {useLocation} from "react-router-dom";

export default function ProductDetail({itemId, addToCart}) {
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const location = useLocation();
    const productId = location.state || itemId;

    useEffect(() => {
        const fetchData = async () => {
            if (productId) {
                try {
                    const res = await axios.post('/getProductDetail', {productId});
                    setProduct(res.data);
                } catch (error) {
                    console.error('Error fetching product details:', error);
                }
            } else {
                console.error('Product ID is null');
            }
        };
        fetchData();
        setQuantity(1);
    }, [productId]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleChange = (event) => {
        const value = Math.max(1, parseInt(event.target.value,10) || 1);
        setQuantity(value);
    };

    const totalPrice = product.price * quantity;

    return (
        <div className="row g-4">
            <div className="col-lg-6">
                <div className="border rounded">
                    <a href="#">
                        <img
                            src={product.imageURLs || "/img/single-item.jpg"}
                            className="img-fluid rounded"
                            alt={product.productName || "Product Image"}
                        />
                    </a>
                </div>
            </div>
            <div className="col-lg-6">
                <h4 className="fw-bold mb-3">{product.productName || "Unknown Product"}</h4>
                <p className="mb-3">Brand: {product.brand || "Unknown Brand"}</p>
                <p className="mb-3">Category: {product.category || "Unknown Category"}</p>
                <h5 className="fw-bold mb-3">{product.price ? `${product.price.toLocaleString()} 원` : "Unknown Price"}</h5>
                <div className="d-flex mb-4">
                    <div className="input-group quantity mb-5" style={{width: "115px"}}>
                        <div className="input-group-btn">
                            <button
                                className="btn btn-sm btn-minus rounded-circle bg-light border"
                                onClick={handleDecrease}
                            >
                                <i className="fa fa-minus"></i>
                            </button>
                        </div>
                        <input
                            type="text"
                            className="form-control form-control-sm text-center border-0"
                            value={quantity}
                            onChange={handleChange}
                        />
                        <div className="input-group-btn">
                            <button
                                className="btn btn-sm btn-plus rounded-circle bg-light border"
                                onClick={handleIncrease}
                            >
                                <i className="fa fa-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <h5 className="fw-bold mb-3">총액: {totalPrice.toLocaleString()} 원</h5>
                <a
                    href="#"
                    className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary"
                    onClick={() => addToCart({...product, quantity})}
                >
                    <i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
                </a>
            </div>
            <div className="col-lg-12">
                <nav>
                    <div className="nav nav-tabs mb-3">
                        <button
                            className="nav-link active border-white border-bottom-0"
                            type="button"
                            role="tab"
                            id="nav-about-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-about"
                            aria-controls="nav-about"
                            aria-selected="true"
                        >
                            Description
                        </button>
                    </div>
                </nav>
                <div className="tab-content mb-5">
                    <div
                        className="tab-pane active"
                        id="nav-about"
                        role="tabpanel"
                        aria-labelledby="nav-about-tab"
                    >
                        <p>
                            {product.description || "No description available."}
                        </p>
                        <p>
                            {product.nutritionalInfo || "No nutritional information available."}
                        </p>
                        <div className="px-2">
                            <div className="row g-4">
                                <div className="col-6">
                                    <div
                                        className="row bg-light align-items-center text-center justify-content-center py-2">
                                        <div className="col-6">
                                            <p className="mb-0">Weight</p>
                                        </div>
                                        <div className="col-6">
                                            <p className="mb-0">{product.quantity || "N/A"} kg</p>
                                        </div>
                                    </div>
                                    <div className="row text-center align-items-center justify-content-center py-2">
                                        <div className="col-6">
                                            <p className="mb-0">Country of Origin</p>
                                        </div>
                                        <div className="col-6">
                                            <p className="mb-0">{product.supplier || "Unknown"}</p>
                                        </div>
                                    </div>
                                    <div
                                        className="row bg-light text-center align-items-center justify-content-center py-2">
                                        <div className="col-6">
                                            <p className="mb-0">Quality</p>
                                        </div>
                                        <div className="col-6">
                                            <p className="mb-0">Organic</p>
                                        </div>
                                    </div>
                                    <div className="row text-center align-items-center justify-content-center py-2">
                                        <div className="col-6">
                                            <p className="mb-0">Check</p>
                                        </div>
                                        <div className="col-6">
                                            <p className="mb-0">Healthy</p>
                                        </div>
                                    </div>
                                    <div
                                        className="row bg-light text-center align-items-center justify-content-center py-2">
                                        <div className="col-6">
                                            <p className="mb-0">Min Weight</p>
                                        </div>
                                        <div className="col-6">
                                            <p className="mb-0">250 kg</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
