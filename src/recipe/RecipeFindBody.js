import {Link, useLocation, useNavigate} from "react-router-dom";
import BoardSearch from "../components/board/BoardSearch";
import axios from "axios";
import {useEffect, useState} from "react";

const sortTag = [
    {name: "전체", value: 0},
    {name: "밑반찬", value: 11},
    {name: "메인요리", value: 12},
    {name: "국/탕/찌개", value: 13},
    {name: "밥/죽/떡", value: 14},
    {name: "양념/소스/잼", value: 15},
    {name: "양식", value: 16},
    {name: "중식", value: 17},
    {name: "일식", value: 18},
    {name: "디저트", value: 19},
    {name: "차/음료", value: 20}
];
const stateTag = [
    {name: "전체", value: 0},
    {name: "일상", value: 21},
    {name: "손님접대", value: 22},
    {name: "안주/야식", value: 23},
    {name: "다이어트", value: 24},
    {name: "간식", value: 25},
    {name: "영양식", value: 26},
    {name: "이유식", value: 27},
    {name: "명절", value: 28}
];
const mateTag = [
    {name: "전체", value: 0},
    {name: "육류", value: 31},
    {name: "해물/건어물류", value: 32},
    {name: "채소류", value: 33},
    {name: "달걀/유제품", value: 34},
    {name: "가공식품/빵류", value: 35},
    {name: "쌀/밀가루", value: 36},
    {name: "과일류", value: 37},
    {name: "버섯류", value: 38},
    {name: "콩/견과/곡류", value: 39}
];
const levelTag = [
    {name: "전체", value: 0},
    {name: "누구나", value: 61},
    {name: "초급", value: 62},
    {name: "중급", value: 63},
    {name: "고급", value: 64},
    {name: "셰프급", value: 65}
];

