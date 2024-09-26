import {useEffect, useRef, useState} from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import axios from "axios";

const foodEndDate = [
    {name: "요리", value: 5},
    {name: "과일", value: 7},
    {name: "유제품", value: 10},
    {name: "채소", value: 7},
    {name: "고기", value: 5},
    {name: "가공육", value: 20},
    {name: "수산물", value: 3},
    {name: "통조림", value: 60},
    {name: "발효식품", value: 30},
    {name: "음료/주류", value: 0},
    {name: "조미료", value: 0},
    {name: "디저트", value: 0},
    {name: "곡류", value: 90},
    {name: "기타", value: 0},
]

export default function RegridgePlus(props) {
    const {getParam, food,id} = props
    const [user, setUser] = useState(id)
    const [name, setName] = useState(food.name);
    const [sort, setSort] = useState(food.sort);
    const [count, setCount] = useState(food.count);
    const [place, setPlace] = useState(food.place);
    const [placeDetail, setPlaceDetail] = useState(food.placeDetail);
    const [today, setToday] = useState(food.registerDate);
    const [startDate, setStartDate] = useState(food.endDate);
    const [memo, setMemo] = useState(food.memo);
    const dateRef = useRef(null);

    // 핸들러모임
    const sortOnChangeHandler = (e) => {
        setSort(e.target.value)
    }
    const nameOnChangeHandler = (e) => {
        setName(e.target.value)
    }
    const memoOnChangeHandler = (e) => {
        setMemo(e.target.value)
    }
    const countOnChangeHandler = (e) => {
        setCount(e.target.value)
    }
    const placeOnChangeHandler = (e) => {
        setPlace(e.target.value)
    }
    const placeDetailOnChangeHandler = (e) => {
        setPlaceDetail(e.target.value)
    }
    const plusCount = () => {
        setCount(count + 1)
    }
    const minusCount = () => {
        if (count <= 0) {
            alert("0개 이하로 설정할 수 없습니다.")
            return;
        }
        setCount(count - 1)
    }

    // 통신 모음
    const modifyRefridgeThing = async () => {
        if(startDate instanceof Date){
            const res = await axios.post("/refridge/modify", {
                id: food.id,
                user: user,
                name: name,
                sort: sort,
                count: count,
                place: place,
                placeDetail: placeDetail,
                endDate: startDate.getTime(),
                memo: memo,
            })
            getParam({refresh: true})
            return;
        }
        const res = await axios.post("/refridge/modify", {
            id: food.id,
            user: user,
            name: name,
            sort: sort,
            count: count,
            place: place,
            placeDetail: placeDetail,
            endDate: startDate,
            memo: memo,
        })
        getParam({refresh: true})

    }
    const deleteRefridgeThing = async () =>{
        const res = await axios.get("/refridge/delete", {
            params:{id:food.id}
        })
        if(res.status === 200){
            alert("정상적으로 삭제되었습니다.")
        }else{
            alert("잠시 후 다시 시도해주세요.")
        }
        getParam({refresh: true})
    }


    useEffect(() => {
        document.body.style.cssText = `
            position: fixed;
            top: -${window.scrollY}px;
            overflow-y: scroll;
            width: 100%;`;
        return () => {
            const scrollY = document.body.style.top;
            document.body.style.cssText = '';
            window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
        }
    }, []);

    return (
        <>
            <div className="moddd">
                <div className={"frgdCon"}>
                    <form className="rfdgFrm">
                        <label> <span>이름</span>
                            <input type={"text"} placeholder={"상품이름"} onChange={nameOnChangeHandler} value={name}/>
                        </label>
                        <label> <span>분류</span>
                            <select onChange={sortOnChangeHandler} value={sort}>
                                <option value="분류">분류</option>
                                <option value="요리">요리</option>
                                <option value="과일">과일</option>
                                <option value="유제품">유제품</option>
                                <option value="채소">채소</option>
                                <option value="고기">고기</option>
                                <option value="가공육">가공육</option>
                                <option value="수산물">수산물</option>
                                <option value="통조림">통조림</option>
                                <option value="발효식품">발효식품</option>
                                <option value="음료/주류">음료/주류</option>
                                <option value="조미료">조미료</option>
                                <option value="디저트">디저트</option>
                                <option value="곡류">곡류</option>
                                <option value="기타">기타</option>
                            </select>
                        </label>
                        <label> <span>수량</span>
                            <button className="upd" type={"button"} onClick={minusCount}>-</button>
                            <input className="count" type={"number"} onChange={countOnChangeHandler} value={count}/>
                            <button className="upd" type={"button"} onClick={plusCount}>+</button>
                        </label>
                        <label> <span>보관장소</span>
                            <select onChange={placeOnChangeHandler} value={place}>
                                <option value="냉장실">냉장실</option>
                                <option value="냉동실">냉동실</option>
                                <option value="상온">상온</option>
                            </select>
                        </label>
                        {place === "냉장실" ? <label>
                            <span>상세위치</span>
                            <select onChange={placeDetailOnChangeHandler} value={placeDetail}>
                                <option value="냉장칸">냉장칸</option>
                                <option value="야채칸">야채칸</option>
                            </select>
                        </label> : null}
                        <label> <span>보관일</span>
                            <input type={"date"} value={today} disabled/>
                        </label>
                        <label> <span>보관기한</span>
                            <DatePicker
                                dateFormat="yyyy/MM/dd"
                                selected={new Date(startDate)}
                                onChange={(date) => setStartDate(date)}
                            />
                        </label>
                        <textarea placeholder={"메모남기기"} onChange={memoOnChangeHandler} value={memo}/>
                        <div>
                            <button className="fdpcD" type="button" onClick={deleteRefridgeThing}>삭제</button>
                            <button className="fdpc" type="button" onClick={modifyRefridgeThing}>수정</button>
                            <button className="fdpc" type="button" onClick={() => getParam({cancelPlus: true})}>취소
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}