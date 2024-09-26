import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export default function RecipeHofBody() {
    const [recipes, setRecipes] = useState([]);

    const getHofRecipes = async () => {
        const res = await axios.get("/recipe/Hof")
        setRecipes(res.data);
    }
    useEffect(() => {
        getHofRecipes()
    }, []);


    return (
        <>
            {/* 헤더부분 */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">
                    명예 레시피
                </h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item">
                        <a href="#">초보요리사</a>
                    </li>
                    <li className="breadcrumb-item active text-white">
                        명예레시피
                    </li>
                </ol>
            </div>

            {/* 몸통 */}
            <div className="container-fluid testimonial py-5">
                <div className="container pt-3">
                    {/* 게시판 제목 */}
                    <div className="testimonial-header text-center">
                        <h4 className="text-primary">Frecipe</h4>
                        <h1 className="display-5 mb-5 text-dark">
                            명예의 전당
                        </h1>
                    </div>

                    <div className="boardContainer container">
                        <ul className="imgb-list row">
                            {recipes.map((v, i) => {
                                return (
                                    <li className="imgb-li col-6 col-md-3" key={i}>
                                        <p className="ranking-num">{i + 1}</p>
                                        <div className="thumb">
                                            <Link to="/recipe/view" state={{id: v.id}}>
                                                <img src={v.fileFrontPath}/>
                                            </Link>
                                        </div>
                                        <div className="info">
                                            <div className="title">
                                                {v.name}
                                            </div>
                                            <div className="writer">{v.nickname} ({v.writer})</div>
                                            <div className="popular">추천수 {v.popular}</div>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
