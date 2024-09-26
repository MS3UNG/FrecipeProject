import {useCallback, useEffect, useState} from "react";
import "../css/customStyle.css"
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {register} from "swiper/element";

const exArr = [
    "예) 고기가 반쯤 익었을 때 양파를 넣어 함께 볶아요.",
    "예) 감자가 다 익었으면 물을 붓고 20분간 끓여주세요.",
    "예) 소고기의 기름기를 제거하고 약불에 천천히 구워주세요.",
    "예) 물이 팔팔 끓으면 소금 2스푼을 넣고 저어주세요.",
    "예) 설탕을 2스푼 넣은 후 늘러붙지 않게 계속 저어주세요.",
    "예) 양배추의 겉을 깔끔히 제거하고 4등분 해주세요.",
    "예) 감자를 깎아서 깍둑썰고, 찬물에 잠시 담궈주세요.",
    "예) 통깨를 뿌려 마무리해요.",
    "예) 오이를 얇게 져며 찬물에 잠시 담궈둬요",
    "예) 계란 3개를 풀어 소금 두 꼬집을 넣어줘요.",
];

export default function RecipeRegisterBody(props) {
    const {getParam, userImg, userId, recipe, step} = props
    const navigate = useNavigate()
    const [processList, setProcessList] = useState(step);
    const [name, setName] = useState(recipe.name)
    const [intro, setIntro] = useState(recipe.intro)
    const [sort, setSort] = useState(recipe.sort)
    const [state, setState] = useState("")
    const [material, setMaterial] = useState("")
    const [people, setPeople] = useState("")
    const [time, setTime] = useState("")
    const [level, setLevel] = useState("")
    const [materialInfo, setMaterialInfo] = useState(recipe.material)
    const [mainImg, setMainImg] = useState(recipe.fileNo)
    const [recipeInfo, setRecipeInfo] = useState("")
    const [saveInfo, setSaveInfo] = useState(false)
    const [imgChange, setImgChange] = useState(false)
    const [stepIdx, setStepIdx] = useState(0)

    const getCodeList = async () => {
        const res = await axios.get("/recipe/codeList?id=" + recipe.id)
        setMaterial(res.data[0].materialCategory)
        setState(res.data[0].stateCategory)
        setSort(res.data[0].sortCategory)
        setTime(res.data[0].time)
        setLevel(res.data[0].level)
        setPeople(res.data[0].people)
    }

    // 레시피 정보들 관리
    const nameOnChangeHandler = (e) => {
        setName(e.target.value)
    }
    const introOnChangeHandler = (e) => {
        setIntro(e.target.value)
    }
    const sortOnChangeHandler = (e) => {
        setSort(e.target.value)
    }
    const stateOnChangeHandler = (e) => {
        setState(e.target.value)
    }
    const materialOnChangeHandler = (e) => {
        setMaterial(e.target.value)
    }
    const peopleOnChangeHandler = (e) => {
        setPeople(e.target.value)
    }
    const timeOnChangeHandler = (e) => {
        setTime(e.target.value)
    }
    const levelOnChangeHandler = (e) => {
        setLevel(e.target.value)
    }
    const materialInfoOnChangeHandler = (e) => {
        setMaterialInfo(e.target.value)
    }
    const mainImgOnChangeHandler = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            const res = await axios.post("/modify/file", formData)
            setMainImg(res.data)
            setImgChange(true)
        }
    }

    // 저장
    const saveRecipe = () => {
        setRecipeInfo({
            name: name,
            intro: intro,
            sortCategory: sort,
            stateCategory: state,
            materialCategory: material,
            people: people,
            time: time,
            level: level,
            material: materialInfo,
        })
    }
    useEffect(() => {
        saveRecipe()
    }, [saveInfo]);

    const handleProcessAdd = function (idx) {
        if (processList.length > 9) {
            alert("요리 과정은 최대 10개까지만 등록할 수 있습니다.");
            return;
        }
        setProcessList([...processList, {recipeDetail: "", file: ""}]);
    };
    const handleProcessRemove = function (idx) {
        const tempList = [...processList];
        tempList[idx].deleteYn = 'Y'
        setProcessList([...tempList]);
    };
    const processContentOnChangeHandler = async function (idx, evt) {
        let stepContent;
        let stepImg;
        const list = processList || []
        if (evt.target.name === "proContent") {
            stepContent = evt.target.value
            list[idx] = {
                recipeDetail: stepContent,
                fileNo: processList[idx].fileNo,
                fileFrontPath: processList[idx].fileFrontPath,
                step: processList[idx].step,
                id: processList[idx].id,
                recipeId: processList[idx].recipeId,
                deleteYn: processList[idx].deleteYn
            };
            setProcessList([...list])
        }
        if (evt.target.name === "proImg") {
            stepImg = evt.target.files[0]
            if (stepImg) {
                let formData = new FormData();
                formData.append("file", stepImg);
                const res = await axios.post("/modify/file", formData)
                list[stepIdx] = {
                    recipeDetail: processList[stepIdx].recipeDetail,
                    fileNo: res.data.id,
                    fileFrontPath: res.data.fileFrontPath,
                    step: processList[stepIdx].step,
                    id: processList[stepIdx].id,
                    recipeId: processList[stepIdx].recipeId,
                    deleteYn: processList[stepIdx].deleteYn
                }
                setProcessList([...list])
            }

        }

    }
    const cancelRegister = useCallback(function () {
        navigate("/recipe/find")
    }, []);

    const registerAll = async function (publicYN) {
        const fileList = []
        const stepList = []

        // 전달하는 data값 모두 동일하나, mainImg변경 했느냐/안했느냐에서 데이터 가져가는 방식만 다름
        // 나머지 전부 동일.
        if (imgChange) {
            const res2 = await axios.post("/recipe/modify", {
                id: recipe.id,
                writer: recipe.writer,
                name: name,
                intro: intro,
                sortCategory: sort,
                stateCategory: state,
                materialCategory: material,
                people: people,
                time: time,
                level: level,
                material: materialInfo,
                fileNo: mainImg.id,
                publicYn: publicYN
            })
        } else {
            const res2 = await axios.post("/recipe/modify", {
                id: recipe.id,
                writer: recipe.writer,
                name: name,
                intro: intro,
                sortCategory: sort,
                stateCategory: state,
                materialCategory: material,
                people: people,
                time: time,
                level: level,
                material: materialInfo,
                fileNo: mainImg,
                publicYn: publicYN
            })
        }

        const res3 = await axios.post("/recipe/modifyStep", processList)
        if (res3.status === 200) {
            alert("정상적으로 수정되었습니다.")
            navigate("/recipe/find")
        }
    }
    useEffect(() => {
        getCodeList()
    }, [name]);

    return (
        <>
            <div className="container-fluid ">
                <div className="container py-5 rc-c">
                    {/* 레시피 기본정보 등록 */}
                    <form id="recipeRegi" name="regiReciFrm" method="post">
                        <div className="rc-container row">
                            <div className="col-6">
                                <h5>레시피 등록</h5>
                                <div className="rc-frco">
                                    <div className="row">
                                        <p className="col-2">레시피 이름</p>
                                        <input
                                            value={name}
                                            className="col-5"
                                            type="text"
                                            name="name"
                                            placeholder="예) 만능 고추참치양념장"
                                            onChange={nameOnChangeHandler}
                                            disabled={saveInfo}
                                            style={{height: "45px"}}
                                        />
                                    </div>
                                    <div className="row">
                                        <p className="col-2">요리 소개</p>
                                        <textarea
                                            value={intro}
                                            name="intro"
                                            className="col-6 rc-intro"
                                            placeholder="예) 참치 2캔으로 일주일치 반찬 뚝딱! "
                                            onChange={introOnChangeHandler}
                                            disabled={saveInfo}
                                        />
                                    </div>

                                    {/* 카테고리 */}
                                    <div className="row">
                                        <p className="col-2">카테고리</p>
                                        <select className="col-2" value={sort} name="sort"
                                                onChange={sortOnChangeHandler}
                                                disabled={saveInfo}>
                                            <option value={"0"}>종류별</option>
                                            <option value={"11"}>밑반찬</option>
                                            <option value={"12"}>
                                                메인요리
                                            </option>
                                            <option value={"13"}>
                                                국/탕/찌개
                                            </option>
                                            <option value={"14"}>
                                                밥/죽/떡
                                            </option>
                                            <option value={"15"}>
                                                양념/소스/잼
                                            </option>
                                            <option value={"16"}>양식</option>
                                            <option value={"17"}>중식</option>
                                            <option value={"18"}>일식</option>
                                            <option value={"19"}>디저트</option>
                                            <option value={"20"}>
                                                차/음료
                                            </option>
                                            <option value={"80"}>기타</option>
                                        </select>
                                        <select className="col-2" value={state} name="state"
                                                onChange={stateOnChangeHandler}
                                                disabled={saveInfo}>
                                            <option value={"0"}>상황별</option>
                                            <option value={"21"}>일상</option>
                                            <option value={"22"}>손님접대</option>
                                            <option value={"23"}>안주/야식</option>
                                            <option value={"24"}>
                                                다이어트
                                            </option>
                                            <option value={"25"}>간식</option>
                                            <option value={"26"}>영양식</option>
                                            <option value={"27"}>이유식</option>
                                            <option value={"28"}>명절</option>
                                            <option value={"80"}>기타</option>
                                        </select>
                                        <select
                                            className="col-2"
                                            value={material}
                                            name="material"
                                            onChange={materialOnChangeHandler}
                                            disabled={saveInfo}
                                        >
                                            <option value={"0"}>재료별</option>
                                            <option value={"31"}>육류</option>
                                            <option value={"32"}>
                                                해물/건어물류
                                            </option>
                                            <option value={"33"}>채소류</option>
                                            <option value={"34"}>
                                                달걀/유제품
                                            </option>
                                            <option value={"35"}>
                                                가공식품/빵류
                                            </option>
                                            <option value={"36"}>
                                                쌀/밀가루
                                            </option>
                                            <option value={"37"}>과일류</option>
                                            <option value={"38"}>버섯류</option>
                                            <option value={"39"}>
                                                콩/견과/곡류
                                            </option>
                                            <option value={"80"}>기타</option>
                                        </select>
                                    </div>
                                    {/* 요리정보 */}
                                    <div className="row rpinfo">
                                        <p className="col-2">요리 정보</p>
                                        <div className="col-2">
                                            <select name="people" value={people} onChange={peopleOnChangeHandler}
                                                    disabled={saveInfo}>
                                                <option value={"0"}>
                                                    인원
                                                </option>
                                                <option value={"41"}>
                                                    1인분
                                                </option>
                                                <option value={"42"}>
                                                    2인분
                                                </option>
                                                <option value={"43"}>
                                                    3인분
                                                </option>
                                                <option value={"44"}>
                                                    4인분
                                                </option>
                                                <option value={"45"}>
                                                    5인분 이상
                                                </option>
                                            </select>
                                        </div>
                                        <div className="col-2">
                                            <select name="time" value={time} onChange={timeOnChangeHandler}
                                                    disabled={saveInfo}>
                                                <option value={"0"}>
                                                    시간
                                                </option>
                                                <option value={"55"}>
                                                    5분이내
                                                </option>
                                                <option value={"510"}>
                                                    10분이내
                                                </option>
                                                <option value={"515"}>
                                                    15분이내
                                                </option>
                                                <option value={"520"}>
                                                    20분이내
                                                </option>
                                                <option value={"530"}>
                                                    30분이내
                                                </option>
                                                <option value={"560"}>
                                                    60분이내
                                                </option>
                                                <option value={"570"}>
                                                    60분이상
                                                </option>
                                            </select>
                                        </div>
                                        <div className="col-2">
                                            <select name="level" value={level} onChange={levelOnChangeHandler}
                                                    disabled={saveInfo}>
                                                <option value={"0"}>
                                                    난이도
                                                </option>
                                                <option value={"61"}>
                                                    누구나
                                                </option>
                                                <option value={"62"}>
                                                    초급
                                                </option>
                                                <option value={"63"}>
                                                    중급
                                                </option>
                                                <option value={"64"}>
                                                    고급
                                                </option>
                                                <option value={"65"}>
                                                    셰프급
                                                </option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <p className="col-2">대표 사진</p>
                                        <img src={imgChange ? mainImg.fileFrontPath : recipe.fileFrontPath}
                                             style={{width: '30%'}}/>
                                        <input type={"file"} id="mainImgInput" disabled={saveInfo}
                                               onChange={mainImgOnChangeHandler} style={{display: "none"}}/>
                                        <label htmlFor="mainImgInput" className={"b-Btn col-6"}
                                               aria-disabled={saveInfo}
                                               style={{height: "40px", width: "25%"}}>사진 변경</label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <h5>재료 등록</h5>
                                <div className="rc-mtco">
                                    <p>
                                        ※ 재료 및 양념, 소스 등을 구분할 경우 "[
                                        ]"
                                        <strong> 대괄호를 사용</strong>
                                        <br/>
                                        예&#41; [양념] 고추장 1T, 통깨 1t, 설탕
                                        2t
                                        <br/>
                                        [스테이크 재료] 돼지고기 500g, 양파
                                        1/2개, 간장
                                    </p>
                                    <textarea
                                        cols={60}
                                        rows={5}
                                        value={materialInfo}
                                        name="materialInfo"
                                        placeholder="예) [양념] 고추장 1T, 통깨 1t, 설탕 2t
                                [스테이크 재료] 돼지고기 500g, 양파 1/2개, 간장"
                                        onChange={materialInfoOnChangeHandler}
                                        disabled={saveInfo}
                                    />
                                </div>
                                <div className="d-flex justify-content-end"
                                     style={{margin: "2%", marginRight: "10%"}}>
                                    <button type={"button"} className="b-Btn"
                                            onClick={() => setSaveInfo((e) => !e)}>레시피
                                        저장
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="rc-container row" style={{marginTop: "3%"}}>
                            <h5>요리 과정 등록</h5>
                            <div className="rc-mtco">
                                <p>
                                    ※ 요리의 맛이 좌우될 수 있는 중요한 부분은
                                    상세히 적어주세요.
                                    <br/>
                                    예시&#41;
                                    <br/> 10분간 익혀주세요 ▷ 10분간 약한불로
                                    익혀주세요.
                                    <br/>
                                    꿀을 조금 넣어주세요 ▷ 꿀이 없으면, 설탕
                                    1스푼을 넣어주세요.
                                </p>
                            </div>
                            {processList &&
                                processList.map((v, i) => {
                                    return (
                                        <>
                                            {
                                                v.deleteYn === 'N' ? <div key={i}>
                                                    <div className="rp-container row">
                                                        <div className="col-1 step">
                                                            <span>{i + 1} 단계</span>
                                                        </div>
                                                        <div className="col-5">
                                                    <textarea
                                                        id={"process" + v}
                                                        name="proContent"
                                                        placeholder={exArr[i]}
                                                        onChange={(e) => processContentOnChangeHandler(i, e)}
                                                        value={v.recipeDetail}
                                                    />
                                                        </div>
                                                        <div className="col-3">
                                                            <img className="rs-img" src={v.fileFrontPath}/>
                                                            <input
                                                                style={{display: "none"}}
                                                                id={"img" + v}
                                                                name={"proImg"}
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(e) => processContentOnChangeHandler(i, e)}
                                                            />
                                                            <label htmlFor={"img" + v} className={"b-Btn"}
                                                                   onClick={() => setStepIdx(i)}
                                                                   style={{height: "40px", width: "25%"}}>변경</label>
                                                        </div>
                                                        {processList.length > 1 && (
                                                            <div className="col-2">
                                                                <button
                                                                    type="button"
                                                                    className="rp-minus"
                                                                    onClick={() =>
                                                                        handleProcessRemove(
                                                                            i
                                                                        )
                                                                    }
                                                                >
                                                                    <span>-</span> 과정
                                                                    삭제
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div> : null
                                            }
                                        </>
                                    );
                                })}

                            <div className="addRpc">
                                <button
                                    className="addRp"
                                    onClick={handleProcessAdd}
                                    type="button"
                                >
                                    <span>+</span> 요리과정 추가하기
                                </button>
                            </div>
                        </div>
                        <div className="rc-container row d-flex justify-content-center" style={{marginTop: "2%"}}>
                            <button className="col-2 saverp" type="button" onClick={() => registerAll("N")}>
                                수정하기
                            </button>
                            <button className="col-2 saveOrp" type="button"
                                    onClick={() => registerAll("Y")}>
                                수정 후 공개하기
                            </button>
                            <button
                                className="col-2 cancelrp"
                                onClick={cancelRegister}
                                type="button"
                            >
                                취소
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
