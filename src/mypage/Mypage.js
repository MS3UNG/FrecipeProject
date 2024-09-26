import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Profile from "./Profile";
import SecuritySettings from "./SecuritySettings";
import "../css/mypage.css";
import MyRecipe from "../myrecipe/RecipeSaveScreen";
import EmailList from "../emailList/EmailListScreen";

export default function Mypage() {
    const [myProfile, setMyProfile] = useState(true);
    const [security, setSecurity] = useState(false);
    const [myRecipe, setMyRecipe] = useState(false);
    const [emailList, setEmailList] = useState(false);

    const selectMyProfileOnclickBtn = () => {
        setMyProfile(true);
        setSecurity(false);
        setMyRecipe(false);
        setEmailList(false)
    };
    const selectSecurityOnclickBtn = () => {
        setMyProfile(false);
        setSecurity(true);
        setMyRecipe(false);
        setEmailList(false)
    };
    const selectMyRecipeOnclickBtn = () => {
        setMyProfile(false);
        setSecurity(false);
        setMyRecipe(true);
        setEmailList(false)
    }
    const selectEamilListOnClickBtn  = () =>{
        setMyProfile(false);
        setSecurity(false);
        setMyRecipe(false);
        setEmailList(true);
    }
    return (
        <>

            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">마이페이지</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item active text-white">
                        <a>
                            내프로필
                        </a>
                    </li>
                </ol>
            </div>
            <div className="container mypage-container" style={{paddingTop: 0, marginTop: "1%"}}>
                <div className="mp-btn">
                    <button onClick={selectMyProfileOnclickBtn}>내 프로필</button>
                    <button onClick={selectSecurityOnclickBtn}>보안 설정</button>
                    <button onClick={selectMyRecipeOnclickBtn}>나의 레시피</button>
                    <button onClick={selectEamilListOnClickBtn}>문의 내역</button>
                </div>
                <div className="mypage-content">
                    {myProfile ? <Profile/> : null}
                    {security ? <SecuritySettings/> : null}
                    {myRecipe ? <MyRecipe/> : null}
                    {emailList ? <EmailList/> : null}
                </div>
            </div>

        </>
    );
}
