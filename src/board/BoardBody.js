import {Link} from "react-router-dom";
import BoardSearch from "../components/board/BoardSearch";
import {useEffect, useState} from "react";
import axios from "axios";

export default function BoardBody() {
    const [board, setBoard] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [sort, setSort] = useState("no");
    const [searchType, setSearchType] = useState("");
    const [search, setSearch] = useState("");
    const [totalPage, setTotalPage] = useState(0);

    const getBoardList = async () => {
        const res = await axios.get("/board/list", {
            params: {page, size, sort}
        });
        setBoard(res.data.boards);
        setTotalPage(res.data.totalPage);
    };
    const getSearchList = async () => {
        try {
            const res = await axios.get("/board/search", {
                params: {page, size, searchType, search}
            });
            if (res.data.boards.length <= 0) {
                alert("검색결과가 없습니다.");
                return;
            }
            setBoard(res.data.boards);
            setTotalPage(res.data.totalPage);
        } catch (error) {
            alert("입력값에 유효하지 않은 특수문자가 포함되어 있습니다.");
        }
    };
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

    useEffect(() => {
        getBoardList();
    }, [page, size, sort]);

    useEffect(() => {
        if (search === "") {
            getBoardList();
        } else {
            getSearchList();
        }
    }, [search, page, size]);

    const getSortvalue = (param) => {
        const {sort} = param;
        if (sort === "1") {
            setSort("no");
        } else if (sort === "2") {
            setSort("hits");
        }
    };

    const getSearchType = (param) => {
        const {type, search} = param;
        setSearchType(type);
        setSearch(search);
    };

    const pageNumbers = getPageGroup(page, totalPage, 5);

    return (
        <>
            {/* 헤더부분 */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">나눔터</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item">
                        <a href="#">나눔터</a>
                    </li>
                    <li className="breadcrumb-item active text-white">
                        커뮤니티 게시판
                    </li>
                </ol>
            </div>

            {/* 몸통 */}
            <div className="container-fluid testimonial py-5">
                <div className="container py-5">
                    {/* 게시판 제목 */}
                    <div className="testimonial-header text-center">
                        <h4 className="text-primary">Frecipe</h4>
                        <h1 className="display-5 mb-5 text-dark">
                            커뮤니티 게시판
                        </h1>
                    </div>

                    <div className="boardContainer">
                        {/* 정렬박스, 검색기능 */}
                        <BoardSearch getParam={getSortvalue} getSearchParam={getSearchType}/>

                        <table className="boardLayout">
                            <thead className="boardThead">
                            <tr>
                                <th>번호</th>
                                <th>제목</th>
                                <th>작성자</th>
                                <th>조회수</th>
                                <th>작성일</th>
                            </tr>
                            </thead>
                            <tbody>
                            {board.map((v, idx) => {
                                return (
                                    <tr key={idx}>
                                        <td>{v.no}</td>
                                        <td><Link to={`/board/view`}
                                                  state={{no: v.no}}>[{v.category === 1 ? "잡담" : v.category === 2 ? "나눔해요" : "오늘의 메뉴"}] {v.title}
                                            {v.commentCount === 0 ? null :
                                                <span className="b-comcount"> [{v.commentCount}]</span>}
                                            {v.new? <img className="isNew" src="/img/isNew.png"/>:null}
                                        </Link></td>
                                        <td>{v.nickname}</td>
                                        <td>{v.hits}</td>
                                        <td>{v.registerDate.slice(0, 10)}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>

                    <Link to={"/board/post"}>
                        <button className="b-Btn">글쓰기</button>
                    </Link>
                </div>


                <div className="b-pagination">
                    {page <= 1 ? null : (
                        <>
                            <button className={"b-lastBtn"} onClick={() => pageOnChangeHandler(1)}>&lt;&lt;</button>
                            <button className={"b-npBtn"} onClick={() => pageOnChangeHandler(page - 1)}>&lt;</button>
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
                            <button className={"b-npBtn"} onClick={() => pageOnChangeHandler(page + 1)}>&gt;</button>
                            <button className={"b-lastBtn"}
                                    onClick={() => pageOnChangeHandler(totalPage)}>&gt;&gt;</button>
                        </>
                    ) : null}
                </div>
            </div>
        </>
    );
}
