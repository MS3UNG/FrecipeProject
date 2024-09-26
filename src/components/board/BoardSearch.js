import {useCallback, useEffect, useState} from "react";

export default function BoardSearch(props) {
    const {getParam, getSearchParam} = props;
    const [sortValue, setSortValue] = useState(0)
    const [searchType, setSearchType] = useState("t");
    const [search, setSearch] = useState("");
    const sortOnChangeHandler = useCallback((e)=>{
        setSortValue(e.target.value);
    })
    const searchTypeOnChangeHandler = useCallback((e)=>{
        setSearchType(e.target.value);
    })
    const searchOnChangeHandler = useCallback((e) =>{
        setSearch(e.target.value);
    })
    useEffect(() => {
        getParam({sort:sortValue});
    }, [sortValue])
    const sendParam = function(){
        if(search===""|| search===" "){
            alert("검색할 내용을 입력해주세요.")
            return;
        }
        getSearchParam({type:searchType, search:search});
    }

    return (
        <>
            <div className="b-search-container">
                <form className="b-search">
                    <input type="text" style={{border: "solid 1px"}} onChange={searchOnChangeHandler}/>
                    <button type={"button"} style={{marginLeft: "12px"}} onClick={sendParam}>검색</button>
                </form>
                <select className="boardRange" onChange={searchTypeOnChangeHandler}>
                    <option value={"t"}>제목</option>
                    <option value={"c"}>내용</option>
                    <option value={"w"}>작성자</option>
                </select>
                <select className="boardRange" onChange={sortOnChangeHandler}>
                    <option value={"1"}>최신순</option>
                    <option value={"2"}>인기순</option>
                </select>
            </div>
        </>
    );
}
