import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function CartPayment() {
    const [memberNo, setMemberNo] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [shipping, setShipping] = useState(3000); // 예시로 고정 배송비를 3000원으로 설정
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const token = JSON.parse(sessionStorage.getItem("token"));
        if (token && token.no) {
            setMemberNo(token.no);
        }
    }, []);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const res = await axios.post("/cart/getCartList", {memberNo});
                setCartItems(res.data);
            } catch (err) {
                console.error("장바구니 목록을 가져오는 데 실패했습니다.", err);
            }
        };
        if (memberNo !== 0) {
            fetchCartItems();
        }
    }, [memberNo]);

    useEffect(() => {
        const calculateSubtotal = () => {
            const newSubtotal = cartItems.reduce((acc, item) => acc + item.productPrice * item.quantity, 0);
            setSubtotal(newSubtotal);
        };
        calculateSubtotal();
    }, [cartItems]);

    useEffect(() => {
        setTotal(subtotal + shipping);
    }, [subtotal, shipping]);

    const handleQuantityChange = (productId, delta) => {
        setCartItems(prevItems =>
            prevItems.map(item => {
                if (item.productId === productId) {
                    const newQuantity = item.quantity + delta;
                    // 수량이 1 밑으로 내려가지 않도록
                    if (newQuantity < 1) {
                        return item;
                    }
                    return {...item, quantity: newQuantity};
                }
                return item;
            })
        );
    };

    const handleRemoveItem = async (productId) => {
        const res = await axios.get("/cart/delete?id=" + productId);
        if(res.status === 200) {
            const res = await axios.post("/cart/getCartList", {memberNo});
            setCartItems(res.data);
        }
    };

    const handlePaymentClick = () => {
        navigate('/payment', {state: {cartItems, total}});
    };

    return (
        <div className="container-fluid py-5">
            <div className="container py-5">
                <div className="table-responsive">
                    <table className="table" style={{textAlign: "center"}}>
                        <thead>
                        <tr>
                            <th>제품</th>
                            <th>이름</th>
                            <th>가격</th>
                            <th>수량</th>
                            <th>총 금액</th>
                            <th>삭제</th>
                        </tr>
                        </thead>
                        <tbody>
                        {cartItems.map(item => (
                            <tr key={item.productId}>
                                <th scope="row" style={{width: "250px"}}>
                                    <img
                                        src={item.imageURLs}
                                        className="img-fluid me-5 rounded-circle"
                                        style={{width: "80px", height: "80px"}}
                                        alt={item.productName}
                                    />
                                </th>
                                <td className="product-info">
                                    <p className="mb-0 mt-4">{item.productName}</p>
                                </td>
                                <td>
                                    <p className="mb-0 mt-4">
                                        {new Intl.NumberFormat("ko-KR", {}).format(item.productPrice)} 원
                                    </p>
                                </td>
                                <td>
                                    <div className="input-group quantity mt-4">
                                        <div className="input-group-btn">
                                            <button
                                                className="btn-minus rounded-circle bg-light border"
                                                onClick={() => handleQuantityChange(item.productId, -1)}
                                            >
                                                <i className="fa fa-minus"></i>
                                            </button>
                                        </div>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm text-center border-0 "
                                            value={item.quantity}
                                            readOnly
                                            style={{width: "30px", backgroundColor: "white"}}
                                        />
                                        <div className="input-group-btn">
                                            <button
                                                className="btn-plus rounded-circle bg-light border"
                                                onClick={() => handleQuantityChange(item.productId, 1)}
                                            >
                                                <i className="fa fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                </td>
                                <td className="align-middle">
                                    <p className="mb-0 mt-4">
                                        {new Intl.NumberFormat("ko-KR", {}).format(item.productPrice * item.quantity)} 원
                                    </p>
                                </td>
                                <td className="align-middle">
                                    <button
                                        className="btn btn-md rounded-circle bg-light border mt-4"
                                        type={"button"}
                                        onClick={() => handleRemoveItem(item.cartId)}
                                        style={{marginTop: "auto"}}
                                    >
                                        <i className="fa fa-times text-danger"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <div className="row g-4 justify-content-end my-5">
                    <div className="col-8"></div>
                    <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
                        <div className="bg-light rounded">
                            <div className="p-4">
                                <h1 className="display-6 mb-4">
                                    <span className="fw-normal">장바구니</span>
                                </h1>
                                <div className="d-flex justify-content-between mb-4">
                                    <h5 className="mb-0 me-4">주문금액</h5>
                                    <p className="mb-0">
                                        {new Intl.NumberFormat("ko-KR", {}).format(subtotal.toFixed(0))} 원
                                    </p>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <h5 className="mb-0 me-4">배송비</h5>
                                    <div>
                                        <p className="mb-0">
                                            고정 요금: {new Intl.NumberFormat("ko-KR", {}).format(shipping.toFixed(0))} 원
                                        </p>
                                    </div>
                                </div>
                                <p className="mb-0 text-end"></p>
                            </div>
                            <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                                <h5 className="mb-0 ps-4 me-4">총 금액</h5>
                                <p className="mb-0 pe-4">
                                    {new Intl.NumberFormat("ko-KR", {}).format(total.toFixed(0))} 원
                                </p>
                            </div>
                            <button
                                onClick={handlePaymentClick}
                                className="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4"
                                type="button"
                            >
                                결제하기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
