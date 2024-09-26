import {Link} from "react-router-dom";
import BoardSearch from "../components/board/BoardSearch";

import {useEffect, useState} from "react";
import axios from "axios";

export default function BoardBody() {
    const [notice, setNotice] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [sort, setSort] = useState("no");
    const [searchType, setSearchType] = useState("");
    const [search, setSearch] = useState("");
    const [totalPage, setTotalPage] = useState(0);
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const userInfo = JSON.parse(sessionStorage.getItem("token")) || [];
        if (userInfo.id) {
            setUserId(userInfo.id);
        }
    }, []);

    const getNoticeList = async function () {
        const res = await axios.get("/notice/list", {
            params: {page, size, sort}
        })
        setNotice(res.data.notices)
        setTotalPage(res.data.totalPage)
    }
    const pageOnChangeHandler = (changePage) => {
        if (changePage > 0 && changePage <= totalPage) {
            setPage(changePage);
        }
    }
    const getPageGroup = (page, totalPage, maxPage = 5) => {
        const currentGroup = Math.floor((page - 1) / maxPage);
        const startPage = currentGroup * maxPage + 1;
        let endPage = startPage + maxPage - 1;
        if (endPage > totalPage) {
            endPage = totalPage;
        }
        return Array.from({length: endPage - startPage + 1}, (_, i) => startPage + i);
    };
    const pageNumbers = getPageGroup(page, totalPage, 5);
    useEffect(() => {
        getNoticeList()
    }, [page, size, sort]);
    useEffect(() => {
        if (search === "") {
            getNoticeList();
        } else {
            getSearchList();
        }
    }, [search, page, size]);

    // 정렬
    const getSortvalue = function (param) {
        const {sort} = param;

        if (sort === "1") {
            setSort("no")
        } else if (sort === "2") {
            setSort("hits")

        }
    }
    const getSearchType = function (param) {
        const {type, search} = param;
        setSearchType(type)
        setSearch(search)
    }
    const getSearchList = async function () {
        try {
            const res = await axios.get("/notice/search", {
                params: {page, size, searchType, search}
            })
            if (res.data.notices.length <= 0) {
                alert("검색결과가 없습니다.")
                return;
            }
            setNotice(res.data.notices)
            setTotalPage(res.data.totalPage)
        } catch (error) {
            alert("입력값에 유효하지 않은 특수문자가 포함되어 있습니다.")
        }
    }

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
                        공지사항
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
                            공지사항 게시판
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
                            {notice.map((v, idx) => {
                                return (
                                    <tr key={idx}>
                                        <td>{v.no}</td>
                                        <td><Link to={`/notice/view`}
                                                  state={{no: v.no}}> {v.title}</Link>
                                        </td>
                                        <td>{v.nickname}</td>
                                        <td>{v.hits}</td>
                                        <td>{v.registerDate.slice(0, 10)}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>

                    {userId === "ms123" || userId === "dmlcjf123" || userId === "shhg60" ? <Link to={"/board/post"}>
                        <button className="b-Btn">글쓰기</button>
                    </Link> : null}
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
    )
        ;
}
