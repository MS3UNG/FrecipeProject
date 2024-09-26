import React, {useCallback, useEffect, useState} from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import axios from "axios";
import {useNavigate} from "react-router-dom";


export default function SupportInquiry() {
    const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    const [detail, setDetail] = useState("");
    const [titleEmail, setTitleEmail] = useState("");
    const [authorEmail, setAuthorEmail] = useState("");
    const [userId, setUserId] = useState("");
    const navigate= useNavigate()

    useEffect(() => {
        const userInfo = JSON.parse(sessionStorage.getItem("token")) || [];
        setUserId(userInfo.id);
        setAuthorEmail(userInfo.email);
    }, []);

    const titleOnChangeHandler = useCallback((e) => {
        setTitleEmail(e.target.value);
    }, []);

    const authorOnChangeHandler = useCallback((e) => {
        setAuthorEmail(e.target.value);
    }, []);

    const insertClick = async () => {
        // 사용자 정보 가져오기 (예: 세션에서 가져오기)
        const userInfo = JSON.parse(sessionStorage.getItem("token")) || {};
        const { id } = userInfo; // 여기서 id는 user_id를 의미합니다

        if (titleEmail.trim() === "") {
            alert("제목을 입력해주세요");
            return;
        }

        if (authorEmail.trim() === "" || !emailRegEx.test(authorEmail)) {
            alert("올바른 이메일을 입력해주세요");
            return;
        }

        if (detail.trim() === "") {
            alert("내용을 입력해주세요");
            return;
        }


        // 새로운 항목 객체 생성
        const newItem = {
            titleEmail,
            authorEmail,
            detail,
            writer: id // writer에 user_id를 설정합니다
        };

        try {

            await axios.post("/support/register", newItem);
            alert("정상적으로 등록되었습니다.")
            navigate("/")
        } catch (error) {
            console.error("There was an error inserting the data!", error);
        }
    };


    const handleChange = (content, delta, source, editor) => {
        setDetail(editor.getHTML());
    };

    const modules = {
        toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ size: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
            ],
            [{ align: [] }],
            ["link", "image"],
            ["clean"],
        ],
    };

    const formats = [
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "align",
        "link",
        "image",
        "clean",
    ];

    return (
        <div className="my-4" style={{ width: "65%", margin: "auto" }}>
            <form>
                <div className="form-group">
                    <label style={{ width: "100%" }} htmlFor="inputTitle">
                        <input
                            type="text"
                            className="form-control border border-dark-subtle"
                            placeholder="제목"
                            id="inputTitle"
                            maxLength="45"
                            onChange={titleOnChangeHandler}
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label style={{ width: "100%" }} htmlFor="inputAuthor">
                        <input
                            type="email"
                            className="form-control my-2 border border-dark-subtle"
                            placeholder="작성자 이메일"
                            id="inputAuthor"
                            maxLength="45"
                            value={authorEmail}
                            style={{ width: "100%" }}
                            onChange={authorOnChangeHandler}
                        />
                    </label>
                </div>

                <div>
                    <ReactQuill
                        value={detail}
                        onChange={handleChange}
                        modules={modules}
                        formats={formats}
                        style={{ height: "400px" }}
                    />
                </div>

                <div className="text-end mt-5">
                    <button
                        className="btn border border-secondary rounded-pill px-3 text-primary mx-2"
                        id="writeBtn"
                        type="button"
                        style={{ border: "1px solid black" }}
                        onClick={insertClick}
                    >
                        등록
                    </button>
                    <button
                        className="btn border border-secondary rounded-pill px-3 text-primary"
                        id="cancelBtn"
                        type="button"
                        style={{ border: "1px solid black" }}
                    >
                        취소
                    </button>
                </div>
            </form>
        </div>
    );
}
