import {useCallback, useEffect, useRef, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import ModifyBoard from "./modify/ModifyNotice";

export default function BoardViewBody() {
    const location = useLocation();
    const navigate = useNavigate();
    const comRef = useRef(null);
    const boardNo = parseInt(location.state.no, 10)
    const [userId, setUserId] = useState("");
    const [userNickname, setUserNickname] = useState("");
    const [lastBoardNum, setLastBoardNum] = useState(0);
    const [board, setBoard] = useState([]);
    const [showBoardNo, setShowBoardNo] = useState(boardNo)
    const [modify, setModify] = useState(false);
    const [order, setOrder] = useState("");

    // 유저 체크
    const userCheck = useCallback(() => {
        const userInfo = JSON.parse(sessionStorage.getItem("token")) || [];
        setUserId(userInfo.id);
        setUserNickname(userInfo.nickName);
    }, [])
    useEffect(() => {
        userCheck()
    }, [])

    // 게시글 기능
    const getBoard = async function () {
        const res = await axios.get("/notice/view?no=" + showBoardNo)
        setBoard(res.data.notice);
        setLastBoardNum(res.data.lastNum);
    }
    const deleteBoard = async function () {
        const res = await axios.get("/board/delete?no=" + board.no)
        alert("정상적으로 삭제되었습니다.")
        navigate("/board")
    }
    const preNextBoard = async function (order) {
        const res = await axios.get("/board/preNextBoard?no=" + showBoardNo + "&order=" + order);
        setShowBoardNo(res.data)
    }
    const changeModify = function () {
        setModify(true);
    }
    const getParam = (param) => {
        const {open} = param
        if (!open) {
            setModify(false);
            getBoard()
        }

    }

    useEffect(() => {
        getBoard()
    }, [showBoardNo]);
    useEffect(() => {
        if (order === "") {
            return;
        }
        preNextBoard(order)
        setOrder("")
    }, [order]);


    return (
        <>
            {/* 헤더부분 */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">공지사항</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item">
                        <a href="#">나눔터</a>
                    </li>
                    <li className="breadcrumb-item active text-white">공지사항</li>
                </ol>
            </div>

            {/* 몸통 */}
            <div className="container-fluid testimonial py-5">

                {modify ?
                    <ModifyBoard getParam={getParam} title={board.title} content={board.content}
                                 no={board.no}/> : <>
                        <div className="container" style={{width: "80%"}}>
                            {userId === board.writer ? <div className="b-util2 d-flex justyfy-start">
                                <button className="b-Btn" onClick={() => changeModify()}>수정</button>
                                <button className="b-Btn" onClick={() => deleteBoard()}>삭제</button>
                            </div> : null}

                            {showBoardNo <= 1 ? <div className="b-util">
                                <Link to={"/notice"}>
                                    <button className="b-Btn">목록</button>
                                </Link>
                                <button className="b-Btn" onClick={() => setOrder("next")}>다음글</button>

                            </div> : lastBoardNum === showBoardNo ? <div className="b-util">
                                <Link to={"/notice"}>
                                    <button className="b-Btn">목록</button>
                                </Link>
                                <button className="b-Btn" onClick={() => setOrder("pre")}>이전글</button>
                            </div> : <div className="b-util">
                                <Link to={"/notice"}>
                                    <button className="b-Btn">목록</button>
                                </Link>
                                <button className="b-Btn" onClick={() => setOrder("next")}>다음글</button>
                                <button className="b-Btn" onClick={() => setOrder("pre")}>이전글</button>
                            </div>}

                            {/* 게시글 */}
                            <div className="text-left bv-title">
                                <h2 className=" mb-2 text-dark">
                                    {board.title}
                                </h2>
                                <p className="bv-writer">작성자: {board.nickname} ({board.writer})</p>
                                <div className="bv-info">
                                    <span className="bv-date">{board.registerDate}</span>
                                    <span className="bv-hits">조회 {board.hits}</span>
                                </div>
                            </div>
                            <div className="bv-content" dangerouslySetInnerHTML={{__html: board.content}}/>
                        </div>
                    </>
                }
            </div>
        </>
    );
}
