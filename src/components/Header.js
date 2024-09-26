import React, {useEffect, useState} from "react";
import Quickmenu from "../quickMenu/Quickmenu";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import {Link, useLocation, useNavigate} from "react-router-dom"; // useNavigate 훅을 사용
import axios from 'axios';

const Header = ({cartItemCount, isAuthenticated, setIsAuthenticated, logined,setLogin}) => {
    const [quote, setQuote] = useState('');
    const [itemCount, setItemCount] = useState(cartItemCount);
    const [role, setRole] = useState(false)
    const [reloading, setReloading] = useState(logined)
    const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수 가져옴

    const fetchQuote = async () => {
        try {
            const response = await axios.get('/api/quote');
            setQuote(response.data);
        } catch (error) {
            console.error('Error fetching quote:', error);
        }
    };

    useEffect(() => {
        const userInfo = JSON.parse(sessionStorage.getItem("token")) || []
        if(userInfo.role!==""){
            setRole(userInfo.role)
        }
        fetchQuote();
    }, []);
    useEffect(() => {
        const userInfo = JSON.parse(sessionStorage.getItem("token")) || []
        if(userInfo.role!==""){
            setRole(userInfo.role)
        }
    }, [logined]);
    useEffect(() => {
        if (cartItemCount >= 0) {
            setItemCount(cartItemCount);
        }
    }, [cartItemCount]);
    useEffect(() => {
        fetchQuote()
    }, [isAuthenticated]);

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        setIsAuthenticated(false);
        setLogin(false)
        navigate("/") // 로그아웃 후 로그인 페이지로 이동
    };

    const openPopup = () => {
        const width = 500;
        const height = 800;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;
        const windowFeatures = `width=${width}, height=${height}, left=${left}, top=${top}`;
        window.open("/dictionary", "_blank", windowFeatures);
    };

    return (
        <>
            <div style={{paddingBottom: "30px"}}>
                <div className="container-fluid fixed-top">
                    <div className="container topbar bg-primary d-none d-lg-block">
                        <div className="d-flex justify-content-between">
                            <div className="top-info ps-2">
                                <small className="me-3">
                                    <i className="fas fa-map-marker-alt me-2 text-secondary"></i>
                                    <a className="text-white">{quote.content}</a>
                                </small>
                            </div>
                            <div className="top-link pe-2">
                                <Link to={"/"}>
                                    <a className="text-white">
                                        <small className="text-white mx-2">
                                            Home
                                        </small>
                                        /
                                    </a>
                                </Link>
                                {isAuthenticated || logined ? (
                                    <a className="text-white" onClick={handleLogout}>
                                        <small className="text-white ms-2" style={{cursor:"pointer"}}>
                                            로그아웃
                                        </small>
                                    </a>
                                ) : (
                                    <Link to={"/login"}>
                                        <a className="text-white">
                                            <small className="text-white ms-2">
                                                로그인
                                            </small>
                                        </a>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="container px-0" style={{paddingBottom: "0"}}>
                        <nav className="navbar navbar-light bg-white navbar-expand-xl">
                            <a className="navbar-brand">
                                <Link to={"/"}>
                                    <img src={"/FrecipeLogo.png"} style={{width:"190px"}}/>
                                </Link>
                            </a>
                            <button
                                className="navbar-toggler py-2 px-3"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#navbarCollapse"
                            >
                                <span className="fa fa-bars text-primary"></span>
                            </button>
                            <div
                                className="collapse navbar-collapse bg-white"
                                id="navbarCollapse"
                            >
                                <div className="navbar-nav mx-auto">
                                    <Link to="/recipe/find">
                                        <div className="nav-item">
                                            <a className="nav-link">레시피</a>
                                        </div>
                                    </Link>
                                    <div className="nav-item dropdown">
                                        <a
                                            className="nav-link dropdown-toggle"
                                            data-bs-toggle="dropdown"
                                            style={{cursor: "pointer"}}
                                        >
                                            초보요리사
                                        </a>
                                        <div className="dropdown-menu m-0 bg-secondary rounded-0">
                                            <Link to={"/recipe/hof"}>
                                                <a className="dropdown-item">명예 레시피</a>
                                            </Link>
                                            <Link to={"/chobo"}>
                                                <a className="dropdown-item">요리 기초</a>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="nav-item dropdown">
                                        <a
                                            className="nav-link dropdown-toggle"
                                            data-bs-toggle="dropdown"
                                            style={{cursor: "pointer"}}
                                        >
                                            나눔터
                                        </a>
                                        <div className="dropdown-menu m-0 bg-secondary rounded-0">
                                            <Link to={"/notice"}>
                                                <a className="dropdown-item">공지사항</a>
                                            </Link>
                                            <Link to={"/board"}>
                                                <a className="dropdown-item">나눔터</a>
                                            </Link>
                                        </div>
                                    </div>
                                    <Link to="/shop">
                                        <div className="nav-item">
                                            <a className="nav-link">스토어</a>
                                        </div>
                                    </Link>
                                    <Link to={"/support"}>
                                        <div className="nav-item dropdown">
                                            <a className="nav-link ">고객센터</a>
                                        </div>
                                    </Link>
                                    <div className="nav-item dropdown">
                                        <Link to={"/refridge"}>
                                            <a
                                                className="nav-link"
                                                style={{cursor: "pointer"}}
                                            >
                                                나의 냉장고
                                                <img
                                                    src="/assets/Icon/refrigerator.png"
                                                    alt="dictionary"
                                                    style={{width: "20px", marginLeft: "5px"}}
                                                />
                                            </a>
                                        </Link>
                                    </div>
                                </div>

                                {isAuthenticated || logined ? (
                                    <div className="d-flex m-3 me-0">
                                        <Link to="/cart">
                                            <a
                                                className="position-relative me-4 my-auto"
                                            >
                                                <i className="fa fa-2x">
                                                    <img
                                                        src="/assets/Icon/addCart.png"
                                                        style={{width: "32px", height: "34px"}}
                                                    ></img>
                                                </i>
                                                <span
                                                    className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1"
                                                    style={{
                                                        top: "-20px",
                                                        left: "15px",
                                                        height: "20px",
                                                        minWidth: "20px",
                                                    }}
                                                >
                                                    {itemCount}
                                                </span>
                                            </a>
                                        </Link>
                                        <Link to={"/mypage"}>
                                            <a className="my-auto">
                                                <i className="fa fa-2x">
                                                    <img
                                                        src="/assets/Icon/account.png"
                                                        style={{
                                                            width: "32px",
                                                            height: "34px",
                                                        }}
                                                    ></img>
                                                </i>
                                            </a>
                                        </Link>
                                        {role==='ADMIN'?<Link to={"/admin"}>
                                            <a className="my-auto">
                                                <i className="fa fa-2x">
                                                    <img
                                                        src="/assets/Icon/admin.png"
                                                        style={{
                                                            width: "35px",
                                                            height: "38px",
                                                            paddingBottom:"3px",
                                                            marginLeft:"3px"
                                                        }}
                                                    ></img>
                                                </i>
                                            </a>
                                        </Link>:null}
                                    </div>
                                ) : (
                                    <div className={"d-flex m-3 me-0"}></div>
                                )}
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            <Quickmenu/>
        </>
    );
};

export default Header;
