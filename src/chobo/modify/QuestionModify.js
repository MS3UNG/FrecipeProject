import "../../css/post.css";
import React, {useEffect, useMemo, useRef, useState} from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function ModifyBoard(props) {
    const {getParam, title, content, no} = props
    // 전역변수
    const navigate = useNavigate();
    const quillRef = useRef(null);
    const [value, setValue] = useState(content);
    const [modifyTitle, setModifyTitle] = useState(title);

    const contentOnChangeHandler = (content, delta, source, editor) => {
        setValue(editor.getHTML());
    };
    const titleOnChangeHandler = (e) => {
        setModifyTitle(e.target.value);
    }

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
    const modifyQuestion = async function () {
        if (!setModifyTitle) {
            alert("제목을 입력해주세요.")
            return;
        }
        if (!value) {
            alert("내용을 입력해주세요.")
            return;
        }

        const res = await axios.post("/chobo/modifyQ", {
            title: modifyTitle,
            content: value,
            id: no
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        },)
        alert("정상적으로 수정되었습니다.")
        getParam({open: false})
    }

    return (
        <div className="my-4" style={{width: "65%", margin: "auto"}}>
            <form>
                <div className="form-container my-2">
                    <div className="form-group post">
                        <label style={{width: "100%"}} htmlFor="inputTitle">
                            <input
                                type="text"
                                className="form-control border border-dark-subtle"
                                placeholder="제목을 입력해주세요"
                                maxLength="45"
                                value={modifyTitle}
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
                        onClick={modifyQuestion}
                    >
                        수정
                    </button>
                    <button
                        className="btn border border-secondary rounded-pill px-3 text-primary"
                        type="button"
                        style={{border: "1px solid black"}}
                        onClick={() => navigate("/chobo")}
                    >
                        취소
                    </button>
                </div>
            </form>
        </div>
    );
}
