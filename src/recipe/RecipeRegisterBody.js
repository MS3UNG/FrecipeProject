import {useCallback, useEffect, useState} from "react";
import "../css/customStyle.css"
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
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

export default function RecipeRegisterBody() {
    const navigate = useNavigate()
    const [processList, setProcessList] = useState([{recipeDetail: "", file: ""}]);
    const [name, setName] = useState("")
    const [intro, setIntro] = useState("")
    const [sort, setSort] = useState("")
    const [state, setState] = useState("")
    const [material, setMaterial] = useState("")
    const [people, setPeople] = useState("")
    const [time, setTime] = useState("")
    const [level, setLevel] = useState("")
    const [materialInfo, setMaterialInfo] = useState("")
    const [mainImg, setMainImg] = useState("")
    const [recipeInfo, setRecipeInfo] = useState("")
    const [saveInfo, setSaveInfo] = useState(false)
    const [userId, setUserId] = useState("");

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
    const mainImgOnChangeHandler = (e) => {
        setMainImg(e.target.files[0])
    }

    useEffect(() => {
        const userInfo = JSON.parse(sessionStorage.getItem("token")) || []
        if(userInfo.length<=0){
            alert("로그인이 필요한 서비스입니다.")
            navigate("/login")
        }
        setUserId(userInfo.id)
    }, []);

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
        tempList.splice(idx, 1);
        setProcessList([...tempList]);
    };
    const processContentOnChangeHandler = function (idx, evt) {
        let stepContent;
        let stepImg;
        const list = processList || []
        if (evt.target.name === "proContent") {
            stepContent = evt.target.value
            list[idx] = {recipeDetail: stepContent, file: processList[idx].file}
            setProcessList([...list])
        }
        if (evt.target.name === "proImg") {
            stepImg = evt.target.files[0]
            list[idx] = {recipeDetail: processList[idx].recipeDetail, file: stepImg}
            setProcessList([...list])
        }

    }
    const cancelRegister = useCallback(function () {
        navigate("/recipe/find")
    }, []);

    const registerAll = async function (publicYN) {
        const fileList = []
        const stepList = []

        if (publicYN === 'N') {
            if (name === "") {
                alert("레시피 이름을 입력해주세요.")
                return;
            }

            // 1. 대표이미지 파일 먼저 저장 (必)
            // formdata에 파일을 따로 저장 > 전송 > 등록된 파일 PK값을 리턴받아서 res.data에 담음
            const form = new FormData()
            form.append("file", mainImg)
            const res = await axios.post("recipe/file", form)

            const res2 = await axios.post("recipe/registerInfo", {
                writer: userId,
                name: name,
                intro: intro,
                sortCategory: sort,
                stateCategory: state,
                materialCategory: material,
                people: people,
                time: time,
                level: level,
                material: materialInfo,
                fileNo: res.data,
                publicYn: publicYN
            })
        }

        if (publicYN === 'Y') {
            if (name === "") {
                alert("레시피 이름을 입력해주세요.")
                return;
            }
            if (intro === "") {
                alert("레시피 소개를 입력해주세요. ")
                return;
            }
            if (sort === 0) {
                alert("종류 카테고리를 선택해주세요.")
                return;
            }
            if (state === 0) {
                alert("상황 카테고리를 선택해주세요.")
                return;
            }
            if (material === 0) {
                alert("재료 카테고리를 선택해주세요.")
                return;
            }
            if (people === 0) {
                alert("인원 카테고리를 선택해주세요.")
                return;
            }
            if (time === 0) {
                alert("시간 카테고리를 선택해주세요.")
                return;
            }
            if (level === 0) {
                alert("난이도 카테고리를 선택해주세요.")
                return;
            }
            if (mainImg === "") {
                alert("대표 사진을 입력해주세요.")
                return;
            }
            if (materialInfo === 0) {
                alert("재료를 입력해주세요.")
                return;
            }
            if (processList.length < 1) {
                alert("하나 이상의 요리 과정을 등록해주세요.")
                return;
            }

            // 1. 대표이미지 파일 먼저 저장 (必)
            // formdata에 파일을 따로 저장 > 전송 > 등록된 파일 PK값을 리턴받아서 res.data에 담음
            const form = new FormData()
            form.append("file", mainImg)
            const res = await axios.post("recipe/file", form)

            // 2. 대표이미지 파일 PK(res.data)를 같이 넘기면서 레시피 정보 저장
            // 단순 저장은 name만 必, 저장 후 공개하기 누를 경우 전부 null값 테스트
            // registerAll() parameter로 받은 값에 따라 분리
            // 파일 PK로 등록된 레시피 정보값은 레시피 정보 PK값을 반환 > res2.data
            if (res.status === 200) {
                const res2 = await axios.post("recipe/registerInfo", {
                    writer: userId,
                    name: name,
                    intro: intro,
                    sortCategory: sort,
                    stateCategory: state,
                    materialCategory: material,
                    people: people,
                    time: time,
                    level: level,
                    material: materialInfo,
                    fileNo: res.data,
                    publicYn: publicYN
                })
                processList.map((v, i) => {
                    fileList.push(v.file);
                    stepList.push(v.recipeDetail);
                })
                const formData = new FormData()
                for (let i = 0; i < fileList.length; i++) {
                    if (fileList[i]) {
                        formData.append(`${stepList[i]}`, fileList[i])
                    } else {
                        formData.append(`${stepList[i]}`, new Blob(), "empty")
                    }
                }
                formData.append("recipeId", res2.data)

                // 3. 과정 사진과 내용을 한꺼번에 넘김.
                // 사진이 없는 과정의 경우 Blob 객체 이름을 empty로 생성해서 넘겨줌
                // controller에서 empty여부 판단, 없을 경우 fileService 사용 不
                // 레시피 정보 PK값으로 해당 레시피 과정으로 등록됨 > 문제 없이 등록될 경우 alert > navigate
                if (res2.status === 200) {
                    const res3 = await axios.post("recipe/registerStep", formData)
                    if (res3.status === 200) {
                        alert("정상적으로 등록되었습니다.")
                        navigate("/recipe/find")
                    }
                }
            }
        }
    }
    // const registerAll = async function () {
    //     console.log(mainImg)
    //     // null값 방어
    //     if (saveInfo) {
    //         if (name === "") {
    //             alert("레시피 이름을 입력해주세요.")
    //             return;
    //         }
    //     } else {
    //         alert("레시피를 저장해주세요.")
    //         return;
    //     }
    //     const list = []
    //     processList.map((v, i) => {
    //         list.push({contents: v.recipeDetail, file: {name: v.file?.name, size: v.file?.size}})
    //     })
    //     const res = await axios.post("/recipe/registerInfo", {
    //         // file: mainImg, //이거 따로 넘겨서 처리
    //         info: {...recipeInfo, processList: list}
    //     })
    // }

    return (
        <>
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">
                    레시피 등록하기
                </h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item">
                        <Link to="/recipe/find">
                        <a href="#">레시피</a>
                        </Link>
                    </li>
                    <li className="breadcrumb-item active text-white">
                        레시피 등록하기
                    </li>
                </ol>
            </div>

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
                                        <select className="col-2" name="sort" onChange={sortOnChangeHandler}
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
                                        <select className="col-2" name="state" onChange={stateOnChangeHandler}
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
                                            <select name="people" onChange={peopleOnChangeHandler}
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
                                            <select name="time" onChange={timeOnChangeHandler} disabled={saveInfo}>
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
                                            <select name="level" onChange={levelOnChangeHandler}
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
                                        <input type={"file"} className="col-6" disabled={saveInfo}
                                               onChange={mainImgOnChangeHandler}/>
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
                                        <div key={i}>
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
                                                        value={v.content}
                                                    />
                                                </div>
                                                <div className="col-3">
                                                    <input
                                                        id={"img" + v}
                                                        name={"proImg"}
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => processContentOnChangeHandler(i, e)}
                                                    />
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
                                        </div>
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
                                저장하기
                            </button>
                            <button className="col-2 saveOrp" type="button"
                                    onClick={() => registerAll("Y")}>
                                저장 후 공개하기
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
