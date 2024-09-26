import {useCallback, useEffect, useRef, useState} from "react";
import ReplyModify from "../components/comment/ReplyModify";
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import ModifyBoard from "./modify/ModifyBoard";
import Reply from "../components/comment/Reply";

export default function BoardViewBody() {
    const location = useLocation();
    const navigate = useNavigate();
    const comRef = useRef(null);
    const boardNo = parseInt(location.state.no, 10)
    const [userId, setUserId] = useState("");
    const [userNickname, setUserNickname] = useState("");
    const [userImg, setUserImg] = useState("");
    const [lastBoardNum, setLastBoardNum] = useState(0);
    const [board, setBoard] = useState([]);
    const [showBoardNo, setShowBoardNo] = useState(boardNo)
    const [modify, setModify] = useState(false);
    const [order, setOrder] = useState("");
    const [comment, setComment] = useState([]);
    const [commentContent, setCommentContent] = useState("");
    const [repleTab, setRepleTab] = useState(false);
    const [modifyTab, setModifyTab] = useState(false);

    // 유저 체크
    const userCheck = useCallback(() => {
        const userInfo = JSON.parse(sessionStorage.getItem("token")) || [];
        setUserId(userInfo.id);
        setUserNickname(userInfo.nickName);
        setUserImg(userInfo.fileFrontPath);
    }, [])
    useEffect(() => {
        userCheck()
    }, [])

    // 게시글 기능
    const getBoard = async function () {
        const res = await axios.get("/board/view?no=" + showBoardNo)
        if (res.status === 200) {
            setBoard(res.data.board);
            setLastBoardNum(res.data.lastNum);
        } else {
            alert("잠시 뒤 다시 시도해주세요.")
        }
    }
    const deleteBoard = async function () {
        const res = await axios.get("/board/delete?no=" + board.no)
        if (res.status === 200) {
            alert("정상적으로 삭제되었습니다.")
        } else {
            alert("잠시 뒤 다시 시도해주세요.")
        }
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


    // 댓글 기능
    const commentOnChangeHandler = (e) => {
        setCommentContent(e.target.value)
    }
    const [openIdx, setOpenIdx] = useState(0);
    const openRepleTab = (idx) => {
        if(idx!==openIdx){
            setRepleTab(true);
            setOpenIdx(idx)

            if(modifyTab){
                setModifyTab(false);
            }
            return;
        }
        setRepleTab(!repleTab);
        setOpenIdx(idx);
        if (modifyTab) {
            setModifyTab(false);
        }
    }
    const openModifyTab = (idx) => {
        setModifyTab(!modifyTab);
        setOpenIdx(idx);
        if (repleTab) {
            setRepleTab(false);
        }
    }
    const getCommentList = async function () {
        const res = await axios.get("/comment/list?no=" + showBoardNo);
        setComment(res.data);
    }
    const deleteComment = async function (no) {
        const res = await axios.get("/comment/delete?no=" + no);
        if (res.status === 200) {
            alert("정상적으로 삭제되었습니다.")
            getCommentList();
            return;
        } else {
            alert("잠시 뒤 다시 시도해주세요.")
        }
    }
    const registerComment = async function () {
        const res = await axios.post("/comment/register", {
            boardNo: showBoardNo,
            writer: userId,
            nickname: userNickname,
            content: commentContent
        })
        if (res.status === 200) {
            alert("정상적으로 등록되었습니다.")
            comRef.current.value = ""
            getCommentList()
        } else {
            alert("잠시 뒤 다시 시도해주세요.")
        }
    }
    const getCommentParam = (param) => {
        const {open, reply} = param
        if (reply) {
            setRepleTab(false);
            getCommentList();
            return;
        }
        if (!open) {
            setModifyTab(false)
            getCommentList()
        }
    }
    useEffect(() => {
        getBoard()
        getCommentList()
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
                <h1 className="text-center text-white display-6">게시판</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item">
                        <Link to="/board">
                            <a href="#">나눔터</a>
                        </Link>
                    </li>
                    <li className="breadcrumb-item active text-white">{board.title}</li>
                </ol>
            </div>

            {/* 몸통 */}
            <div className="container-fluid testimonial py-5">

                {modify ?
                    <ModifyBoard getParam={getParam} tag={board.category} title={board.title} content={board.content}
                                 no={board.no}/> : <>
                        <div className="container" style={{width: "80%"}}>
                            {userId === board.writer ? <div className="b-util2 d-flex justyfy-start">
                                <button className="b-Btn" onClick={() => changeModify()}>수정</button>
                                <button className="b-Btn" onClick={() => deleteBoard()}>삭제</button>
                            </div> : null}

                            {showBoardNo <= 1 ? <div className="b-util">
                                <Link to={"/board"}>
                                    <button className="b-Btn">목록</button>
                                </Link>
                                <button className="b-Btn" onClick={() => setOrder("next")}>다음글</button>

                            </div> : lastBoardNum === showBoardNo ? <div className="b-util">
                                <Link to={"/board"}>
                                    <button className="b-Btn">목록</button>
                                </Link>
                                <button className="b-Btn" onClick={() => setOrder("pre")}>이전글</button>
                            </div> : <div className="b-util">
                                <Link to={"/board"}>
                                    <button className="b-Btn">목록</button>
                                </Link>
                                <button className="b-Btn" onClick={() => setOrder("next")}>다음글</button>
                                <button className="b-Btn" onClick={() => setOrder("pre")}>이전글</button>
                            </div>}

                            {/* 게시글 */}
                            <div className="text-left bv-title">
                                <h5 className="text-primary">{board.category === 1 ? "잡담" : board.category === 2 ? "나눔해요" : "오늘의 메뉴"}</h5>
                                <h2 className=" mb-2 text-dark">
                                    {board.title}
                                </h2>
                                <p className="bv-writer">작성자: {board.nickname} ({board.writer})</p>
                                <div className="bv-info">
                                    <span
                                        className="bv-date">{board.registerDate === board.modifyDate ? board.registerDate : board.modifyDate + " (수정됨)"}</span>
                                    <span className="bv-hits">조회 {board.hits}</span>
                                </div>
                            </div>
                            <div className="bv-content" dangerouslySetInnerHTML={{__html: board.content}}/>

                            {/* 댓글 */}
                            <div className="bc-container">
                                {/* 댓글리스트 */}
                                <div>
                                    <ul className="bc-list1">
                                        <h4>
                                            댓글 <span>{comment.length}</span>개
                                        </h4>
                                        {comment.map((v, i) => {
                                            return (
                                                <>
                                                    {v.depth === 0 ?
                                                        <>
                                                            <li className="bc-comment" key={i}>
                                                                <div className="row">
                                                                    <div className="col-1">
                                                                        <img src={v.fileFrontPath}/>
                                                                    </div>
                                                                    <div className="bc-imgn col-10">
                                                                        <div className="bc-writer">
                                                                            {v.nickname} ({v.writer})
                                                                            <span
                                                                                className="bc-date">{v.registerDate === v.modifyDate ? v.registerDate : v.modifyDate + " (수정됨)"}</span>
                                                                        </div>
                                                                        <div className="bc-content">
                                                                            {v.content}
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="bc-util row d-flex justify-content-end">
                                                                        <div className="bc-reply col-2"
                                                                             onClick={() => openRepleTab(i)}>
                                                                            답글쓰기
                                                                        </div>
                                                                        {userId === v.writer ?
                                                                            <>
                                                                                <div className="bc-updele col-2"
                                                                                     onClick={() => openModifyTab(i)}>
                                                                                    수정
                                                                                </div>
                                                                                <div className="bc-updele col-2"
                                                                                     onClick={() => deleteComment(v.no)}>삭제
                                                                                </div>
                                                                            </> : null}
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            {repleTab && openIdx === i ?
                                                                <Reply writer={userId} nickname={userNickname}
                                                                       boardNo={showBoardNo} parent={v.no}
                                                                       getParam={getCommentParam}/> : null}
                                                            {modifyTab && openIdx === i ?
                                                                <ReplyModify content={v.content} no={v.no}
                                                                             getParam={getCommentParam}/> : null}
                                                        </> :
                                                        <>
                                                            <li className="bc-commentR" key={i}>
                                                                <div className="row">
                                                                    <div className="col-1">
                                                                        <img src={v.fileFrontPath}/>
                                                                    </div>
                                                                    <div className="bc-imgn col-10">
                                                                        <div className="bc-writer">
                                                                            {v.nickname} ({v.writer})
                                                                            <span
                                                                                className="bc-date">{v.registerDate}</span>
                                                                        </div>
                                                                        <div className="bc-content">
                                                                            {v.content}
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="bc-util row d-flex justify-content-end">
                                                                        <div className="bc-reply col-2"
                                                                             onClick={() => openRepleTab(i)}>
                                                                            답글쓰기
                                                                        </div>
                                                                        {userId === v.writer ?
                                                                            <>
                                                                                <div className="bc-updele col-2"
                                                                                     onClick={() => openModifyTab(i)}>
                                                                                    수정
                                                                                </div>
                                                                                <div className="bc-updele col-2"
                                                                                     onClick={() => deleteComment(v.no)}>삭제
                                                                                </div>
                                                                            </> : null}
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            {repleTab && openIdx === i ?
                                                                <Reply writer={userId} nickname={userNickname}
                                                                       boardNo={showBoardNo} parent={v.no}
                                                                       getParam={getCommentParam}/> : null}
                                                            {modifyTab && openIdx === i ?
                                                                <ReplyModify content={v.content} no={v.no}
                                                                             getParam={getCommentParam}/> : null}
                                                        </>}
                                                </>
                                            )
                                        })}
                                    < /ul>
                                </div>
                                {/* 댓글 쓰기 */}
                                <div className="bc-register row">
                                    <div className="col-2">
                                        <img src={userImg ? userImg : "/img/board-default-img.png"} alt={"프로필 사진"}/>
                                        <div className="bc-writer">{userNickname ? userNickname : "로그인 필요"}</div>
                                    </div>
                                    <div className="col-10">
                                        <form>
                                            <div className="row">
                                                <textarea
                                                    className="bc-write"
                                                    placeholder={userNickname ? "댓글을 입력해보세요." : "로그인이 필요한 서비스입니다."}
                                                    onChange={commentOnChangeHandler}
                                                    ref={comRef}
                                                    disabled={userNickname ? false : true}
                                                />
                                                <button type={"button"} onClick={registerComment}
                                                        disabled={userNickname ? false : true}>등록
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
        </>
    );
}
