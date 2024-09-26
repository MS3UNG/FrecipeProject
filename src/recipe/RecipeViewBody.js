import {Link, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import ModifyRecipe from "./RecipeModify";

export default function RecipeViewBody() {
    const location = useLocation();
    const navigate = useNavigate();
    const recipeId = parseInt(location.state.id, 10);
    const [modify, setModify] = useState(false);
    const [recipe, setRecipe] = useState("");
    const [userImg, setUserImg] = useState("");
    const [material, setMaterial] = useState([]);
    const [step, setStep] = useState([]);
    const [userId, setUserId] = useState("");
    const [popular, setPopular] = useState("");
    const [userPopular, setUserPopular] = useState(false);

    useEffect(() => {
        const userInfo = JSON.parse(sessionStorage.getItem("token")) || [];
        setUserId(userInfo.id);
    }, []);

    const getRecipe = async () => {
        const res = await axios.get("/recipe/view?id=" + recipeId);
        setRecipe(res.data);
        const res2 = await axios.get("/recipe/userInfo?no=" + recipeId);
        setUserImg(res2.data)
        const res3 = await axios.get("/recipe/stepList?id=" + recipeId);
        setStep(res3.data);

    }
    const getPopular = async () => {
        const res = await axios.get("/like/get?id=" + recipeId);
        setPopular(res.data)
    }
    const updatePopular = async () => {
        const res = await axios.get("/like?id=" + recipeId + "&member=" + userId);
        if (!res.status === 200) {
            alert("잠시 후 다시 시도해주세요.")
        }
        getPopular(); //재조회
        setUserPopular(true);
    }
    const deletePopular = async () => {
        const res = await axios.get("/unLike?id=" + recipeId + "&member=" + userId);
        if (!res.status === 200) {
            alert("잠시 후 다시 시도해주세요.")
        }
        getPopular() //재조회
        setUserPopular(false);
    }
    const userPopularCheck = async () => {
        const res = await axios.get("/like/check?id=" + recipeId + "&member=" + userId);
        if (res.data >= 1) {
            setUserPopular(true)
        } else {
            setUserPopular(false)
        }
    }
    const goPopular = () => {
        if (userPopular) {
            deletePopular()
        } else {
            updatePopular()

        }
    }

    // 삭제
    const deleteRecipe = async function () {
        const res = await axios.get("/recipe/delete?id=" + recipeId)
        alert("정상적으로 삭제되었습니다.")
        navigate("/recipe/find")
    }

    // 수정
    const getparam = (param) => {
        const {} = param
    }

    useEffect(() => {
        getRecipe()
        getPopular()
        userPopularCheck()
    }, [recipeId]);
    useEffect(() => {
        if (recipe.material) {
            const temp = recipe.material.split("[")
            temp.splice(0, 1)
            setMaterial(temp)
        }
    }, [recipe])
    useEffect(() => {
        getPopular()
    }, [userPopular])


    return (
        <>
            {/* 헤더부분 */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">레시피</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item">
                        <Link to={"/recipe/find"}>
                            <a href="#">우리들의 레시피</a>
                        </Link>
                    </li>
                    <li className="breadcrumb-item active text-white">
                        {recipe.name}
                    </li>
                </ol>
            </div>

            {/* 몸통 */}
            <div className="container-fluid py-5">
                {modify ? <ModifyRecipe getParam={getparam} userImg={userImg} userId={userId} recipe={recipe}
                                        step={step}/> : <>
                    {userId === recipe.writer ?
                        <div className="container b-util2 d-flex justify-content-end"
                             style={{margin: "0 auto", padding: "0 0"}}>
                            <button className="b-Btn" onClick={() => setModify(true)}>수정</button>
                            <button className="b-Btn" onClick={() => deleteRecipe()}>삭제</button>
                        </div> : null}
                    <div className="container rv-container pt-5 mb-5">
                        <div className="row">
                            <div className="col-7">
                                <div className="d-flex justify-content-center">
                                    <img src={recipe.fileFrontPath} className="rc-mImg"/>
                                </div>
                                <div className="text-center">
                                    <h4>{recipe.name}</h4>
                                    <p>{recipe.intro}</p>
                                </div>
                            </div>
                            <div className="col-5">
                                <div className="rc-mateInfo">
                                    <h5>재료</h5>
                                    <div>
                                        <table>
                                            <tbody>
                                            {material.map((v, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <th>[{v}</th>
                                                    </tr>
                                                )
                                            })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="rc-mateInfo">
                                    <h5>정보</h5>
                                    <div className="text-center my-2">
                                        <img src={userImg.fileFrontPath} className="rc-wtP"/>
                                        작성자: {recipe.writer}
                                    </div>
                                    <div className="d-flex justify-content-center row">
                                        <div className="col-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 640 512"
                                            >
                                                <path
                                                    d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z"/>
                                            </svg>
                                            {recipe.peoples}
                                        </div>
                                        <div className="col-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 512 512"
                                            >
                                                <path
                                                    d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/>
                                            </svg>
                                            {recipe.times}
                                        </div>
                                        <div className="col-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 512 512"
                                            >
                                                <path
                                                    d="M4.1 38.2C1.4 34.2 0 29.4 0 24.6C0 11 11 0 24.6 0H133.9c11.2 0 21.7 5.9 27.4 15.5l68.5 114.1c-48.2 6.1-91.3 28.6-123.4 61.9L4.1 38.2zm503.7 0L405.6 191.5c-32.1-33.3-75.2-55.8-123.4-61.9L350.7 15.5C356.5 5.9 366.9 0 378.1 0H487.4C501 0 512 11 512 24.6c0 4.8-1.4 9.6-4.1 13.6zM80 336a176 176 0 1 1 352 0A176 176 0 1 1 80 336zm184.4-94.9c-3.4-7-13.3-7-16.8 0l-22.4 45.4c-1.4 2.8-4 4.7-7 5.1L168 298.9c-7.7 1.1-10.7 10.5-5.2 16l36.3 35.4c2.2 2.2 3.2 5.2 2.7 8.3l-8.6 49.9c-1.3 7.6 6.7 13.5 13.6 9.9l44.8-23.6c2.7-1.4 6-1.4 8.7 0l44.8 23.6c6.9 3.6 14.9-2.2 13.6-9.9l-8.6-49.9c-.5-3 .5-6.1 2.7-8.3l36.3-35.4c5.6-5.4 2.5-14.8-5.2-16l-50.1-7.3c-3-.4-5.7-2.4-7-5.1l-22.4-45.4z"/>
                                            </svg>
                                            {recipe.levels}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="like-container">
                                {userPopular ?
                                    <button className="like__btn"
                                            onClick={userId===undefined ? () => alert("로그인이 필요한 서비스입니다.") : ()=>goPopular()}>
                                        <span id="icon"><i className="fas fa-thumbs-up"></i></span>
                                        <span id="count"> {popular} </span> Like
                                    </button> : <button className="like__btn"
                                                        onClick={userId===undefined ? () => alert("로그인이 필요한 서비스입니다.") : () => goPopular()}>
                                        <span id="icon"><i className="far fa-thumbs-up"></i></span>
                                        <span id="count"> {popular} </span> Like
                                    </button>}
                            </div>
                        </div>
                    </div>
                    <div className="container rv-container rv-stepC pt-2" style={{border: "none", width: "80%"}}>
                        <h5>요리 과정</h5>
                        {step.map((v, i) => {
                            return (
                                <div className="row rv-process" key={i}>
                                    <span className="col-2">{i + 1}단계</span>
                                    <p className="col-4">
                                        {v.recipeDetail}
                                    </p>
                                    {v.fileFrontPath === "EMPTY" ? null :
                                        <img className="col-6" src={v.fileFrontPath}/>}
                                </div>
                            )
                        })}
                    </div>
                </>}
            </div>
        </>
    );
}
