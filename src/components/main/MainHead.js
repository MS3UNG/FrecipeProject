import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

export default function MainHead() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const searchOnChangeHandler = (e) => {
        setSearch(e.target.value);
    }

    const letsGoSearchToEnter = (e) => {
        if (e.key === "Enter") {
            navigate("/recipe/find", {
                state:
                    {search: search}
            })
        }
    }
    const letsGoSearch = () => {
        navigate("/recipe/find", {
            state:
                {search: search}
        });
    }


    return (
        <div className="container-fluid py-5 mb-5 hero-header">
            <div className="container py-5">
                <div className="row g-5 align-items-center">
                    <div className="col-md-12 col-lg-7">
                        <h4 className="mb-3 text-secondary">
                            Fresh Recipe!
                        </h4>
                        <h1 className="mb-5 display-3 text-primary">
                            오늘의 맛있는 한끼는?
                        </h1>
                        <div className="position-relative mx-auto">
                            <input
                                className="form-control border-2 border-secondary w-75 py-3 px-4 rounded-pill"
                                type="text"
                                placeholder="레시피를 검색해보세요."
                                onChange={searchOnChangeHandler}
                                onKeyDown={letsGoSearchToEnter}
                            />
                            <button
                                type="button"
                                className="btn btn-primary border-2 border-secondary py-3 px-4 position-absolute rounded-pill text-white h-100"
                                style={{top: 0, right: "25%"}}
                                onClick={letsGoSearch}
                            >
                                검색하기
                            </button>
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-5">
                        <div
                            id="carouselId"
                            className="carousel slide position-relative"
                            data-bs-ride="carousel"
                        >
                            <div className="carousel-inner" role="listbox">
                                <div className="carousel-item active rounded">
                                    <img
                                        src="/img/hero-img-1.png"
                                        className="img-fluid w-100 h-100 bg-secondary rounded"
                                        style={{filter: "brightness(80%)"}}
                                    />
                                    <Link to={"/recipe/find"}>
                                        <a
                                            className="btn px-4 py-2 text-white rounded"
                                            style={{width: "230px"}}
                                        >
                                            레시피 보러가기
                                        </a>
                                    </Link>
                                </div>
                                <div className="carousel-item rounded">
                                    <img
                                        src="/img/hero-img-2.jpg"
                                        className="img-fluid w-100 h-100 rounded"
                                        style={{filter: "brightness(80%)"}}
                                    />
                                    <Link to={"/shop"}>
                                        <a
                                            className="btn px-4 py-2 text-white rounded"
                                            style={{width:"230px"}}
                                        >
                                            상품 보러가기
                                        </a>
                                    </Link>
                                </div>
                            </div>
                            <button
                                className="carousel-control-prev"
                                type="button"
                                data-bs-target="#carouselId"
                                data-bs-slide="prev"
                            >
                                <span
                                    className="carousel-control-prev-icon"
                                    aria-hidden="true"
                                ></span>
                                <span className="visually-hidden">
                                    Previous
                                </span>
                            </button>
                            <button
                                className="carousel-control-next"
                                type="button"
                                data-bs-target="#carouselId"
                                data-bs-slide="next"
                            >
                                <span
                                    className="carousel-control-next-icon"
                                    aria-hidden="true"
                                ></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
