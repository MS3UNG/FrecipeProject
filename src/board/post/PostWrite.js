import "../../css/post.css";
import React, {useEffect, useMemo, useRef, useState} from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

export default function PostWrite() {
    // 전역변수
    const navigate = useNavigate();
    const quillRef = useRef(null);
    const [value, setValue] = useState("");
    const [tag, setTag] = useState("");
    const [title, setTitle] = useState("");
    const [user, setUser] = useState("");
    const [nickname, setNickname] = useState("");
    const contentOnChangeHandler = (content, delta, source, editor) => {
        setValue(editor.getHTML());
    };
    const tagOnChangeHandler = (e) => {
        setTag(e.target.value);
    }
    const titleOnChangeHandler = (e) => {
        setTitle(e.target.value);
    }
    useEffect(() => {
        const userInfo = JSON.parse(sessionStorage.getItem("token")) || [];
        if (userInfo.length <= 0) {
            alert("로그인이 필요한 서비스입니다.")
            navigate("/login")
            return;
        }
        setNickname(userInfo.nickName);
        setUser(userInfo.id)
    }, []);


    // 이미지 폴더에 저장
    const imageHandler = () => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.addEventListener("change", async () => {
            const file = input.files[0];
            const formData = new FormData();
            formData.append("file", file);

            try {
                const res = await axios.post("/board/img", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                })
                const IMG_URL = res.data.url
                const editor = quillRef.current.getEditor();
                const range = editor.getSelection();
                editor.insertEmbed(range.index, "image", IMG_URL);
            } catch (error) {
                console.log(error)
            }
        })
    }
    // 에디터
    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{header: "1"}, {header: "2"}, {font: []}],
                [{size: []}],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [{list: "ordered"}, {list: "bullet"}, {indent: "-1"}, {indent: "+1"}],
                [{align: []}],
                ["link", "image", "video"],
                [{color: []}, {background: []}],
                [{script: "sub"}, {script: "super"}],
                ["clean"],
            ],
            handlers: {
                image: imageHandler,
            },
        },
    }), []);
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
        "video",
        "color",
        "background",
        "script",
        "clean",
    ];


    // 통신
    const registerBoard = async function () {
        if (!tag) {
            alert("말머리를 선택해주세요.")
            return;
        }
        if (!title) {
            alert("제목을 입력해주세요.")
            return;
        }
        if (!value) {
            alert("내용을 입력해주세요.")
            return;
        }

        const res = await axios.post("/board/register", {
            writer: user,
            nickname: nickname,
            category: tag,
            title: title,
            content: value
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        },)

        alert("정상적으로 등록되었습니다.")
        navigate("/board")
    }

    return (
        <>
            <div className="my-4" style={{width: "65%", margin: "auto"}}>
                <form>
                    <div className="form-container my-2">
                        <div className="form-group">
                            <select
                                className="form-select"
                                aria-label="Default select example"
                                defaultValue=""
                                onChange={tagOnChangeHandler}
                            >
                                <option value="" disabled>
                                    말머리를 선택해 주세요
                                </option>
                                <option value="1">잡담</option>
                                <option value="2">나눔해요</option>
                                <option value="3">오늘의 메뉴</option>
                            </select>
                        </div>
                        <div className="form-group post">
                            <label style={{width: "100%"}} htmlFor="inputTitle">
                                <input
                                    type="text"
                                    className="form-control border border-dark-subtle"
                                    placeholder="제목을 입력해주세요"
                                    maxLength="45"
                                    onChange={titleOnChangeHandler}
                                />
                            </label>
                        </div>
                    </div>

                    <div style={{height: '400px'}}>
                        <ReactQuill
                            value={value}
                            onChange={contentOnChangeHandler}
                            modules={modules}
                            formats={formats}
                            style={{height: "100%"}}
                            ref={quillRef}
                        />
                    </div>
                    <div style={{height: '70px'}}>

                    </div>

                    <div className="text-end">
                        <button
                            className="btn border border-secondary rounded-pill px-3 text-primary mx-2"
                            type="button"
                            style={{border: "1px solid black"}}
                            onClick={() => registerBoard()}
                        >
                            등록
                        </button>
                        <button
                            className="btn border border-secondary rounded-pill px-3 text-primary"
                            type="button"
                            style={{border: "1px solid black"}}
                            onClick={() => navigate("/board")}
                        >
                            취소
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
