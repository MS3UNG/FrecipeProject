import React, {useEffect, useRef, useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../css/signin.css";
import AddressSearch from "./AddressSearch";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

export default function Signin() {
    const navigate = useNavigate()

    const [id, setId] = useState(""); // 아이디입력
    const [isValidIdFormat, setIsValidIdFormat] = useState(true);// 아이디 형식 유효성 여부
    const [isNanId, setIsNanId] = useState(true); // 빈아이디
    const [isIdAvailable, setIsIdAvailable] = useState(true); // 사용중인아이디
    const [checkIdDuple, setCheckIdDuple] = useState(false);

    const [nickName, setNickName] = useState(""); // 닉네임 입력
    const [isNanNickName, setIsNanNickName] = useState(true); // 빈 닉네임
    const [isNickNameAvailable, setIsNickNameAvailable] = useState(true); //  중복 여부를 저장
    const [checkNickNameDuple, setCheckNickNameDuple] = useState(false);

    const [name, setName] = useState(""); // 이름 입력

    const [password, setPassword] = useState(""); // 비밀번호
    const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호확인
    const [isPasswordAvailable, setIsPasswordAvailable] = useState(false); // 정규식
    const [isValidConfirmPasswordFormat, setIsValidConfirmPasswordFormat] = useState(false); // 정규식
    const [hasPasswordBeenTouched, setHasPasswordBeenTouched] = useState(false); // 핸들러 작동
    const [hasConfirmPasswordBeenTouched, setHasConfirmPasswordBeenTouched] = useState(false); // 핸들러작동

    const [gender, setGender] = useState(""); // 성별

    const [address, setAddress] = useState("") // 주소
    const [detailAddress, setDetailAddress] = useState(""); // 상세 주소

    const [email, setEmail] = useState("") // 이메일
    const [isValidEmailFormat, setIsValidEmailFormat] = useState(true);

    const [phone, setPhone] = useState("") // 전화번호
    const [birth, setBirth] = useState("")// 생년월일


    const confirmIdRef = useRef(null);
    const confirmNickNameRef = useRef(null);
    const nameRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const genderRef = useRef(null);
    const addressRef = useRef(null);
    const detailAddressRef = useRef(null);
    const emailRef = useRef(null);
    const phoneRef = useRef(null);
    const birthRef = useRef(null);

    // 아이디 중복확인
    const checkIdAvailability = async () => {
        if (id.trim() == "") {
            setIsNanId(false);
            setCheckIdDuple(false)
            confirmIdRef.current.focus();
            return;
        } else {
            setIsNanId(true);
        }
        const isValidFormat = /^[a-zA-Z0-9]+$/.test(id) && id.length >= 6 && id.length <= 16;
        setIsValidIdFormat(isValidFormat);

        if (!isValidFormat) {
            setIsNanId(false);
            setCheckIdDuple(false)
            confirmIdRef.current.focus();
            return;
        }
        try {
            const res = await axios.post("confirmId", {id})
            const isAvailable = res.data;
            setIsIdAvailable(isAvailable);
            setCheckIdDuple(isAvailable)

        } catch (err) {
            console.error("아이디체크err>>>", err)
        }
    }

    // 닉네임 중복확인
    const checkNickNameAvailability = async () => {
        if (nickName.trim() == "") {
            setIsNanNickName(false);
            setCheckNickNameDuple(false)
            confirmNickNameRef.current.focus();
            return;
        } else {
            setIsNanNickName(true);
        }


        try {
            const res = await axios.post("confirmNickName", {nickName})
            const isAvailable = res.data;
            setIsNickNameAvailable(isAvailable);
            setCheckNickNameDuple(isAvailable)
        } catch (err) {
            console.error("닉네임체크err>>>", err)
        }
    };

    // 주소가져오기
    const handleAddressSelect = (selectedAddress) => {
        setAddress(selectedAddress);
    };

    // 비밀번호 확인 8글자이상 영문, 숫자, 특수문자중 각각 하나씩
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&-])[A-Za-z\d@$!%*#?&-]{8,}$/;
    useEffect(() => {
        if (hasPasswordBeenTouched) {
            setIsPasswordAvailable(passwordRegex.test(password));
        }

        if (hasPasswordBeenTouched && hasConfirmPasswordBeenTouched) {
            setIsValidConfirmPasswordFormat(password === confirmPassword);
        }
    }, [password, confirmPassword, hasPasswordBeenTouched, hasConfirmPasswordBeenTouched]);

    const handlePasswordChange = (e) => {
        if (!hasPasswordBeenTouched) {
            setHasPasswordBeenTouched(true);
        }
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        if (!hasConfirmPasswordBeenTouched) {
            setHasConfirmPasswordBeenTouched(true);
        }
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        // 아이디가 입력되었는지 확인
        if (id.trim() === "") {
            setIsNanId(false);
            setCheckIdDuple(false)
            confirmIdRef.current.focus();
            return;
        }

        if (!isIdAvailable) {
            setIsIdAvailable(isIdAvailable)
            setCheckIdDuple(isIdAvailable)
            confirmIdRef.current.focus();
            return;
        }
        if (!checkIdDuple) {
            setCheckNickNameDuple(false)
            confirmIdRef.current.focus();
            return;
        }

        // 닉네임이 입력되었는지 확인
        if (nickName.trim() === "") {
            setIsNanNickName(false);
            setCheckNickNameDuple(false)
            confirmNickNameRef.current.focus();
            return;
        }

        if (!isNickNameAvailable) {
            setIsNickNameAvailable(isNickNameAvailable)
            setCheckNickNameDuple(false)
            confirmNickNameRef.current.focus();
            return;
        }
        if (!checkNickNameDuple) {
            setCheckNickNameDuple(false)
            confirmNickNameRef.current.focus();
            return;
        }

        // 이름이 입력되었는지 확인
        if (name.trim() === "") {
            nameRef.current.focus();
            return;
        }

        // 비밀번호가 입력되었는지 및 유효성 확인
        if (password.trim() === "" || !isPasswordAvailable) {
            setPassword("");
            setConfirmPassword("");
            passwordRef.current.focus();
            return;
        }

        // 비밀번호 확인이 입력되었는지 및 일치하는지 확인
        if (confirmPassword.trim() === "" || !isValidConfirmPasswordFormat) {
            setConfirmPassword("");
            confirmPasswordRef.current.focus();
            return;
        }

        // 성별이 선택되었는지 확인
        if (gender === "") {
            genderRef.current.focus();
            return;
        }

        // 주소가 입력되었는지 확인
        if (address.trim() === "") {
            addressRef.current.focus();
            return;
        }

        // 상세 주소가 입력되었는지 확인
        if (detailAddress.trim() === "") {
            detailAddressRef.current.focus();
            return;
        }

        // 이메일이 입력되었는지 확인
        if (email.trim() === "") {
            emailRef.current.focus();

            return;
        }
        if (!emailRegex.test(email)) {
            // 올바른 이메일 형식이 아닌 경우
            setIsValidEmailFormat(emailRegex.test(email));
            emailRef.current.focus();
            return;
        }
        if (emailRegex.test(email)) {
            setIsValidEmailFormat(emailRegex.test(email));
        }

        // 전화번호가 입력되었는지 확인
        if (phone.trim() === "") {
            phoneRef.current.focus();
            return;
        }

        // 생년월일이 입력되었는지 확인
        if (birth.trim() === "") {
            birthRef.current.focus();
            return;
        }

        try {
            const res = await axios.post("signIn", {
                id,
                nickName,
                name,
                password,
                confirmPassword,
                gender,
                address,
                detailAddress,
                email,
                phone,
                birth,
            })

            if (res.status === 200) {
                navigate("/login")
            }

        } catch (err) {
            console.error("회원가입오류", err)
        }
    };


    return (
        <>

            <div className="container fridge-signin-container">
                <div className="signin-form-wrapper">
                    <h2 className="mt-4 mb-4 text-center">회원가입</h2>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="userId" className="form-label">
                                아이디
                            </label>
                            <div className="input-group">
                                <input
                                    ref={confirmIdRef}
                                    type="text"
                                    className={`form-control ${!isIdAvailable || !isNanId ? "is-invalid" : ""}`}
                                    id="userId"
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
                                />

                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={checkIdAvailability}
                                >{!checkIdDuple ? "중복확인" : "중복완료"}
                                </button>
                            </div>
                            {!isIdAvailable && (
                                <div className="feedback" style={{color: "red"}}>
                                    이미 사용 중인 아이디입니다.
                                </div>
                            )}
                            {!isNanId && (<div className="feedback" style={{color: "red"}}>
                                아이디를 입력하세요.(8글자에서 16글자)
                            </div>)}


                        </div>
                        <div className="mb-3">
                            <label htmlFor="nickName" className="form-label">
                                닉네임
                            </label>
                            <div className="input-group">
                                <input
                                    ref={confirmNickNameRef}
                                    type="text"
                                    className={`form-control ${!isNickNameAvailable || !isNanNickName ? "is-invalid" : ""}`}
                                    id="nickName"
                                    value={nickName}
                                    onChange={(e) => setNickName(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={checkNickNameAvailability}
                                >
                                    {!checkNickNameDuple ? "중복확인" : "중복완료"}
                                </button>
                            </div>
                            {!isNanNickName && (
                                <div className="feedback" style={{color: "red"}}>
                                    닉네임을 입력해주세요
                                </div>
                            )}
                            {!isNickNameAvailable && (
                                <div className="feedback" style={{color: "red"}}>
                                    이미 사용 중인 닉네임입니다.
                                </div>
                            )}

                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                이름
                            </label>
                            <input
                                ref={nameRef}
                                type="text"
                                className="form-control"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                비밀번호
                            </label>
                            <input
                                ref={passwordRef}
                                type="password"
                                className={`form-control ${hasPasswordBeenTouched && !isPasswordAvailable ? "is-invalid" : ""}`}
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        {hasPasswordBeenTouched && !isPasswordAvailable && (
                            <div className="feedback" style={{color: "red"}}>
                                비밀번호는 영문, 숫자, 특수문자를 포함하여 8자 이상이어야 합니다.
                            </div>
                        )}
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">
                                비밀번호 확인
                            </label>
                            <input
                                ref={confirmPasswordRef}
                                type="password"
                                className={`form-control ${hasConfirmPasswordBeenTouched && !isValidConfirmPasswordFormat ? "is-invalid" : ""}`}
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                            />
                        </div>
                        {hasConfirmPasswordBeenTouched && !isValidConfirmPasswordFormat && (
                            <div className="feedback" style={{color: "red"}}>
                                비밀번호가 일치하지 않습니다.
                            </div>
                        )}

                        <div className="mb-3">
                            <label htmlFor="gender" className="form-label">
                                성별
                            </label>
                            <select
                                ref={genderRef}
                                className="form-select"
                                id="gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <option value="">선택하세요</option>
                                <option value="M">남성</option>
                                <option value="F">여성</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">
                                주소
                            </label>
                            <div className="input-group">
                                <input
                                    ref={addressRef}
                                    type="text"
                                    className="form-control"
                                    id="address"
                                    value={address}
                                    readOnly
                                />
                                <AddressSearch onAddressSelect={handleAddressSelect}/>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="detailAddress" className="form-label">
                                상세 주소
                            </label>
                            <input
                                ref={detailAddressRef}
                                type="text"
                                className="form-control"
                                id="detailAddress"
                                value={detailAddress}
                                onChange={(e) => setDetailAddress(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                이메일
                            </label>
                            <input
                                ref={emailRef}
                                type="email"
                                className={`form-control ${!isValidEmailFormat ? "is-invalid" : ""}`}
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                        </div>
                        {!isValidEmailFormat && (<div className="feedback" style={{color: "red"}}>
                            이메일형식 shhg60@naver.com
                        </div>)}
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">
                                휴대전화번호
                            </label>
                            <input
                                ref={phoneRef}
                                type="tel"
                                className="form-control"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="birthday" className="form-label">
                                생년월일
                            </label>
                            <input
                                ref={birthRef}
                                type="date"
                                className="form-control"
                                id="birthday"
                                value={birth}
                                onChange={(e) => setBirth(e.target.value)}
                            />
                        </div>

                        <div className="text-end">
                            <button type="submit" className="btn btn-primary me-2" onClick={handleSubmit}>
                                회원가입
                            </button>
                            <a href={"/login"} type="button" className="btn btn-secondary">
                                취소
                            </a>
                        </div>
                    </form>
                    <p>
                        이미 계정이 있으신가요? <Link to="/login">로그인</Link>
                    </p>
                </div>
            </div>

        </>
    );
}
