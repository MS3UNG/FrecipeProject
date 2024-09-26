import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export default function UserRecipeInfo() {
    const [recipes, setRecipes] = useState([])
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(14);
    const [totalPage, setTotalPage] = useState(0);
    const getAllMem = async () => {
        const res = await axios.get("/recipe/AllRecipeInfo",{
            params: {page, size}
        })
        setRecipes(res.data.recipes)
        setTotalPage(res.data.totalPage);
    }
    const updateReDel = async (recipeId) => {
        const res = await axios.get("/recipe/updateDel?id=" + recipeId)
        getAllMem()
    }
    const updateRePu = async (recipeId) => {
        const res = await axios.get("/recipe/updatePu?id=" + recipeId)
        getAllMem()
    }
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


    useEffect(() => {
        getAllMem()
    }, []);
    useEffect(() => {
        getAllMem();
    }, [page, size]);

    return (
        <>

            <div className="container profile-container">
                <div className="profile-form-wrapper">
                    <h2 className="mt-3 mb-4 text-center">레시피 정보</h2>
                    <div style={{textAlign: "center"}}>
                        <table style={{borderCollapse: 'collapse', width: '100%'}}>
                            <thead>
                            <tr>
                                <th style={{border: '1px solid black', padding: '8px'}}>이름</th>
                                <th style={{border: '1px solid black', padding: '8px'}}>작성자</th>
                                <th style={{border: '1px solid black', padding: '8px'}}>공개여부</th>
                                <th style={{border: '1px solid black', padding: '8px'}}>삭제여부</th>
                            </tr>
                            </thead>
                            <tbody>
                            {recipes.map((v, i) => (
                                <tr key={i}>

                                    <td style={{border: '1px solid black', padding: '8px'}}><Link to="/recipe/view"
                                                                                                  state={{id: v.id}}
                                                                                                  style={{color: "#332D2D"}}>{v.name}</Link>
                                    </td>

                                    <td style={{border: '1px solid black', padding: '8px'}}>{v.writer}</td>

                                    <td style={v.publicYn === 'Y' ? {
                                        border: '1px solid black',
                                        padding: '8px',
                                        color: "blue",
                                        cursor: "pointer"
                                    } : {
                                        border: '1px solid black',
                                        padding: '8px',
                                        color: "red",
                                        cursor: "pointer"
                                    }} onClick={() => updateRePu(v.id)}>{v.publicYn === 'Y' ? "공개중" : "비공개"}</td>
                                    <td style={v.deleteYn === 'N' ? {
                                        border: '1px solid black',
                                        padding: '8px',
                                        color: "blue",
                                        cursor: "pointer"
                                    } : {
                                        border: '1px solid black',
                                        padding: '8px',
                                        color: "red",
                                        cursor: "pointer"
                                    }} onClick={() => updateReDel(v.id)}>{v.deleteYn === 'N' ? "게시중" : "삭제됨"}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="b-pagination" style={{marginTop:"10px"}}>
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
        </>
    );
}
