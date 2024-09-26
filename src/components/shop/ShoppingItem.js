import React from 'react';
import { Link } from 'react-router-dom';

export default function ShoppingItem({ item, addToCart }) {
    // 상품 이름이 30자를 초과하는 경우 ... 으로 표시
    const trimmedName = item.productName.length > 30 ? item.productName.slice(0, 30) + '...' : item.productName;

    // 가격을 천 단위로 구분하여 형식화
    const formattedPrice = new Intl.NumberFormat('ko-KR').format(item.price) + '원';


    return (
        <div className="col-3 mb-2">
            <div className="rounded position-relative fruite-item">
                <div className="fruite-img border border-secondary border-bottom-0" style={{ height: "220px" }}>
                    <Link to={`/shop/detail`} state={item.productId}>
                        <img style={{ objectFit: "cover" }}
                             src={item.imageURLs}
                             className="img-fluid w-100 rounded-top"
                             alt={item.productName}
                        />
                    </Link>
                </div>
                <div className="text-white bg-secondary px-3 py-1 rounded position-absolute fs-7" style={{ top: "3px", left: "3px" }}>
                    {item.category}
                </div>
                <div className="p-4 border border-secondary rounded-bottom">
                    <div style={{ height: "60px" }}>
                        <Link to={`/shop/detail`} state={item.productId} >
                            <h4 className="pro-name fs-6">{trimmedName}</h4>
                        </Link>
                    </div>
                    <p className="fs-7">{item.nutritionalInfo}</p>
                    <div className="d-flex justify-content-between align-items-end">
                        <div className="d-flex flex-column">
                            <div className="text-dark fs-7 fw-bold mb-2">
                                {formattedPrice}
                            </div>
                            <div className="text-dark fs-7 fw-bold mb-2">
                                {item.description}
                            </div>
                        </div>
                        <button
                            onClick={() => addToCart(item)}
                            className="btn border border-secondary rounded-pill px-3 text-primary fs-7 align-self-center"
                        >
                            <i className="fa fa-shopping-bag text-primary"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
