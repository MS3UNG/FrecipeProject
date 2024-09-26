import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import FindID from "./FindID";

export default function LoginBody(props) {
    const {getParams} = props
    const navigate = useNavigate();
    const [inputId, setInputId] = useState("");
    const [emptyId, setEmptyId] = useState(false)
    const [openIdFind, setOpenIdFind] = useState(false);
    const [openPwFind, setOpenPwFind] = useState(false);
    const [inputPassword, setInputPassword] = useState("");
    const [emptyPassword, setEmptyPassword] = useState(false);

    const getParam = (param)=>{
        const {close} = param
        if(close){
            setOpenIdFind(false)
        }
    }

    const inputIdRef = useRef(null);
    const inputPasswordRef = useRef(null);
    const loginHanlder = async () => {
        if (inputId === "") {
            setEmptyId(true);
            return
        } else {
            setEmptyId(false);
        }

        if (inputPassword === "") {
            setEmptyPassword(true)
            return
        } else {
            setEmptyPassword(false)
        }
        try {
            const res = await axios.post("/login", {
                id: inputId,
                password: inputPassword
            })
            if (res.status === 200) {
                sessionStorage.setItem('token', JSON.stringify(res.data))
                window.alert("로그인 성공")
                getParams({logined:true})
                navigate(-1)
            } else {
                window.alert("입력하신 아이디가 존재하지 않습니다.")
            }
        } catch (err) {
            if (err.response && err.response.data) {
                window.alert(err.response.data);
            } else {
                window.alert("서버 오류가 발생했습니다.");
            }
        }
    }


    useEffect(() => {
        // 네이버 SDK 초기화
        const naverLogin = new window.naver.LoginWithNaverId({
            clientId: "6tu8pUSLrBZkQgBnzQZ5", // 본인의 네이버 클라이언트 ID를 입력하세요
            callbackUrl: "http://localhost:3000/auth/naver", // 콜백 URL을 백엔드로 설정합니다
            isPopup: false,
            loginButton: {color: "green", type: 3, height: "40"},
        });
        naverLogin.init();
    }, []);

    return (
        <div className="d-flex flex-column min-vh-100 bg-light justify-content-center">
            {openIdFind ? <FindID getParam={getParam} />:null}
            <div className="container my-auto">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow-lg border-0 rounded-3">
                            <div className="card-body p-5">
                                <h2 className="text-center mb-4 text-dark">
                                    로그인
                                </h2>
                                <div>
                                    <div className="form-group mb-3">
                                        <label
                                            htmlFor="id"
                                            className="text-dark"
                                        >
                                            아이디
                                        </label>
                                        <input
                                            ref={inputIdRef}
                                            type="text"
                                            className="form-control"
                                            id="id"
                                            value={inputId}
                                            placeholder="아이디 입력"
                                            onChange={(e) => {
                                                setInputId(e.target.value)
                                            }}
                                        />
                                        {emptyId && (
                                            <div className="feedback" style={{color: "red"}}>
                                                아이디를 입력하세요
                                            </div>
                                        )}
                                    </div>
                                    <div className="form-group mb-3">
                                        <label
                                            htmlFor="password"
                                            className="text-dark"
                                        >
                                            비밀번호
                                        </label>
                                        <input
                                            ref={inputPasswordRef}
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            placeholder="비밀번호 입력"
                                            value={inputPassword}
                                            onChange={(e) => {
                                                setInputPassword(e.target.value)
                                            }}
                                        />
                                        {emptyPassword && (
                                            <div className="feedback" style={{color: "red"}}>
                                                비밀번호를 입력하세요
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        type="button"
                                        className="btn btn-primary w-100 mt-3"
                                        onClick={loginHanlder}
                                    >
                                        로그인
                                    </button>
                                    <div className="d-flex justify-content-between mt-3">
                                        <Link to="/signIn">
                                            <a
                                                className="text-decoration-none text-dark"
                                            >
                                                회원가입
                                            </a>
                                        </Link>
                                        <div>
                                            <a
                                                style={{cursor: "pointer"}}
                                                className="text-decoration-none text-dark me-3"
                                                onClick={()=>setOpenIdFind(true)}
                                            >
                                                아이디 찾기
                                            </a>
                                            <a
                                                href="#"
                                                className="text-decoration-none text-dark"
                                                onClick={()=>alert("추후 업데이트 예정입니다.")}
                                            >
                                                비밀번호 찾기
                                            </a>
                                        </div>
                                    </div>
                                    <div className="text-center mt-4">
                                        <div className="text-dark fw-bold">
                                            소셜 로그인
                                        </div>
                                        <div className="d-flex justify-content-center mt-3">
                                            <button
                                                type="button"
                                                className="btn me-2"
                                            >
                                                <img
                                                    src="/img/kakao_login_medium_narrow.png"
                                                    alt="kakao"
                                                    className="social-icon"
                                                />
                                            </button>
                                            <button
                                                type="button"
                                                className="btn"
                                                id="naverIdLogin"
                                            >
                                                네이버로 로그인
                                            </button>
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
