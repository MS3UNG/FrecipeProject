import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";

export default function EmailListScreen() {

    const [emailList, setEmailList] = useState([]);  // 이메일 리스트
    const [userId, setUserId] = useState("");
    const [progress, setProgress] = useState(false); // 처리중 카테고리 선택 색상
    const [completed, setCompleted] = useState(false); // 처리 완료 카테고리 선택 색상
    const [filteredList, setFilteredList] = useState([]); // 필터링된 이메일 리스트
    const [filterType, setFilterType] = useState(""); // 필터 타입 (processing 또는 completed)

    const userCheck = useCallback(() => {
        const userInfo = JSON.parse(sessionStorage.getItem("token")) || [];
        setUserId(userInfo.id);
    }, []);

    // 이메일 리스트 가져오기
    const fetchEmailList = async () => {
        try {
            const response = await axios.get("/page/emailList?writer=" + userId);
            setEmailList(response.data);

            // 기본적으로 전체 리스트를 보여줌
            setFilteredList(response.data);
        } catch (error) {
            console.error("Error fetching email list:", error);
        }
    };

    // useEffect를 이용해 유저 체크
    useEffect(() => {
        userCheck();
    }, []);

    // userId 변경 시 이메일 리스트 가져오기
    useEffect(() => {
        fetchEmailList();
    }, [userId]);

    // 처리중 이메일 클릭 시
    const handleProcessingClick = () => {
        const filteredEmails = emailList.filter(email => email.answer === 'no');
        setFilteredList(filteredEmails);
        setProgress(true);
        setCompleted(false);
        setFilterType("processing");
    };

    // 처리완료 이메일 클릭 시
    const handleCompletedClick = () => {
        const filteredEmails = emailList.filter(email => email.answer === 'yes');
        setFilteredList(filteredEmails);
        setProgress(false);
        setCompleted(true);
        setFilterType("completed");
    };

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
                                            <h4>이메일 상태</h4>
                                            <ul className="list-unstyled fruite-categorie">
                                                <li>
                                                    <div className="d-flex justify-content-between fruite-name">
                                                        <a href="#" onClick={handleProcessingClick} style={progress ? {color: "orange"} :null}>
                                                            <i className="fas fa-utensils me-2"></i> 처리중인 이메일
                                                        </a>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="d-flex justify-content-between fruite-name">
                                                        <a href="#" onClick={handleCompletedClick} style={completed ? {color: "orange"} :null}>
                                                            <i className="fas fa-fish me-2"></i> 처리완료 이메일
                                                        </a>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-9" style={{height: "100%"}}>
                                {filteredList.map((v, i) => (
                                    <div className="col-lg-9 mt-3" id="box" key={i}>
                                        <div className="d-flex align-items-center row">
                                            <div
                                                className="d-flex flex-grow-1 align-items-center justify-content-between col-4">
                                                <a href="#">
                                                    <div>
                                                        <h4 className="fw-bold mb-0"
                                                            style={{fontSize: "20px"}}>{v.titleEmail}</h4>
                                                    </div>
                                                </a>
                                                <div className="col-6 text-end" style={{width: " 50%"}}>
                                                    <div>{v.answer === 'no' ? '처리중' : '처리 완료'}</div>
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
