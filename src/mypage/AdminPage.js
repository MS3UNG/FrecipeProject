import React, {useEffect, useState} from "react";
import Profile from "./Profile";
import SecuritySettings from "./SecuritySettings";
import MyRecipe from "../myrecipe/RecipeSaveScreen";
import EmailList from "../emailList/EmailListScreen";
import Analyze from "../components/main/Analyze";
import UserInfo from "./UserInfo";
import UserEmail from "./UserEmail";
import UserRecipeInfo from "./UserRecipeInfo";

export default function AdminPage() {
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


    return (
        <>
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">관리자 페이지</h1>
            </div>
            <div className="container mypage-container" style={{paddingTop: 0, marginTop: "1%"}}>
                <div className="mp-btn">
                    <button onClick={selectMyProfileOnclickBtn}>회원 정보</button>
                    <button onClick={selectSecurityOnclickBtn}>문의 내역</button>
                    <button onClick={selectMyRecipeOnclickBtn}>레시피 내역</button>
                </div>
                <div className="mypage-content">
                    {myProfile? <UserInfo/>:null}
                    {security ? <UserEmail/> : null}
                    {myRecipe ? <UserRecipeInfo/> : null}
                </div>
            </div>

        </>
    );
}
