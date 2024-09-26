import {Link, useLocation, useNavigate} from "react-router-dom";
import {useCallback, useEffect, useRef, useState} from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AnswerModify from "./modify/AnswerModify";
import QuestionModify from "./modify/QuestionModify";

export default function SupportView() {
    const location = useLocation();
    const navigate = useNavigate();
    const questionNo = parseInt(location.state.no, 10)
    const comRef = useRef(null);
    const [question, setQuestion] = useState([]);
    const [userId, setUserId] = useState("");
    const [userNickname, setUserNickname] = useState("");
    const [userImg, setUserImg] = useState("");
    const [answer, setAnswer] = useState([]);
    const [modify, setModify] = useState(false);
    const [answerContent, setAnswerContent] = useState("");
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
        getQuestion()
        getAnswerList()
    }, [])

    const getQuestion = async function () {
        const res = await axios.get("/chobo/questionView?id=" + questionNo)
        setQuestion(res.data)
    }
    const changeModify = function () {
        setModify(true);
    }
    const deleteQuestion = async function () {
        const res = await axios.get("/chobo/deleteQ?id=" + questionNo)
        if (res.status === 200) {
            alert("정상적으로 삭제되었습니다.")
        } else {
            alert("잠시 뒤 다시 시도해주세요.")
        }
        navigate("/chobo")
    }
    const getParam = (param) => {
        const {open} = param
        if (!open) {
            setModify(false);
            getQuestion()
        }

    }

    // 댓글 기능
    const answerOnChangeHandler = (e) => {
        setAnswerContent(e.target.value)
    }
    const [openIdx, setOpenIdx] = useState(0);
    const openModifyTab = (idx) => {
        setModifyTab(!modifyTab);
        setOpenIdx(idx);
    }
    const getAnswerList = async function () {
        const res = await axios.get("/chobo/listA?id=" + questionNo);
        setAnswer(res.data);
    }
    const deleteAnswer = async function (no) {
        const res = await axios.get("/chobo/deleteA?id=" + no);
        if (res.status === 200) {
            alert("정상적으로 삭제되었습니다.")
            getAnswerList();
            return;
        } else {
            alert("잠시 뒤 다시 시도해주세요.")
        }
    }
    const registerAnswer = async function () {
        const res = await axios.post("/chobo/registerA", {
            questionNo: questionNo,
            writer: userId,
            nickname: userNickname,
            content: answerContent
        })
        if (res.status === 200) {
            alert("정상적으로 등록되었습니다.")
            comRef.current.value = ""
            getAnswerList()
        } else {
            alert("잠시 뒤 다시 시도해주세요.")
        }
    }
    const getCommentParam = (param) => {
        const {open} = param
        if (!open) {
            setModifyTab(false)
            getAnswerList()
        }
    }

    return (
        <>

            {/* 헤더부분 */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">요리기초</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item">
                        <Link to="/chobo">
                            <a href="#">초보요리사</a>
                        </Link>
                    </li>
                    <li className="breadcrumb-item active text-white">질문 있어요</li>
                </ol>
            </div>

            <div className="container-fluid testimonial py-5">

                {modify ?
                    <QuestionModify getParam={getParam} title={question.title} content={question.content}
                                 no={question.id}/> : <>
                        <div className="container" style={{width: "80%"}}>
                            {userId === question.writer ? <div className="b-util2 d-flex justyfy-start">
                                <button className="b-Btn" onClick={() => changeModify()}>수정</button>
                                <button className="b-Btn" onClick={() => deleteQuestion()}>삭제</button>
                            </div> : null}

                            {/* 게시글 */}
                            <div className="text-left bv-title">
                                <Link to={"/chobo"}>
                                    <button className="b-Btn">목록</button>
                                </Link>
                                <h2 className=" mb-2 text-dark sp-title">
                                    <span className="sp-q">Q. </span>{question.title}
                                </h2>
                                <p style={{marginBottom:"10px", marginLeft:"50px"}}
                                    className="bv-writer">작성자: {question.nickname} ({question.writer})</p>
                            </div>
                            <div className="bv-content" dangerouslySetInnerHTML={{__html: question.content}}
                                 style={{minHeight: "230px", fontSize: "21px"}}/>

                            {/* 댓글 */}
                            <div className="bc-container">
                                {/* 댓글리스트 */}
                                <div>
                                    <ul className="bc-list1">
                                        <h4>
                                            답변 <span>{answer.length}</span>개
                                        </h4>
                                        {answer.map((v, i) => {
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
                                                                        {userId === v.writer ?
                                                                            <>
                                                                                <div className="bc-updele col-2"
                                                                                     onClick={() => openModifyTab(i)}>
                                                                                    수정
                                                                                </div>
                                                                                <div className="bc-updele col-2"
                                                                                     onClick={() => deleteAnswer(v.id)}>삭제
                                                                                </div>
                                                                            </> : null}
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            {modifyTab && openIdx === i ?
                                                                <AnswerModify content={v.content} no={v.id}
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
                                                                        {userId === v.writer ?
                                                                            <>
                                                                                <div className="bc-updele col-2"
                                                                                     onClick={() => openModifyTab(i)}>
                                                                                    수정
                                                                                </div>
                                                                                <div className="bc-updele col-2"
                                                                                     onClick={() => deleteAnswer(v.id)}>삭제
                                                                                </div>
                                                                            </> : null}
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            {modifyTab && openIdx === i ?
                                                                <AnswerModify content={v.content} no={v.id}
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
                                                    placeholder={userNickname ? "답변을 남겨보세요." : "로그인이 필요한 서비스입니다."}
                                                    onChange={answerOnChangeHandler}
                                                    ref={comRef}
                                                    disabled={!userNickname}
                                                />
                                                <button type={"button"} onClick={registerAnswer}
                                                        disabled={!userNickname}>등록
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>}

            </div>
        </>
    )
}