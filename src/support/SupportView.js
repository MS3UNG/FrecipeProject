import {Link, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function SupportView() {
    const location = useLocation();
    const supportNo = parseInt(location.state.no, 10)
    const [support, setSupport] = useState([]);

    const getSupport = async function () {
        const res = await axios.get("/support/view?id=" + supportNo)
        setSupport(res.data)
    }
    useEffect(() => {
        getSupport()
    }, []);

    return (
        <>

            {/* 헤더부분 */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">고객센터</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item">
                        <Link to="/support">
                            <a href="#">고객센터</a>
                        </Link>
                    </li>
                    <li className="breadcrumb-item active text-white">{support.title}</li>
                </ol>
            </div>

            <div className="container-fluid testimonial py-5">
                <div className="container" style={{width: "80%"}}>

                    {/* 게시글 */}
                    <div className="text-left bv-title">
                        <Link to={"/support"}>
                            <button className="b-Btn">목록</button>
                        </Link>
                        <h2 className=" mb-2 text-dark sp-title">
                            <span className="sp-q">Q. </span>{support.title}
                        </h2>
                    </div>
                    <div className="bv-content" dangerouslySetInnerHTML={{__html: support.content}}
                         style={{minHeight: "230px", fontSize: "21px"}}/>
                </div>
            </div>

        </>
    )
}