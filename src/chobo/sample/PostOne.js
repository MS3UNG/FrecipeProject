import {useCallback, useEffect, useRef, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

export default function PostOne() {

    return (
        <>
            {/* 헤더부분 */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">요리 기초</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item">
                        <Link to="/chobo">
                            <a href="#">초보요리사</a>
                        </Link>
                    </li>
                    <li className="breadcrumb-item active text-white">요리 TIP</li>
                </ol>
            </div>

            {/* 몸통 */}
            <div className="container-fluid testimonial py-5">


                <>
                    <div className="container" style={{width: "80%"}}>

                        {/* 게시글 */}
                        <div className="text-left bv-title">
                            <h5 className="text-primary">요리 TIP</h5>
                            <h2 className=" mb-2 text-dark">
                                요리 초보 탈출을 위한 팁 5개!
                            </h2>
                            <p className="bv-writer">작성자: 관리자 (Frecipe) </p>
                            <div className="bv-info">
                                    <span
                                        className="bv-date">2024-07-09 10:24</span>
                                <span className="bv-hits">조회 2,154</span>
                            </div>
                        </div>
                        <div className="bv-content">
                            <img style={{display: "block", width: "400px", height: "300px"}}
                                 src="https://semie.cooking/image/contents/lw/qp/rvnzjkst/122038225tbtc.jpg"/>
                            <br/>
                            <span style={{color: "#333333"}}>1. 올바른 칼 사용법을 익힌다</span>
                            <br/>
                            <p>
                                칼을 쥐는 방법은 여러 가지가 있지만 가장 기본이 되는 것은 '블레이드 그립'이다.<br/>
                                엄지와 검지로 칼날을 쥐고 나머지 세 손가락으로 손잡이를 감싸준다. <br/>
                                손을 칼날에 바짝 붙여 잡는 방식이기 때문에 다루기 편해 초보에게는 가장 유용한 방식이다.
                            </p>
                            <img style={{display: "block", width: "400px", height: "300px"}}
                                 src="https://semie.cooking/image/contents/qj/fo/jmyoagfs/126972228vyif.jpg"/>
                            <br/>
                            <span style={{color: "#333333"}}>2. 불을 켜기 전에 재료와 도구를 미리 준비해둔다</span>
                            <br/>
                            <p>
                                요리 방송을 보면 작은 그릇에 미리 준비한 재료를 담아두고 요리를 하는 모습이 나온다.<br/>
                                방송을 위한 설정이라고 생각할 수도 있지만 이렇게 재료를 미리 준비해두면 실제 요리에 큰 도움이 된다.<br/>
                                불을 켜고 조리를 시작한 후 다음 재료를 준비하면 재료를 넣을 적절한 시점을 놓칠 수도 있다.
                            </p>
                            <img style={{display: "block", width: "400px", height: "300px"}}
                                 src="https://www.nongmin.com/-/raw/srv-nongmin/data2/content/image/2020/08/23/.cache/512/20200823176337.jpg"/>
                            <br/>
                            <span style={{color: "#333333"}}>3. 재료를 노릇노릇하게 잘 익히려면 겉에 있는 물기를 제거해야 한다</span>
                            <br/>
                            <p>
                                물기가 흥건한 재료를 팬에 올리면 수분이 다 증발할 때까지 고기 표면 온도가 100도 이상 오르지 않기 때문에 제대로 구워지지 않는다.<br/>
                                키친타월로 재료 겉에 있는 물기를 잘 닦아주는 게 좋다.
                            </p>
                            <img style={{display: "block", width: "400px", height: "300px"}}
                                 src="https://res.heraldm.com/phpwas/restmb_idxmake.php?idx=507&simg=/content/image/2017/04/03/20170403000007_0.jpg"/>
                            <br/>
                            <span style={{color: "#333333"}}>4. 산을 적절히 활용한다</span>
                            <br/>
                            <p>
                                식초, 레몬즙 등 산(Acid)은 맛 균형을 잡고 깊이를 더해준다.<br/>
                                짠맛을 중화하고, 느끼함을 덜어주는 역할도 한다. 간을 봤는데 음식이 너무 짜게 느껴지면
                                식초나 레몬즙 등 신맛이 있는 조미료를 조금 넣으면 된다.
                            </p>
                            <img style={{display: "block", width: "400px", height: "300px"}}
                                 src="https://img.freepik.com/free-photo/woman-staying-at-home-kitchen-and-cooking-shrimps-with-vegetables-on-pan-home-cooking-or-healthy-cooking-concept_1220-6308.jpg"/>
                            <br/>
                            <span style={{color: "#333333"}}>5. 팬에 한 번에 많은 재료를 넣지 않는다</span>
                            <br/>
                            <p>
                                작은 팬에 한 번에 많은 재료를 넣으면 잘 익지 않는다.<br/>
                                온도가 한 번에 떨어지고, 재료에서 빠져나온 수분이 증발하지 않고 고이기 때문이다.
                            </p>
                        </div>
                    </div>
                </>

            </div>
        </>
    );
}
