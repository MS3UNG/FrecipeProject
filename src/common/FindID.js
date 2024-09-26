import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import axios from "axios";

export default function FindID(props) {
    const {getParam} = props
    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const findIdSearch = async () => {
        if(name===""){
            alert("이름을 입력해주세요.")
            return;
        }
        if(email===""){
            alert("이메일을 입력해주세요.")
            return;
        }

        const res = await axios.post("/findId", {
            name: name,
            email: email
        })
        if(res.data){
            alert(`회원님의 아이디는 ${res.data.id}입니다.`)
        }else{
            alert("존재하지 않는 회원입니다. 이름과 이메일을 다시 한 번 확인해주세요.")
        }
        getParam({close:true})
    }


    return (
        <div className="d-flex flex-column min-vh-100 bg-light justify-content-center">
            <div className="container my-auto">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow-lg border-0 rounded-3">
                            <div className="card-body p-5">
                                <h2 className="text-center mb-4 text-dark">
                                    아이디 찾기
                                </h2>
                                <div>
                                    <div className="form-group mb-3">
                                        <label
                                            htmlFor="name"
                                            className="text-dark"
                                        >
                                            이름
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            value={name}
                                            placeholder="이름 입력"
                                            onChange={(e) => {
                                                setName(e.target.value);
                                            }}
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label
                                            htmlFor="email"
                                            className="text-dark"
                                        >
                                            이메일
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            value={email}
                                            placeholder="이메일 입력"
                                            onChange={(e) => {
                                                setEmail(e.target.value)
                                            }}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        className="btn btn-primary w-100 mt-3"
                                        onClick={findIdSearch}
                                    >
                                        아이디찾기
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}