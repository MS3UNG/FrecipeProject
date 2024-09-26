import React, {useEffect, useState} from 'react';
import Footer from "../components/Footer";
import Header from "../components/Header";
import {Link} from "react-router-dom";

export default function UserPage() {

    return (
        <>

            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">레시피 보기</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item">
                        <a href="#">마이페이지</a>
                    </li>
                    <li className="breadcrumb-item active text-white">레시피 보기</li>
                </ol>
            </div>
            <>
                <div className="container-fluid fruite">
                    <div className="container">
                        <div className="row g-4">
                            <div className="col-lg-12">
                                <div className="row g-4">
                                    <div className="col-lg-3">
                                        <div className="row g-4">
                                            {/* Categories */}
                                            <div className="col-lg-12">
                                                <div className="mb-3">
                                                    <h4>유저 화면</h4>
                                                    <div style={{border: "1px solid black", height: "320px"}}>
                                                        <img src="/img/isNew.png"/>
                                                        <p>유저이름</p>
                                                        <p>작성한 레시피 개수 몇개</p>
                                                        <p>받은 추천수 몇개</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-9" style={{border: "1px solid black"}}>
                                        작성한 레시피
                                        <div className="row user-recipe" style={{margin:"0 auto"}}>
                                            <div className="col-md-3 user-rItem" style={{padding:0}}>
                                                <img src="/img/banner-fruits.jpg"/>
                                                <p className="u-title">레시피이름</p>
                                                <p className="u-intro">레시피 소개</p>
                                                <p className="u-pop">추천수</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>

        </>
    );
}
