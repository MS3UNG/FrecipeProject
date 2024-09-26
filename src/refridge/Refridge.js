import {useEffect, useState} from "react";
import RefridgePlus from "./RegridgePlus";
import RefridgeModi from "./RegridgeModify"
import {useNavigate} from "react-router-dom";
import mqtt from 'mqtt';
import axios from "axios";

export default function Refridge() {
    const navigate = useNavigate();
    const [openPlus, setOpenPlus] = useState(false);
    const [openModi, setOpenModi] = useState(false)
    const [iotMessage, setIotMessage] = useState("");
    const [user, setUser] = useState("");
    const [foods, setFoods] = useState([]);
    const [modiFood, setModiFood] = useState("")
    const [layer, setLayer] = useState("상온")

    useEffect(() => {
        // 아두이노영역
        const client = mqtt.connect('http://nextit.or.kr:29001')
        client.on('connect', () => {
            console.log("Connected!");
            client.subscribe("/IoT/Sensor/std104/sensor", (err) => {
                if (!err) {
                    console.log("Subscribe Topic!")
                }
            })
        })
        client.on('message', (topic, message) => {
            setIotMessage(JSON.parse(message.toString()))
        })
        //
        const userInfo = JSON.parse(sessionStorage.getItem("token")) || [];
        if (userInfo.id === undefined) {
            alert("로그인 후 사용 가능합니다.")
            navigate(-1)
            return;
        }
        setUser(userInfo.id)
        return () => {
            if (client.connected) {
                client.end(() => {
                    console.log("Disconnected");
                })
            }
        }
    }, []);
    const getFoodList = async () => {
        const res = await axios.get("/refridge/list", {
            params: {user, layer}

        });
        setFoods([...res.data]);
    }

    const getParam = (param) => {
        const {cancelPlus, refresh} = param
        if (refresh) {
            setOpenPlus(false)
            getFoodList()
        }

        if (cancelPlus) {
            setOpenPlus(false);
        }
    }
    const getModiParam = (param) => {
        const {cancelPlus, refresh} = param
        if (refresh) {
            setOpenModi(false)
            getFoodList()
        }

        if (cancelPlus) {
            setOpenModi(false)
        }
    }
    useEffect(() => {
        getFoodList()
    }, [layer]);
    useEffect(() => {
        if (user !== "") {
            getFoodList()
        }
    }, [user]);


    return (
        <>

            {/* 헤더부분 */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">나의 냉장고</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item">
                        <a href="#">냉장고 관리</a>
                    </li>
                    <li className="breadcrumb-item active text-white">
                        {layer}
                    </li>
                </ol>
            </div>

            <div className="container-fluid fruite py-5">
                {openPlus ? <RefridgePlus getParam={getParam} id={user}/> : null}
                {openModi ? <RefridgeModi getParam={getModiParam} food={modiFood} id={user}/> : null}
                <div className="container py-5">
                    <div className="row g-4">
                        <div className="col-lg-12">
                            <div className="row g-4">
                                <div className="col-lg-3">
                                    <div className="row g-4">
                                        {/* 냉장고 ㅋㅋ */}
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <div className="refrigerator">
                                                    <div className="freezer" onClick={() => setLayer("냉동")}>
                                                        <div className="handle"/>
                                                    </div>
                                                    <div className="fridge" onClick={() => setLayer("냉장")}>
                                                        <div className="handle"/>
                                                        <div className="fridge-info">
                                                            <div className="temperature">
                                                                <i className="fa-regular fa-snowflake"></i>
                                                                <span>{iotMessage.temperature}<sup>°C</sup></span>
                                                            </div>
                                                            <div className="humidity">
                                                                <i className="fa-solid fa-droplet"></i>
                                                                <span>{iotMessage.humid} <span
                                                                    style={{fontSize: "15px"}}>%</span></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-9">
                                    <div className="header-container">
                                        <h4><span className="layersP" onClick={() => setLayer("상온")}>상온</span> | {layer}
                                        </h4>
                                        <button className="b-Btn" onClick={() => setOpenPlus(!openPlus)}>추가하기</button>
                                    </div>
                                    {layer === "냉장" ? <div className="container refdgContainer"
                                                           style={{paddingTop: 0, border: "1px solid black"}}>
                                        <span className="reff-layer">냉장칸</span>
                                        <div className="row" style={{borderBottom: "1px solid black", width: "100%"}}>
                                            {foods.map((v, i) => {
                                                const foodEndDate = new Date(v.endDate)
                                                const today = new Date();
                                                const dayDiff = Math.ceil((foodEndDate - today) / (1000 * 60 * 60 * 24));
                                                return (
                                                    <>
                                                        {v.placeDetail === "냉장칸" ?
                                                            <div className="col-md-1 thing" key={i} onClick={() => {
                                                                setModiFood(v);
                                                                setOpenModi(true)
                                                            }}>
                                                                <span className="ref-dday"
                                                                      style={dayDiff > 8 ? {backgroundColor: "#8eca21"} : dayDiff > 3 ? {backgroundColor: "#ffb524"} : {backgroundColor: "red"}}>{dayDiff === 0 ? "D-DAY" : dayDiff < 0 ? `D+${dayDiff * -1}` : `D-${dayDiff}`}</span>
                                                                <img src={v.fileFrontPath} className="ref-icon"/>
                                                                <p className="ref-name">{v.name}</p>
                                                            </div> : null}
                                                    </>
                                                )
                                            })}
                                        </div>
                                        <span className="reff-layer">야채칸</span>
                                        <div className="row" style={{width: "100%"}}>
                                            {foods.map((v, i) => {
                                                const foodEndDate = new Date(v.endDate)
                                                const today = new Date();
                                                const dayDiff = Math.ceil((foodEndDate - today) / (1000 * 60 * 60 * 24));
                                                return (
                                                    <>
                                                        {v.placeDetail === "야채칸" ?
                                                            <div className="col-md-1 thing" key={i} onClick={() => {
                                                                setModiFood(v);
                                                                setOpenModi(true)
                                                            }}>
                                                                <span className="ref-dday"
                                                                      style={dayDiff > 8 ? {backgroundColor: "#8eca21"} : dayDiff > 3 ? {backgroundColor: "#ffb524"} : {backgroundColor: "red"}}>{dayDiff === 0 ? "D-DAY" : dayDiff < 0 ? `D+${dayDiff * -1}` : `D-${dayDiff}`}</span>
                                                                <img src={v.fileFrontPath} className="ref-icon"/>
                                                                <p className="ref-name">{v.name}</p>
                                                            </div> : null}
                                                    </>
                                                )
                                            })}
                                        </div>
                                    </div> : <div className="container refdgContainer"
                                                  style={{paddingTop: 0, border: "1px solid black"}}>
                                        <div className="row" style={{width: "100%"}}>
                                            {foods.map((v, i) => {
                                                const foodEndDate = new Date(v.endDate)
                                                const today = new Date();
                                                const dayDiff = Math.ceil((foodEndDate - today) / (1000 * 60 * 60 * 24));
                                                return (
                                                    <div className="col-md-1 thing" key={i} onClick={() => {
                                                        setModiFood(v);
                                                        setOpenModi(true)
                                                    }} style={{marginTop: "20px"}}>
                                                        <span className="ref-dday"
                                                              style={dayDiff > 8 ? {backgroundColor: "#8eca21"} : dayDiff > 3 ? {backgroundColor: "#ffb524"} : {backgroundColor: "red"}}>{dayDiff === 0 ? "D-DAY" : dayDiff < 0 ? `D+${dayDiff * -1}` : `D-${dayDiff}`}</span>
                                                        <img src={v.fileFrontPath} className="ref-icon"/>
                                                        <p className="ref-name">{v.name}</p>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
