// src/components/Footer.js
import React from "react";
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <div className="container-fluid bg-dark text-white-50 footer mt-5">
            <div className="container py-5">
                <div
                    className="pb-4 mb-4"
                    style={{
                        borderBottom: "1px solid rgba(226, 175, 24, 0.5)",
                    }}
                >
                    <div className="row g-4">
                        <div className="col-lg-3">
                            <Link to={"/"}>
                                <img src={"/FrecipeLogo.png"} style={{width: "180px"}}/>
                            </Link>
                        </div>
                        <div className="col-lg-6"></div>
                        <div className="col-lg-3">
                            <div className="d-flex justify-content-end pt-3">
                                <a
                                    className="btn btn-outline-secondary me-2 btn-md-square rounded-circle"
                                    href=""
                                >
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a
                                    className="btn btn-outline-secondary me-2 btn-md-square rounded-circle"
                                    href=""
                                >
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a
                                    className="btn btn-outline-secondary me-2 btn-md-square rounded-circle"
                                    href=""
                                >
                                    <i className="fab fa-youtube"></i>
                                </a>
                                <a
                                    className="btn btn-outline-secondary btn-md-square rounded-circle"
                                    href=""
                                >
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row g-5">
                    <div className="col-lg-4 col-md-6">
                        <div className="footer-item">
                            <h4 className="text-light mb-3">
                                신선한 재료 관리
                                <br/> 맛있는 요리 레시피!!
                            </h4>
                            <p className="mb-4">
                                신선하고 효율적인 냉장고관리, 레시피 공유.<br/>
                                누구나 즐겁게 요리를 배울 수 있다!
                            </p>
                            <Link to={"/login"}>
                                <a
                                    className="btn border-secondary py-2 px-4 rounded-pill text-primary"
                                >
                                    Join Us
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="d-flex flex-column text-start footer-item">
                            <h4 className="text-light mb-3">Recipe</h4>
                            <Link to={"/recipe/find"}>
                                <a className="btn-link">
                                    우리들의 레시피
                                </a>
                            </Link>
                            <Link to={"/recipe/hof"}>
                                <a className="btn-link">
                                    명예레시피
                                </a>
                            </Link>
                            <Link to={"/chobo"}>
                                <a className="btn-link">
                                    초보요리사
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="footer-item">
                            <h4 className="text-light mb-3">Contact</h4>
                            <p>Address: 세종시 가온로 9(다정동)</p>
                            <p>Email: shhg60@naver.com</p>
                            <p>Phone: 010-2226-6456</p>
                            <p>Payment Accepted</p>
                            <img
                                src="/img/payment.png"
                                className="img-fluid"
                                alt="Payment Methods"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="container text-center">
                <p className="m-0">
                    &copy;{" "}
                    <Link to={"/"}>
                        <a className="text-secondary fw-bold">
                            Frecipe
                        </a>
                    </Link>
                    . All Rights Reserved. Designed by{" "}
                    <a className="text-secondary fw-bold">
                        (주)신선유통
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Footer;
