import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../css/profile.css";
import AddressSearch from "../common/AddressSearch";
import axios from "axios";

export default function Profile() {
    const [id, setId] = useState("")
    const [nickname, setNickname] = useState("");
    const [originalNickname, setOriginalNickname] = useState("");
    const [isNicknameChecked, setIsNicknameChecked] = useState(false);
    const [nicknameError, setNicknameError] = useState("");

    const [address, setAddress] = useState("");
    const [originalAddress, setOriginalAddress] = useState("");

    const [detailAddress, setDetailAddress] = useState("");
    const [originalDetailAddress, setOriginalDetailAddress] = useState("");
    const [isDetailAddress, setIsDetailAddress] = useState(false);


    const [name, setName] = useState("홍길동");
    const [email, setEmail] = useState("honggildong@example.com");
    const [phone, setPhone] = useState("");

    const [isEditMode, setIsEditMode] = useState(false);

    // 성별
    const [gender, setGender] = useState("");
    const [memberNo, setMemberNo] = useState("")
    // 파일 변수
    const [photoNo, setPhotoNo] = useState("");
    const [originalName, setOriginalName] = useState("");
    const [fileFrontPath, setFileFrontPath] = useState("");
    const [fileSize, setFileSize] = useState("")

    useEffect(() => {
        const token = JSON.parse(sessionStorage.getItem("token"));
        setId(token.id);
        setName(token.name);
        setEmail(token.email);
        setNickname(token.nickName);
        setOriginalNickname(token.nickName);
        setAddress(token.address);
        setOriginalAddress(token.address);
        setDetailAddress(token.detailAddress);
        setOriginalDetailAddress(token.detailAddress);
        setPhone(token.phone);
        setPhotoNo(token.photoNo);
        setOriginalName(token.originalName);
        setFileFrontPath(token.fileFrontPath);
        setFileSize(token.fileSize);
        setGender(token.gender);
        setMemberNo(token.no);
    }, []);
    const handleNicknameChange = (e) => {
        setNickname(e.target.value);
        setIsNicknameChecked(false);
        setNicknameError("");
    };
    const handleNicknameCheck = async () => {
        if (originalNickname != nickname) {
            try {
                const res = await axios.post("confirmNickName", {nickName: nickname})
                const isAvailable = res.data;
                setIsNicknameChecked(isAvailable)

                if (!isAvailable) {
                    setNicknameError("중복된아이디입니다.")
                    return;
                }
            } catch (err) {
                console.error("닉네임체크err>>>", err)
            }
        }
    };
    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };
    const handleDetailAddressChange = (e) => {
        setDetailAddress(e.target.value);
        setIsDetailAddress(false)
    };
    const handlePictureChange = async (event) => {
        const file = event.target.files[0]; // 선택한 파일 가져오기

        if (!file) {
            window.alert("파일을 선택하세요.");
            return;
        }

        const allowedTypes = ["image/png", "image/jpeg"];
        if (!allowedTypes.includes(file.type)) {
            window.alert("PNG 또는 JPG 파일만 업로드 가능합니다.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("photoNo", photoNo);

        try {
            const res = await axios.post("uploadProfileImage", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.status === 200) {
                // 프로필 이미지 업데이트
                const token = JSON.parse(sessionStorage.getItem("token"));
                token.fileFrontPath = res.data.fileFrontPath; // 서버에서 반환된 파일 경로
                sessionStorage.setItem("token", JSON.stringify(token));
                setFileFrontPath(res.data.fileFrontPath);
                window.alert("프로필 사진이 변경되었습니다.");
            } else {
                window.alert("프로필 사진 변경 실패");
            }
        } catch (err) {
            console.error("파일 업로드 오류", err);
            window.alert("파일 업로드 중 오류가 발생했습니다.");
        }
    };
    const handlePictureDelete = async () => {
        const res = await axios.post("/defaultImg", {memberNo, photoNo, gender})
        try {
            const res = await axios.post("/defaultImg", {memberNo, photoNo, gender})

            if (res.status === 200) {
                // 프로필 이미지 업데이트
                const token = JSON.parse(sessionStorage.getItem("token"));
                token.fileFrontPath = res.data.fileFrontPath; // 서버에서 반환된 파일 경로
                sessionStorage.setItem("token", JSON.stringify(token));
                setFileFrontPath(res.data.fileFrontPath);
                window.alert("기본프로필 사진으로 변경되었습니다.");
            } else {
                window.alert("프로필 사진 변경 실패");
            }
        } catch (err) {
            console.error("파일 업로드 오류", err);
            window.alert("파일 업로드 중 오류가 발생했습니다.");
        }
    };
    const handleEdit = () => {
        setOriginalNickname(nickname);
        setOriginalAddress(address);
        setOriginalDetailAddress(detailAddress);
        setIsEditMode(true);
    };
    const handleApply = async () => {
        if (nickname != originalNickname) {

            if (!isNicknameChecked) {
                setNicknameError("닉네임 중복 확인을 해주세요.");
                return;
            }
        }
        if (!detailAddress) {
            setIsDetailAddress(true)
            return
        }

        const res = await axios.post("updateProfile", {
            id: id,
            nickName: nickname,
            address: address,
            detailAddress: detailAddress
        })
        if (res.status === 200) {
            const token = JSON.parse(sessionStorage.getItem('token'));
            token.nickname = nickname;
            token.address = address;
            token.detailAddress = detailAddress;
            sessionStorage.setItem('token', JSON.stringify(token));
            setIsEditMode(false);
        } else {
            alert("정보변경 실패")
        }


    };
    const handleCancel = () => {
        setNickname(originalNickname);
        setAddress(originalAddress);
        setDetailAddress(originalDetailAddress);
        setIsEditMode(false);
    };
    const handleAddressSelect = (selectedAddress) => {
        setAddress(selectedAddress);
    };

    return (
        <>

            <div className="container profile-container">
                <div className="profile-form-wrapper">
                    <h2 className="mt-3 mb-4 text-center">내 프로필</h2>
                    <div className="profile-info">
                        <table>
                            <tbody>
                            <tr>
                                <td className="profile-picture-col">
                                    <img
                                        className="profile-picture"
                                        src={fileFrontPath}
                                        alt="프로필 사진"
                                    />
                                    <div className="button-group">
                                        <input
                                            type="file"
                                            accept=".png, .jpg, .jpeg"
                                            onChange={handlePictureChange}
                                            style={{display: "none"}}
                                            id="fileInput"
                                        />
                                        <label htmlFor="fileInput" className="btn btn-primary">
                                            사진 변경
                                        </label>
                                        <label htmlFor="fileDelete" onClick={handlePictureDelete}
                                               className="btn btn-primary">
                                            기본프로필
                                        </label>
                                    </div>
                                </td>
                                <td className="profile-info-col">
                                    <table>
                                        <tbody>
                                        <tr>
                                            <td><strong>이름:</strong></td>
                                            <td>{name}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>이메일:</strong></td>
                                            <td>{email}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>닉네임:</strong></td>
                                            <td>
                                                {isEditMode ? (
                                                    <>
                                                        <div className="input-group" style={{marginBottom: "5px"}}>
                                                            <input
                                                                className="pro-input"
                                                                type="text"
                                                                value={nickname}
                                                                onChange={handleNicknameChange}
                                                                style={{width: "500px"}}
                                                            />
                                                            <button onClick={handleNicknameCheck}
                                                                    className="btn btn-primary">중복 확인
                                                            </button>
                                                        </div>
                                                        {nicknameError && <span className="error"
                                                                                style={{color: "red"}}>{nicknameError}</span>}
                                                        {isNicknameChecked &&
                                                            <span className="error">중복확인 완료</span>}
                                                    </>

                                                ) : (
                                                    nickname
                                                )}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><strong>주소:</strong></td>
                                            <td>
                                                {isEditMode ? (
                                                    <>
                                                        <div className="input-group">
                                                            <input
                                                                className="pro-input"
                                                                type="text"
                                                                value={address}
                                                                onChange={handleAddressChange}
                                                                readOnly
                                                                style={{width: "500px"}}
                                                            />
                                                            <AddressSearch onAddressSelect={handleAddressSelect}/>
                                                        </div>
                                                        <div>
                                                            <input
                                                                className="pro-input"
                                                                type="text"
                                                                value={detailAddress}
                                                                onChange={handleDetailAddressChange}
                                                                style={{marginTop: "5px"}}
                                                            />
                                                        </div>
                                                        {isDetailAddress && <span className="error"
                                                                                  style={{color: "red"}}>주소입력해주세요</span>}
                                                    </>
                                                ) : (
                                                    address + ", " + detailAddress
                                                )}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><strong>전화번호:</strong></td>
                                            <td>{phone}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    {isEditMode ? (
                                        <div className="button-group">
                                            <button onClick={handleApply}>적용</button>
                                            <button onClick={handleCancel}>취소</button>
                                        </div>
                                    ) : (
                                        <button className="edit-button" onClick={handleEdit}>
                                            정보 수정
                                        </button>
                                    )}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
