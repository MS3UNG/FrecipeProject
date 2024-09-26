import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";


export default function ChoboQA() {
    const [questions, setQuestions] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(15);
    const [sort, setSort] = useState("no");
    const [totalPage, setTotalPage] = useState(0);

    const pageOnChangeHandler = (changePage) => {
        if (changePage > 0 && changePage <= totalPage) {
            setPage(changePage);
        }
    };
    const getPageGroup = (page, totalPage, maxPage = 5) => {
        const currentGroup = Math.floor((page - 1) / maxPage);
        const startPage = currentGroup * maxPage + 1;
        let endPage = startPage + maxPage - 1;
        if (endPage > totalPage) {
            endPage = totalPage;
        }
        return Array.from({length: Math.min(endPage - startPage + 1)}, (_, i) => startPage + i);
    };
    const pageNumbers = getPageGroup(page, totalPage, 5);

    const getQuestionList = async function () {
        const res = await axios.get("/chobo/questionList", {
            params: {page, size, sort}
        });
        setQuestions(res.data.questions);
        setTotalPage(res.data.totalPage)
    }
    useEffect(() => {
        getQuestionList()
    }, []);
    useEffect(() => {
        getQuestionList()
    }, [page,size]);


    return (
        <>
            <div className="container-fluid fruite">
                <div className="container" style={{paddingTop: 0}}>
                    <Link to={"/chobo/qaPost"}>
                        <button className="b-Btn" style={{marginBottom: "4px"}}>글쓰기</button>
                    </Link>
                    <table className="choboLayout">
                        <thead className="choboThead">
                        <tr>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>작성일</th>
                        </tr>
                        </thead>
                        <tbody>
                        {questions.map((v, idx) => {
                            return (
                                <tr key={idx}>
                                    <td><Link to="/chobo/qa" state={{no: v.id}}>{v.title} {v.answerCount === 0 ? null :
                                        <span className="b-comcount"> [{v.answerCount}]</span>}
                                        {v.new? <img className="isNew" src="/img/isNew.png"/>:null}
                                    </Link></td>
                                    <td>
                                        {v.nickname}
                                    </td>
                                    <td>{v.registerDate.slice(0, 10)}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>

                    <div className="b-pagination" style={{marginTop: "15px"}}>
                        {page <= 1 ? null : (
                            <>
                                <button className={"b-lastBtn"} onClick={() => pageOnChangeHandler(1)}>&lt;&lt;</button>
                                <button className={"b-npBtn"}
                                        onClick={() => pageOnChangeHandler(page - 1)}>&lt;</button>
                            </>
                        )}
                        {pageNumbers.map((pageNumber) => (
                            <button key={pageNumber} onClick={() => pageOnChangeHandler(pageNumber)}
                                    disabled={pageNumber === page} className={"b-pageBtn"}>
                                {pageNumber}
                            </button>
                        ))}
                        {page < totalPage ? (
                            <>
                                <button className={"b-npBtn"}
                                        onClick={() => pageOnChangeHandler(page + 1)}>&gt;</button>
                                <button className={"b-lastBtn"}
                                        onClick={() => pageOnChangeHandler(totalPage)}>&gt;&gt;</button>
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
        </>
    )
}