export default function RecipeFindBody() {
    const location = useLocation();
    const navigate = useNavigate()
    const [searchRecipeWord, setSearchRecipeWord] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(16);
    const [sort, setSort] = useState("no")
    const [totalPage, setTotalPage] = useState(0);
    const [pageNumbers, setPageNumbers] = useState([])
    const [menu, setMenu] = useState("전체")
    const [sortVersion, setSortVersion] = useState("최신순")
    const [cate, setCate] = useState(0)

    const searchWordOnChangeHandler = (e) => {
        setSearchRecipeWord(e.target.value)
    }
    const activeEnter = (e) => {
        if (e.key === "Enter") {
            searchRecipeByWord(searchRecipeWord)
        }
    }
    const getRecipeList = async function (searchNo) {
        const res = await axios.get("/recipe/list", {
            params: {page, size, sort, searchNo}
        });
        setRecipes([...res.data.recipes]);
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
        return Array.from({length: Math.min(endPage - startPage + 1)}, (_, i) => startPage + i);
    };

    // 검색 단어로 찾기
    const searchRecipeByWord = async (search) => {
        const res = await axios.get("/recipe/searchWord", {
            params: {page, size, search}
        })
        if (res.status === 200) {
            setTotalPage(res.data.totalPage)
            setRecipes([...res.data.recipes])
            if (res.data.recipes.length <= 0) {
                alert("검색 결과가 없습니다.")
            }
        } else {
            navigate("/err")
        }
    }

    useEffect(() => {
        // 검색 값 있을 시 세팅
        if (location.state) {
            if (location.state.search) {
                searchRecipeByWord(location.state.search)
                return;
            }
            return;
        }
        // 기본적으로 화면 처음 로딩때 들고오는 레시피 정보들
        getRecipeList(cate)
        setPageNumbers(getPageGroup(page, totalPage, 5))
    }, []);
    useEffect(() => {
        if (location.state) {
            return;
        }
        getRecipeList(cate)
    }, [page, size, sort]);
    useEffect(() => {
        setPageNumbers(getPageGroup(page, totalPage, 5))
    }, [totalPage]);


    return (
        <>
            {/* 헤더부분 */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">
                    우리들의 레시피
                </h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item">
                        <a href="#">레시피</a>
                    </li>
                    <li className="breadcrumb-item active text-white">
                        우리들의 레시피
                    </li>
                </ol>
            </div>

            {/* 몸통 */}
            <div className="container-fluid testimonial py-5">
                <div className="container pt-3">
                    {/* 게시판 제목 */}
                    <div className="testimonial-header text-center">
                        <h2 className="text-primary">오늘 뭐먹지?</h2>
                        <input className="mt-2 text-dark main-s" type="text" placeholder="레시피를 검색해보세요."
                               onChange={searchWordOnChangeHandler} onKeyDown={activeEnter}/>
                        <button className="main-sbtn" type="button"
                                onClick={() => searchRecipeByWord(searchRecipeWord)}>
                            <i className="fa-solid fa-magnifying-glass"
                               style={{color: "white", fontSize: "19px"}}/>
                        </button>
                        <div style={{textAlign: "right"}}>
                            <Link to={"/registerR"}>
                                <button className="b-Btnn" type="button">
                                    레시피 작성
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="boardContainer container">
                        <div className="container tag-container">
                            <table className="recipTag">
                                <tbody>
                                <tr>
                                    <td>종류별</td>
                                    <td>
                                        <div className="reciTagList">
                                            {sortTag.map((v, i) => {
                                                return (
                                                    <button
                                                        key={i}
                                                        style={{color: `${v.name === menu ? '#81c408' : 'black'}`}}
                                                        type="button" onClick={() => {
                                                        setCate(v.value);
                                                        setPage(1);
                                                        setMenu(v.name);
                                                        getRecipeList(v.value);
                                                    }}>{v.name}</button>
                                                )
                                            })}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>상황별</td>
                                    <td>
                                        <div className="reciTagList">
                                            {stateTag.map((v, i) => {
                                                return (
                                                    <button
                                                        key={i}
                                                        style={{color: `${v.name === menu ? '#81c408' : 'black'}`}}
                                                        type="button" onClick={() => {
                                                        setCate(v.value);
                                                        setPage(1);
                                                        setMenu(v.name);
                                                        getRecipeList(v.value);
                                                    }}>{v.name}</button>
                                                )
                                            })}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>재료별</td>
                                    <td>
                                        <div className="reciTagList">
                                            {mateTag.map((v, i) => {
                                                return (
                                                    <button
                                                        key={i}
                                                        style={{color: `${v.name === menu ? '#81c408' : 'black'}`}}
                                                        type="button" onClick={() => {
                                                        setCate(v.value);
                                                        setPage(1);
                                                        setMenu(v.name);
                                                        getRecipeList(v.value);
                                                    }}>{v.name}</button>
                                                )
                                            })}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>난이도</td>
                                    <td>
                                        <div className="reciTagList">
                                            {levelTag.map((v, i) => {
                                                return (
                                                    <button
                                                        key={i}
                                                        style={{color: `${v.name === menu ? '#81c408' : 'black'}`}}
                                                        type="button" onClick={() => {
                                                        setCate(v.value);
                                                        setPage(1);
                                                        setMenu(v.name);
                                                        getRecipeList(v.value);
                                                    }}>{v.name}</button>
                                                )
                                            })}
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="rfBtnC">
                            <button type={"button"} style={sortVersion === "최신순" ? {
                                backgroundColor: "#8eca21",
                                color: "white",
                                border: "none"
                            } : null} onClick={() => {
                                setSortVersion("최신순");
                                setSort("no");
                            }}>최신순
                            </button>
                            <button type={"button"} style={sortVersion === "인기순" ? {
                                backgroundColor: "#8eca21",
                                color: "white",
                                border: "none"
                            } : null} onClick={() => {
                                setSortVersion("인기순");
                                setSort("popular");
                            }}>인기순
                            </button>
                        </div>
                        <div>
                            <ul className="imgb-list row" style={{marginTop: "3%"}}>
                                {recipes.map((v, i) => {
                                    return (
                                        <li className="imgb-li col-md-3" key={i}>
                                            <div className="thumb">
                                                <Link to={"/recipe/view"}
                                                      state={{id: v.id}}>
                                                    <img className="recp-thumb" src={v.fileFrontPath}/>
                                                </Link>
                                            </div>
                                            <div className="info">
                                                <Link to="/recipe/view" state={{id: v.id}} style={{color: "#45595b"}}>
                                                    <div className="title">
                                                        {v.name}
                                                    </div>
                                                </Link>
                                                <div className="writer">{v.nickname} ({v.writer})</div>
                                                <div className="popular">추천 {v.popular}</div>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
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
