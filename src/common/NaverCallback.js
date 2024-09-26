import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const NaverCallback = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const query = new URLSearchParams(location.hash.substring(1));
        const accessToken = query.get('access_token');
        const state = query.get('state');

        if (accessToken && state) {
            axios.post('http://localhost:3000/api/auth/naver', { token: accessToken, state })
                .then(response => {
                    // 로그인 성공 처리 (예: 사용자 정보를 로컬 스토리지에 저장)
                    navigate("/"); // 로그인 후 메인 페이지로 리디렉션
                })
                .catch(error => {
                    console.error("Error:", error);
                    // 로그인 실패 처리
                    navigate("/"); // 로그인 실패 시 로그인 페이지로 리디렉션
                });
        }
    }, [location, navigate]);

    return (
        <div>
            <h2>네이버 로그인 중...</h2>
        </div>
    );
}

export default NaverCallback;
