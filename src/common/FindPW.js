import {Link} from "react-router-dom";
import React from "react";

export default function FindPW(){
    return (
        <div className="d-flex flex-column min-vh-100 bg-light justify-content-center">
            <div className="container my-auto">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow-lg border-0 rounded-3">
                            <div className="card-body p-5">
                                <h2 className="text-center mb-4 text-dark">
                                    비밀번호 찾기
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
                                                href="#"
                                                className="text-decoration-none text-dark me-3"
                                            >
                                                아이디 찾기
                                            </a>
                                            <a
                                                href="#"
                                                className="text-decoration-none text-dark"
                                            >
                                                비밀번호 찾기
                                            </a>
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