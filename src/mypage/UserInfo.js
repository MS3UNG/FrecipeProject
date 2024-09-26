import React, {useEffect, useState} from "react";
import axios from "axios";

export default function UserInfo() {
    const [members, setMembers] = useState([])
    const getAllMem = async () => {
        const res = await axios.get("/getAllMem")
        setMembers([...res.data])
    }
    const formatPhoneNumber = (phoneNumber) => {
        if (phoneNumber.length !== 11) return phoneNumber; // 길이가 11이 아니면 그대로 반환
        return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    };
    const updateMemDel = async (no) =>{
        const res = await axios.get("/memDelUp?no="+no)
        getAllMem()
    }
    useEffect(() => {
        getAllMem()
    }, []);

    return (
        <>

            <div className="container profile-container">
                <div className="profile-form-wrapper">
                    <h2 className="mt-3 mb-4 text-center">회원 정보</h2>
                    <div style={{textAlign: "center"}}>
                        <table style={{borderCollapse: 'collapse', width: '100%'}}>
                            <thead>
                            <tr>
                                <th style={{border: '1px solid black', padding: '8px'}}>이름</th>
                                <th style={{border: '1px solid black', padding: '8px'}}>아이디</th>
                                <th style={{border: '1px solid black', padding: '8px'}}>닉네임</th>
                                <th style={{border: '1px solid black', padding: '8px'}}>이메일</th>
                                <th style={{border: '1px solid black', padding: '8px'}}>전화번호</th>
                                <th style={{border: '1px solid black', padding: '8px'}}>활성화</th>
                            </tr>
                            </thead>
                            <tbody>
                            {members.map((v, i) => (
                                <tr key={i}>
                                    <td style={{border: '1px solid black', padding: '8px'}}>{v.name}</td>
                                    <td style={{border: '1px solid black', padding: '8px'}}>{v.id}</td>
                                    <td style={{border: '1px solid black', padding: '8px'}}>{v.nickName}</td>
                                    <td style={{border: '1px solid black', padding: '8px'}}>{v.email}</td>
                                    <td style={{border: '1px solid black', padding: '8px'}}>{formatPhoneNumber(v.phone)}</td>
                                    <td style={v.deleteYN === 'N' ? {
                                        border: '1px solid black',
                                        padding: '8px',
                                        color: "blue",
                                        cursor: "pointer"
                                    } : {
                                        border: '1px solid black',
                                        padding: '8px',
                                        color: "red",
                                        cursor: "pointer"
                                    }} onClick={()=>updateMemDel(v.no)}>{v.deleteYN === 'N' ? "활성화중" : "비활성화"}</td>
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
