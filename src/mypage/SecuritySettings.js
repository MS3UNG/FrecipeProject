import React, { useEffect, useRef, useState } from "react";
import "../css/securitySettings.css";
import axios from "axios";

export default function SecuritySettings() {
    const [id, setId] = useState("");
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [isPasswordChecked, setIsPasswordChecked] = useState(false);
    const [passwordError, setPasswordError] = useState("");

    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [newPasswordError, setNewPasswordError] = useState("");
    const [confirmNewPasswordError, setConfirmNewPasswordError] = useState("");

    const currentPasswordRef = useRef(null);

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&-])[A-Za-z\d@$!%*#?&-]{8,}$/;

    useEffect(() => {
        const token = JSON.parse(sessionStorage.getItem("token"));
        setId(token.id);
    }, []);

    // 비밀번호 변경 버튼 클릭 시 호출
    const handlePasswordChangeClick = () => {
        setIsChangingPassword(true);
    };

    // 비밀번호 변경 취소 버튼 클릭 시 호출
    const handlePasswordCancelClick = () => {
        setIsChangingPassword(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
    };

    // 비밀번호 저장 버튼 클릭 시 호출
    const handlePasswordSaveClick = async () => {
        let isValid = true;

        if (!currentPassword) {
            setIsPasswordChecked(true);
            setPasswordError("현재 비밀번호를 입력해주세요");
            currentPasswordRef.current.focus();
            isValid = false;
        } else {
            setIsPasswordChecked(false);
            setPasswordError("");
        }

        if (!newPassword) {
            setNewPasswordError("새 비밀번호를 입력해주세요");
            isValid = false;
        } else if (!passwordRegex.test(newPassword)) {
            setNewPasswordError("비밀번호는 최소 8자, 하나 이상의 문자, 숫자, 특수문자가 포함되어야 합니다.");
            isValid = false;
        } else {
            setNewPasswordError("");
        }

        if (!confirmNewPassword) {
            setConfirmNewPasswordError("새 비밀번호 확인을 입력해주세요");
            isValid = false;
        } else if (newPassword !== confirmNewPassword) {
            setConfirmNewPasswordError("새 비밀번호가 일치하지 않습니다.");
            isValid = false;
        } else {
            setConfirmNewPasswordError("");
        }

        if (!isValid) {
            return;
        }

        try {
            const res = await axios.post("checkCurrentPassword", { id: id, password: currentPassword });
            if (res.data) {
                await axios.post("changePassword", { id: id, password: newPassword });
                alert("비밀번호가 변경되었습니다.");
                setIsChangingPassword(false);
                setCurrentPassword("");
                setNewPassword("");
                setConfirmNewPassword("");
                sessionStorage.removeItem('token');
                window.location.href = '/login';
            } else {
                alert("현재 비밀번호가 일치하지 않습니다.");
            }
        } catch (error) {
            alert("비밀번호 변경에 실패했습니다. 다시 시도해 주세요.");
        }
    };

    return (
        <div className="container security-section">
            <div className="security-form-wrapper">
                <h2 className="mt-4 mb-4 text-center">보안 설정</h2>
                <div className="security-info">
                    <div className="security-item">
                        <p>
                            <strong>비밀번호 변경:</strong>
                        </p>
                        {isChangingPassword ? (
                            <div>
                                <div className="input-groups">
                                    <input
                                        ref={currentPasswordRef}
                                        type="password"
                                        placeholder="현재 비밀번호"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                    />
                                    {isPasswordChecked && <p className="error-message" style={{color:"red"}}>{passwordError}</p>}
                                </div>
                                <div className="input-groups">
                                    <input
                                        type="password"
                                        placeholder="새 비밀번호"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                    {newPasswordError && <p className="error-message" style={{color:"red"}}>{newPasswordError}</p>}
                                </div>
                                <div className="input-groups">
                                    <input
                                        type="password"
                                        placeholder="새 비밀번호 확인"
                                        value={confirmNewPassword}
                                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    />
                                    {confirmNewPasswordError && <p className="error-message" style={{color:"red"}}>{confirmNewPasswordError}</p>}
                                </div>
                                <div className="button-group">
                                    <button className="s-btn btn-primary" onClick={handlePasswordSaveClick}>
                                        변경
                                    </button>
                                    <button className="s-btn btn-secondary" onClick={handlePasswordCancelClick}>
                                        취소
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button className="s-btn btn-primary" onClick={handlePasswordChangeClick}>
                                비밀번호 변경
                            </button>
                        )}
                    </div>
                    <div className="security-item">
                        <p>
                            <strong>2단계 인증:</strong>
                        </p>
                        <button className="s-btn btn-secondary" onClick={()=>alert("추후 업데이트 예정입니다.")}>2단계 인증 설정</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
