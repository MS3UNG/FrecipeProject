import React, {useState, useEffect, useCallback} from "react";
import axios from "axios";
import "../css/quickmenu.css";

const Quickmenu = () => {
    const [quick, setQuick] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredQuick, setFilteredQuick] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [press, setPress] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [registered, setRegistered] = useState(false);
    const [name, setName] = useState("");
    const [outline, setOutline] = useState("");
    const [conjugation, setConjugation] = useState("");
    const [otherUses, setOtherUses] = useState("");
    const [whetherDelete, setWhetherDelete] = useState("");
    const [userId, setUserId] = useState("");

    const userCheck = useCallback(() => {
        const userInfo = JSON.parse(sessionStorage.getItem("token")) || [];
        setUserId(userInfo.id);
    }, [])

    const fetchData = async () => {
        try {
            const response = await axios.get("/list");
            setQuick(response.data.filter(item => item.whetherDelete !== 'no'));
        } catch (error) {
            console.error("Error fetching quick list:", error);
        }
    };

    useEffect(() => {
        fetchData();
        userCheck();
    }, []);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setFilteredQuick([]);
        setIsEditing(false);
        setHasSearched(false);
    };

    const handleSearchClick = () => {
        if(selectedItem){
            setSelectedItem(false)
        }
        if (!quick || quick.length === 0) {
            setFilteredQuick([]);
            setHasSearched(false);
            return;
        }

        if (searchQuery.trim() === "") {
            setFilteredQuick([]);
            setHasSearched(false);
            return;
        }

        const filtered = quick.filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredQuick(filtered);
        setCurrentPage(1);
        setHasSearched(true);

    };

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setIsEditing(false);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const registeredEditClick = () => {
        setName(searchQuery);
        setSearchQuery("");
        setRegistered(!registered);
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setSelectedItem((prevItem) => ({
            ...prevItem,
            [name]: value,
        }));
    };

    const handleSaveClick = async () => {
        try {
            // 수정된 항목 객체 생성
            const updatedItem = { ...selectedItem, modifier: userId };
            await axios.post(`/update/${selectedItem.no}`, updatedItem);

            // 상태 업데이트
            setQuick((prevQuick) =>
                prevQuick.map((item) =>
                    item.no === selectedItem.no ? updatedItem : item
                )
            );

            // 상태 초기화
            setSelectedItem(null);
            setSearchQuery("");
            setHasSearched(false);
            setFilteredQuick([]);
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating item:", error);
        }
    };

    const deleteSaveClick = async () => {
        try {
            await axios.post(`/delete/${selectedItem.no}`, selectedItem);

            // 항목을 삭제한 후 상태에서 해당 항목 제거
            const updatedQuick = quick.filter(item => item.no !== selectedItem.no);
            setQuick(updatedQuick);

            // 현재 검색어에 맞는 항목만 남기기
            const filtered = updatedQuick.filter((item) =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredQuick(filtered);

            setIsEditing(false);
            setSelectedItem(null);
            setSearchQuery("");
            setHasSearched(false);
            setRegistered(false);
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    const insertClick = async () => {
        // 사용자 정보 가져오기 (예: 세션에서 가져오기)
        const userInfo = JSON.parse(sessionStorage.getItem("token")) || {};
        const { userNickname, id } = userInfo; // 여기서 id는 user_id를 의미합니다

        // 새로운 항목 객체 생성
        const newItem = {
            name,
            outline,
            conjugation,
            otherUses,
            whetherDelete,
            writer: id // writer에 user_id를 설정합니다
        };

        try {
            await axios.post("/insert", newItem);

            // 서버에서 최신 데이터를 다시 가져옴
            const updatedResponse = await axios.get("/list");
            setQuick(updatedResponse.data);

            // 검색어 초기화 및 관련 상태 초기화
            setSearchQuery("");
            setHasSearched(false);
            setFilteredQuick([]);
            setRegistered(false);

            // 입력 필드 초기화
            setName("");
            setOutline("");
            setConjugation("");
            setOtherUses("");
        } catch (error) {
            console.error("There was an error inserting the data!", error);
        }
    };


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredQuick.slice(indexOfFirstItem, indexOfLastItem);

    const handleMoreClick = () => {
        setPress(!press);
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const prevPage = () => {
        const newCurrentPage = Math.max(1, currentPage - maxItemsToShow);
        setCurrentPage(newCurrentPage);
    };

    const nextPage = () => {
        const newCurrentPage = Math.min(totalPages, currentPage + maxItemsToShow);
        setCurrentPage(newCurrentPage);
    };

    const totalPages = Math.ceil(filteredQuick.length / itemsPerPage);

    const pageNumbers = [];
    const maxItemsToShow = 5;
    let startPage = Math.floor((currentPage - 1) / maxItemsToShow) * maxItemsToShow + 1;
    let endPage = Math.min(startPage + maxItemsToShow - 1, totalPages);

    if (endPage - startPage < maxItemsToShow - 1) {
        startPage = Math.max(1, endPage - maxItemsToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <button
                className="floating-button btn-search btn btn-md-square bg-white me-4"
                style={{backgroundColor: "green"}}
                onClick={toggleModal}
            >
                <img src="/assets/Icon/dictionary.png" alt="dictionary"/>
            </button>
            {showModal && (
                <div className="custom-modal">
                    <div className="modal-content">
                        <div style={{textAlign: "right"}}>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={toggleModal}
                                style={{width: "10px", height: "10px"}}
                            ></button>
                        </div>
                        <div className="modal-header" style={{paddingBottom: "6px"}}>
                            <h5 className="modal-title" style={{fontSize: "30px"}}>
                                Dictionary
                            </h5>
                            <div style={{textAlign: "right"}}>
                                <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
                                    <input
                                        className="form-control form-control-sm me-2"
                                        type="search"
                                        placeholder="Search"
                                        aria-label="Search"
                                        style={{height: "20px"}}
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                    />

                                    <button
                                        className="btn btn-outline-success btn-sm"
                                        onClick={handleSearchClick}
                                    >
                                        🔍
                                    </button>
                                </form>
                            </div>
                        </div>

                        <div className="modal-body">
                            {selectedItem ? (
                                <div>
                                    {isEditing ? (
                                        <div>
                                            <div>
                                                <h6>이름</h6>
                                                <input
                                                    className="form-control form-control-sm"
                                                    type="text"
                                                    name="name"
                                                    value={selectedItem.name}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="my-2">
                                                <h6>설명</h6>
                                                <textarea
                                                    className="form-control form-control-sm my-2"
                                                    type="text"
                                                    name="outline"
                                                    value={selectedItem.outline}
                                                    onChange={handleInputChange}
                                                    style={{height: "100px", resize: "none"}}
                                                />
                                            </div>
                                            <div className="my-2">
                                                <h6>사용법</h6>
                                                <textarea
                                                    className="form-control form-control-sm my-2"
                                                    type="text"
                                                    name="conjugation"
                                                    value={selectedItem.conjugation}
                                                    onChange={handleInputChange}
                                                    style={{height: "100px", resize: "none"}}
                                                />
                                            </div>
                                            <div className="my-2">
                                                <h6>기타용도</h6>
                                                <textarea
                                                    className="form-control form-control-sm my-2"
                                                    type="text"
                                                    name="otherUses"
                                                    value={selectedItem.otherUses}
                                                    onChange={handleInputChange}
                                                    style={{height: "100px", resize: "none"}}
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <h5 style={{margin: 0}}>{selectedItem.name}</h5>
                                                <button className="btn" onClick={handleEditClick}>
                                                    수정
                                                </button>
                                            </div>
                                            <hr/>
                                            <h6>개요</h6>
                                            <div className="mb-2">{selectedItem.outline}</div>
                                            <h6>사용법</h6>
                                            <div className="mb-2">{selectedItem.conjugation}</div>
                                            <h6>기타용도</h6>
                                            <div className="mb-2">{selectedItem.otherUses}</div>
                                        </div>
                                    )}
                                </div>
                            ) : filteredQuick.length > 0 ? (
                                currentItems.map((item, index) => (
                                    <div key={index} onClick={() => handleItemClick(item)}>
                                        <h5>
                                            {(currentPage - 1) * itemsPerPage + index + 1}.{" "}
                                            {item.name}
                                        </h5>
                                    </div>
                                ))
                            ) : registered ? (
                                <>
                                    <div>
                                        <h6>이름</h6>
                                        <input
                                            className="form-control form-control-sm"
                                            type="text"
                                            name="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="my-2">
                                        <h6>개요</h6>
                                        <textarea
                                            className="form-control form-control-sm my-2"
                                            type="text"
                                            name="outline"
                                            value={outline}
                                            onChange={(e) => setOutline(e.target.value)}
                                            style={{height: "100px", resize: "none"}}
                                        />
                                    </div>
                                    <div className="my-2">
                                        <h6>사용법</h6>
                                        <textarea
                                            className="form-control form-control-sm my-2"
                                            type="text"
                                            name="conjugation"
                                            value={conjugation}
                                            onChange={(e) => setConjugation(e.target.value)}
                                            style={{height: "100px", resize: "none"}}
                                        />
                                    </div>
                                    <div className="my-2">
                                        <h6>기타용도</h6>
                                        <textarea
                                            className="form-control form-control-sm my-2"
                                            type="text"
                                            name="otherUses"
                                            value={otherUses}
                                            onChange={(e) => setOtherUses(e.target.value)}
                                            style={{height: "100px", resize: "none"}}
                                        />
                                    </div>
                                </>
                            ) : hasSearched ? (
                                <div className="b-pagination">
                                    검색 결과가 없습니다
                                    <button className="btn" onClick={registeredEditClick}>
                                        등록
                                    </button>
                                </div>
                            ) : (
                                <h6 style={{textAlign: "center"}}>검색어를 입력해주세요.</h6>
                            )}
                        </div>

                        <div className="modal-footer"></div>
                        {registered ? (
                            <>
                                <div style={{textAlign: "right"}}>
                                    <button className="btn" onClick={insertClick}>
                                        등록
                                    </button>
                                    <button className="btn" onClick={registeredEditClick}>
                                        취소
                                    </button>
                                </div>
                            </>
                        ) : selectedItem ? (
                            <>
                                <div style={{textAlign: "right"}}>
                                    {isEditing ? (
                                        <>
                                            <button className="btn" onClick={handleSaveClick}>
                                                저장
                                            </button>
                                            <button className="btn" onClick={() => handleItemClick()}>
                                                취소
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="btn" onClick={deleteSaveClick}>
                                                삭제
                                            </button>
                                            <button className="btn" onClick={() => handleItemClick()}>
                                                취소
                                            </button>
                                        </>
                                    )}
                                </div>
                            </>
                        ) : (
                            currentItems.length > 0 && (
                                <>
                                    <div className="b-pagination">
                                        <button
                                            onClick={prevPage}
                                            disabled={currentPage === 1 || filteredQuick.length === 0}
                                            className={"b-dBtn"}
                                        >
                                            &lt;
                                        </button>
                                        {pageNumbers.map((number) => (
                                            <span
                                                key={number}
                                                onClick={() => paginate(number)}
                                                className={number === currentPage ? "active" : ""}
                                                style={{cursor: "pointer", margin: "0 5px"}}
                                            >
                                                {number}
                                            </span>
                                        ))}
                                        <button
                                            onClick={nextPage}
                                            disabled={currentPage === totalPages}
                                            className={"b-dBtn"}
                                        >
                                            &gt;
                                        </button>
                                    </div>
                                </>
                            )
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Quickmenu;
