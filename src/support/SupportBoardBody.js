import BoardSearch from "../components/board/BoardSearch";
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const sortTag = [
    {name: "전체"},
    {name: "회원가입/정보"},
    {name: "결제/배송"},
    {name: "교환/반품/환불"},
    {name: "기타"},
]
export default function SupportBoardBody() {
    const [menu, setMenu] = useState("전체");
    const [supports, setSupports] = useState([])

    const getSupportList = async function () {
        const res = await axios.get("/support/list")
        setSupports(res.data)
    }
    const searchSupportList = async function (sort) {
        if(sort === "전체")
        {
            getSupportList();
            return;
        }
        const res = await axios.get("/support/search", {
                params: {sort}
            })
        setSupports(res.data)
    }
    useEffect(() => {
        getSupportList()
    }, []);


    return (
        <>
            {/* 몸통 */}

            <div className="container" style={{width: '70%'}}>
                <table className="sortTag">
                    <tr>
                        <td>
                            <div className="sortTagList">
                                {sortTag.map((v, i) => {
                                    return (
                                        <button
                                            key={i}
                                            style={{color: `${v.name === menu ? '#81c408' : 'black'}`}}
                                            type="button" onClick={() => {
                                                searchSupportList(v.name);
                                            setMenu(v.name);
                                        }}>{v.name}</button>
                                    )
                                })}
                            </div>
                        </td>
                    </tr>
                </table>
                <div className="boardContainer">
                    <table className="supportLayout">
                        <thead className="supportThead">
                        <tr>
                            <th>분류</th>
                            <th>제목</th>
                        </tr>
                        </thead>
                        <tbody>
                        {supports.map((v, i) => {
                            return (
                                <tr key={i}>
                                    <td>{v.sort}</td>
                                    <td>
                                        <Link to="/support/view" state={{no:v.id}}>{v.title}</Link>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
