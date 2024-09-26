import "../css/recipe.css";
import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";

export default function MyRecipeScreen() {
    // 저장 레시피 보기

    const [myRecipeList, setMyRecipeList] = useState([]);
    const [saveList, setSaveList] = useState(false);
    const [userId, setUserId] = useState("");

    const userCheck = useCallback(() => {
        const userInfo = JSON.parse(sessionStorage.getItem("token")) || [];
        setUserId(userInfo.id);
    }, [])

    // 나의 레시피 보기
    const recipeData = async () => {
        try {
            const response = await axios.get("/Profile/My?member=" + userId);
            setMyRecipeList(response.data);
        } catch (error) {
            console.error("Error fetching quick list:", error);
        }
    };

    useEffect(() => {
        userCheck();
    }, []);

    useEffect(() => {
        recipeData();
    }, [userId]);

    return (
        <div className="container-fluid fruite py-5">
            <div className="container py-5">
                <div className="row g-4">
                    <div className="col-lg-12">
                        <div className="row g-4">
                            <div className="col-lg-3">
                                <div className="row g-4">
                                    {/* Categories */}
                                    <div className="col-lg-12">
                                        <div className="mb-3">
                                            <h4>나의 레시피</h4>
                                            <ul className="list-unstyled fruite-categorie">
                                                <li>
                                                    <div className="d-flex justify-content-between fruite-name">
                                                        <a href="#">
                                                            <i className="fas fa-utensils me-2"></i> 나의 레시피
                                                        </a>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="d-flex justify-content-between fruite-name">
                                                        <a href="#">
                                                            <i className="fas fa-fish me-2"></i> 저장 레시피
                                                        </a>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-9" style={{height: "100%"}}>
                                {myRecipeList.map((v, i) => {
                                    return (<>
                                            <div className="col-lg-9 mt-3" id="box" key={i}>
                                                <div className="d-flex align-items-center row">
                                                    <div className="rounded me-4 col-3" id="area">
                                                        <a href="#">
                                                            <img
                                                                src={v.filePath}
                                                                className="img-fluid rounded"
                                                                alt="Image"
                                                                style={{width: "100%", height: "70px"}}
                                                            />
                                                        </a>
                                                    </div>
                                                    <div
                                                        className="d-flex flex-grow-1 align-items-center justify-content-between col-4">
                                                        <a href="#">
                                                            <div>
                                                                <h4 className="fw-bold mb-0" style={{fontSize: "20px"}}>{v.recipeName}</h4>
                                                            </div>
                                                        </a>
                                                        <div className="col-6 text-end" style={{width:" 50%"}}>
                                                            <a
                                                                href="#"
                                                                className="btn border border-secondary rounded-pill px-4 py-2 text-primary me-2"
                                                            >
                                                                수정
                                                            </a>
                                                            <a
                                                                href="#"
                                                                className="btn border border-secondary rounded-pill px-4 py-2 text-primary"
                                                            >
                                                                삭제
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="col-12">
                            <div
                                className="pagination d-flex justify-content-center mt-5"
                                id="paddLeft"
                            >
                                <a href="#" className="rounded">
                                    &laquo;
                                </a>
                                <a href="#" className="active rounded">
                                    1
                                </a>
                                <a href="#" className="rounded">
                                    2
                                </a>
                                <a href="#" className="rounded">
                                    3
                                </a>
                                <a href="#" className="rounded">
                                    4
                                </a>
                                <a href="#" className="rounded">
                                    5
                                </a>
                                <a href="#" className="rounded">
                                    6
                                </a>
                                <a href="#" className="rounded">
                                    &raquo;
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
