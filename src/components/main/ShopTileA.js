import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const OrganicProducts = () => {
    const [recipe, setRecipe] = useState([]);
    const getHofMainRecipes = async () => {
        const res = await axios.get("/recipe/HofMain")
        setRecipe(res.data);
    }
    useEffect(() => {
        getHofMainRecipes()
    }, []);

    return (
        <div className="container-fluid fruite py-5">
            <div className="container py-5">
                <div className="tab-class text-center">
                    <div className="row g-4">
                        <div className="col-lg-4 text-start mb-3">
                            <h1>명예의 전당 레시피</h1>
                        </div>
                    </div>
                    <div className="tab-content">
                        <div
                            id="tab-1"
                            className="tab-pane fade show p-0 active"
                        >
                            <div className="row g-4">
                                <div className="col-lg-12">
                                    <div className="row g-4">
                                        {recipe.map((v, i) => {
                                            return (
                                                <div className="col-md-6 col-lg-4 col-xl-3" key={i}>
                                                    <div className="rounded position-relative fruite-item">
                                                        <Link to="/recipe/view" state={{id: v.id}}>
                                                            <div className="fruite-img">
                                                                <img
                                                                    src={v.fileFrontPath}
                                                                    className="w-100 rounded-top"
                                                                    style={{height: "250px"}}
                                                                />
                                                            </div>
                                                        </Link>
                                                        <div
                                                            className="text-white bg-secondary px-3 py-1 rounded position-absolute fw-bold"
                                                            style={{
                                                                top: "10px",
                                                                left: "10px",
                                                            }}
                                                        >
                                                            {i + 1}
                                                        </div>
                                                        <div
                                                            className="p-4 border border-secondary border-top-0 rounded-bottom"
                                                            style={{minHeight: "169px"}}>
                                                            <Link to="/recipe/view" state={{id: v.id}}>
                                                                <h5 className="mainH-title">{v.name}</h5>
                                                            </Link>
                                                            <p>
                                                                {v.intro}<br/>
                                                            </p>
                                                            <p className="mainH-writer">{v.nickname}({v.writer})</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrganicProducts;
