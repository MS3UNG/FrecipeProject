import React, {useEffect, useState} from "react";
import axios from "axios";

export default function UserEmail() {
    const [emails, setEamils] = useState([])
    const getAllMail = async () => {
        const res = await axios.get("/getAllEamil")
        setEamils([...res.data])
    }
    const updateMemDel = async (no) =>{
        const res = await axios.get("/updateEamilAnswer?no="+no)
        getAllMail()
    }
    useEffect(() => {
        getAllMail()
    }, []);

    return (
        <>

            <div className="container profile-container">
                <div className="profile-form-wrapper">
                    <h2 className="mt-3 mb-4 text-center">문의 정보</h2>
                    <div style={{textAlign: "center"}}>
                        <table style={{borderCollapse: 'collapse', width: '100%'}}>
                            <thead>
                            <tr>
                                <th style={{border: '1px solid black', padding: '8px'}}>순번</th>
                                <th style={{border: '1px solid black', padding: '8px'}}>문의 제목</th>
                                <th style={{border: '1px solid black', padding: '8px'}}>작성자</th>
                                <th style={{border: '1px solid black', padding: '8px'}}>문의 내용</th>
                                <th style={{border: '1px solid black', padding: '8px'}}>처리 여부</th>
                            </tr>
                            </thead>
                            <tbody>
                            {emails.map((v, i) => (
                                <tr key={i}>
                                    <td style={{border: '1px solid black', padding: '8px'}}>{v.no}</td>
                                    <td style={{border: '1px solid black', padding: '8px'}}>{v.titleEmail}</td>
                                    <td style={{border: '1px solid black', padding: '8px'}}>{v.writer}</td>
                                    <td style={{border: '1px solid black', padding: '8px'}} dangerouslySetInnerHTML={{__html: v.detail}}></td>
                                    <td style={v.answer === 'yes' ? {
                                        border: '1px solid black',
                                        padding: '8px',
                                        color: "blue",
                                        cursor: "pointer"
                                    } : {
                                        border: '1px solid black',
                                        padding: '8px',
                                        color: "red",
                                        cursor: "pointer"
                                    }} onClick={()=>updateMemDel(v.no, v.answer)}>{v.answer === 'yes' ? "처리 완료" : "처리 필요"}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
