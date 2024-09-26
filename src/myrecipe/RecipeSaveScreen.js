import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import "../css/recipe.css";
import {Link} from "react-router-dom";
import {releaseAllKeys} from "@testing-library/user-event/dist/keyboard/keyboardImplementation";

export default function RecipeSaveScreen() {

    const [recipeList, setRecipeList] = useState([])
    const [saveList, setSaveList] = useState(false); // 레시피 리스트
    const [writeList, setWriteList] = useState(true);
    const [userId, setUserId] = useState("");

    // 저장 레시피 보기
    const recipeData = async () => {
        try {
            const response = await axios.get("/Profile/list?member=" + userId);
            setRecipeList([...response.data]);
        } catch (error) {
            console.error("Error fetching quick list:", error);
        }
    };
    // 나의 레시피 보기
    const myRecipeData = async (id) => {
        try {
            const response = await axios.get("/Profile/My?member=" + id);
            setRecipeList([...response.data]);
        } catch (error) {
            console.error("Error fetching quick list:", error);
        }
    };

    // 나의 레시피 화면
    const recipeClickFalse = () => {
        setSaveList(false)
        setWriteList(true)
        myRecipeData(userId)
    }

    // 저장 레시피 화면
    const recipeClickTrue = () => {
        setSaveList(true)
        setWriteList(false)
        recipeData(userId)
    }

    // 삭제
    const deleteRecipe = async (id) => {
        const res = await axios.get("/recipe/delete?id=" + id);
        if (res.status === 200) {
            alert("삭제되었습니다.")
        } else {
            alert("잠시 뒤 다시 시도해주세요.")
        }

    }

    useEffect(() => {
        const userInfo = JSON.parse(sessionStorage.getItem("token")) || [];
        setUserId(userInfo.id);
        myRecipeData(userInfo.id)
    }, []);

    return (
        <div className="container-fluid fruite">
            <div className="container">
                <div className="row g-4">
                    <div className="col-lg-12">
                        <div className="row g-4">
                            <div className="col-lg-3">
                                <div className="row g-4">
                                    {/* Categories */}
                                    <div className="col-lg-12">
                                        <div className="mb-3">
                                            <h4>레시피</h4>
                                            <ul className="list-unstyled fruite-categorie">
                                                <li onClick={recipeClickFalse}>
                                                    <div className="d-flex justify-content-between fruite-name">
                                                        <a href="#" style={writeList ? {color: "orange"} : null}>
                                                            <i className="fas fa-utensils me-2"></i> 나의 레시피
                                                        </a>
                                                    </div>
                                                </li>
                                                <li onClick={recipeClickTrue}>
                                                    <div className="d-flex justify-content-between fruite-name">
                                                        <a href="#" style={saveList ? {color: "orange"} : null}>
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
                                {recipeList.map((v, i) => (
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
                                                        <Link to="/recipe/view" state={{id: v.recipeId}}>
                                                            <h4 className="fw-bold mb-0"
                                                                style={{fontSize: "20px"}}>{v.recipeName}</h4>
                                                        </Link>
                                                    </div>
                                                </a>
                                                <div className="col-6 text-end" style={{width: " 50%"}}>
                                                    <a
                                                        href="#"
                                                        className="btn border border-secondary rounded-pill px-4 py-2 text-primary"
                                                        onClick={() => deleteRecipe(v.recipeId)}
                                                    >
                                                        삭제
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
