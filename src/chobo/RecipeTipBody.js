import ShopAd from "../components/shop/ShopAd";
import {useState} from "react";
import ChoboQA from "./ChoboQA";
import {Link} from "react-router-dom";

export default function RecipeTipBody() {
    const [cate, setCate] = useState("질문 있어요")

    const getCateList = async (cate) => {

    }

    return (
        <>
            {/* 헤더부분 */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">요리 기초</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item">
                        <a href="#">초보요리사</a>
                    </li>
                    <li className="breadcrumb-item active text-white">
                        {cate}
                    </li>
                </ol>
            </div>

            <div className="container-fluid fruite py-5">
                <div className="container py-5">
                    <div className="row g-4">
                        <div className="col-lg-12">
                            <div className="row g-4">
                                <div className="col-lg-3">
                                    <div className="row g-4">
                                        {/* Categories */}
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <h4>Categories</h4>
                                                <ul className="list-unstyled fruite-categorie">
                                                    <li>
                                                        <div className="d-flex justify-content-between fruite-name">
                                                            <a href="#" onClick={() => setCate("질문 있어요")}>
                                                                <i className="fas fa-apple-alt me-2"></i>
                                                                질문 있어요
                                                            </a>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="d-flex justify-content-between fruite-name">
                                                            <a href="#" onClick={() => setCate("요리 TIP")}>
                                                                <i className="fas fa-apple-alt me-2"></i>
                                                                요리 TIP
                                                            </a>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="d-flex justify-content-between fruite-name">
                                                            <a href="#" onClick={() => setCate("기초부터 천천히")}>
                                                                <i className="fas fa-apple-alt me-2"></i>
                                                                기초부터 천천히
                                                            </a>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        {/* 광고 배너 이미지 */}
                                        <ShopAd/>
                                    </div>
                                </div>

                                <div className="col-lg-9">
                                    <div className="boardContainer container" style={{paddingTop: 0}}>
                                        {/* 정렬박스, 검색기능 */}
                                        {/*<BoardSearch />*/}
                                        {cate === "질문 있어요" ? <ChoboQA/> : cate === "요리 TIP" ?
                                            <ul className="imgb-list row">
                                                <li className="imgb-li col-md-3" style={{marginRight: "8%"}}>
                                                    <Link to="/tip1">
                                                        <div className="thumb">
                                                            <a href="#">
                                                                <img
                                                                    src="https://ppss.kr/wp-content/uploads/2017/11/20171108024157592_IBYNSQCZ.jpg"/>
                                                            </a>
                                                        </div>
                                                    </Link>
                                                    <div className="info">
                                                        <div className="title">
                                                            요리 초보 탈출을 위한 팁 5개!
                                                        </div>
                                                        <div className="writer">
                                                            관리자 (Frecipe)
                                                        </div>
                                                        <div className="popular">
                                                            조회수 2,154
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="imgb-li col-md-3" style={{marginRight: "8%"}}>
                                                    <Link to="/tip1">
                                                        <div className="thumb">
                                                            <a href="#">
                                                                <img
                                                                    src="https://wimg.mk.co.kr/meet/neds/2018/02/image_readtop_2018_103788_15185016653205180.jpg"/>
                                                            </a>
                                                        </div>
                                                    </Link>
                                                    <div className="info">
                                                        <div className="title">
                                                            향신료 완전 정복!
                                                        </div>
                                                        <div className="writer">
                                                            관리자 (Frecipe)
                                                        </div>
                                                        <div className="popular">
                                                            조회수 1,749
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="imgb-li col-md-3">
                                                    <div className="thumb">
                                                        <a href="#">
                                                            <img
                                                                src="https://static.hubzum.zumst.com/hubzum/2018/02/14/09/21aeae60c28f46268e6be882ff4a46a7.jpg"/>
                                                        </a>
                                                    </div>
                                                    <div className="info">
                                                        <div className="title">
                                                            이것만 있으면 나도 소스 마스터!
                                                        </div>
                                                        <div className="writer">
                                                            관리자 (Frecipe)
                                                        </div>
                                                        <div className="popular">
                                                            조회수 1,326
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul> :
                                            <ul className="imgb-list row">
                                                <li className="imgb-li col-md-3" style={{marginRight: "8%"}}>
                                                    <Link to="/tip1">
                                                        <div className="thumb">
                                                            <a href="#">
                                                                <img
                                                                    src="https://lh5.googleusercontent.com/proxy/SB5a6BA03ra1UaEeU3X9FHz0aMGiBVbdJB-SnBBjk2YcfQJzRQjiWuks-gh6qdqxZspzHVsQyL1LCOeqB1Q70BXUzFjigPOmWLCUhOJlj_VDp5yh9gfwG_ByZFc"/>
                                                            </a>
                                                        </div>
                                                    </Link>
                                                    <div className="info">
                                                        <div className="title">
                                                            식재료 썰기 종류 총집합
                                                        </div>
                                                        <div className="writer">
                                                            관리자 (Frecipe)
                                                        </div>
                                                        <div className="popular">
                                                            조회수 732
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="imgb-li col-md-3" style={{marginRight: "8%"}}>
                                                    <Link to="/tip1">
                                                        <div className="thumb">
                                                            <a href="#">
                                                                <img
                                                                    src="https://static.wtable.co.kr/image/production/service/kitchenguidecontent/62741/4aa427a2-551e-409a-9db6-4284a2124ed9.jpg"/>
                                                            </a>
                                                        </div>
                                                    </Link>
                                                    <div className="info">
                                                        <div className="title">
                                                            양념의 종류
                                                        </div>
                                                        <div className="writer">
                                                            관리자 (Frecipe)
                                                        </div>
                                                        <div className="popular">
                                                            조회수 165
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="imgb-li col-md-3">
                                                    <div className="thumb">
                                                        <a href="#">
                                                            <img
                                                                src="https://img.danawa.com/prod_img/500000/495/100/img/13100495_1.jpg?_v=20210402145005"/>
                                                        </a>
                                                    </div>
                                                    <div className="info">
                                                        <div className="title">
                                                            부엌에 갖춰야 할 기본 도구들
                                                        </div>
                                                        <div className="writer">
                                                            관리자 (Frecipe)
                                                        </div>
                                                        <div className="popular">
                                                            조회수 1,001
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
