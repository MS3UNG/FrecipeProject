import BoardSearch from "../components/board/BoardSearch";

export default function ImgBoardBody() {
    return (
        <>
            {/* 헤더부분 */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">
                    비법 나눔터
                </h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item">
                        <a href="#">나눔터</a>
                    </li>
                    <li className="breadcrumb-item active text-white">
                        비법 나눔터
                    </li>
                </ol>
            </div>

            {/* 몸통 */}
            <div className="container-fluid testimonial py-5">
                <div className="container py-5">
                    {/* 게시판 제목 */}
                    <div className="testimonial-header text-center">
                        <h4 className="text-primary">Our Recipe</h4>
                        <h1 className="display-5 mb-5 text-dark">
                            Our Recipe Saying!
                        </h1>
                    </div>

                    <div className="boardContainer container">
                        {/* 정렬박스, 검색기능 */}
                        <BoardSearch />
                        <ul className="imgb-list row">
                            <li className="imgb-li col-md-3">
                                <div className="thumb">
                                    <a href="#">
                                        <img src="/img/board-default-img.png" />
                                    </a>
                                </div>
                                <div className="info">
                                    <div className="title">
                                        맛있는 요리 레시피
                                    </div>
                                    <div className="writer">작성자</div>
                                    <div className="popular">추천수</div>
                                </div>
                            </li>
                            <li className="imgb-li col-md-3">
                                <div className="thumb">
                                    <a href="#">
                                        <img src="/img/board-default-img.png" />
                                    </a>
                                </div>
                                <div className="info">
                                    <div className="title">
                                        맛있는 요리 레시피
                                    </div>
                                    <div className="writer">작성자</div>
                                    <div className="popular">추천수</div>
                                </div>
                            </li>
                            <li className="imgb-li col-md-3">
                                <div className="thumb">
                                    <a href="#">
                                        <img src="/img/board-default-img.png" />
                                    </a>
                                </div>
                                <div className="info">
                                    <div className="title">
                                        맛있는 요리 레시피
                                    </div>
                                    <div className="writer">작성자</div>
                                    <div className="popular">추천수</div>
                                </div>
                            </li>
                            <li className="imgb-li col-md-3">
                                <div className="thumb">
                                    <a href="#">
                                        <img src="/img/board-default-img.png" />
                                    </a>
                                </div>
                                <div className="info">
                                    <div className="title">
                                        맛있는 요리 레시피
                                    </div>
                                    <div className="writer">작성자</div>
                                    <div className="popular">추천수</div>
                                </div>
                            </li>
                            <li className="imgb-li col-md-3">
                                <div className="thumb">
                                    <a href="#">
                                        <img src="/img/board-default-img.png" />
                                    </a>
                                </div>
                                <div className="info">
                                    <div className="title">
                                        맛있는 요리 레시피
                                    </div>
                                    <div className="writer">작성자</div>
                                    <div className="popular">추천수</div>
                                </div>
                            </li>
                            <li className="imgb-li col-md-3">
                                <div className="thumb">
                                    <a href="#">
                                        <img src="/img/board-default-img.png" />
                                    </a>
                                </div>
                                <div className="info">
                                    <div className="title">
                                        맛있는 요리 레시피
                                    </div>
                                    <div className="writer">작성자</div>
                                    <div className="popular">추천수</div>
                                </div>
                            </li>
                            <li className="imgb-li col-md-3">
                                <div className="thumb">
                                    <a href="#">
                                        <img src="/img/board-default-img.png" />
                                    </a>
                                </div>
                                <div className="info">
                                    <div className="title">
                                        맛있는 요리 레시피
                                    </div>
                                    <div className="writer">작성자</div>
                                    <div className="popular">추천수</div>
                                </div>
                            </li>
                            <li className="imgb-li col-md-3">
                                <div className="thumb">
                                    <a href="#">
                                        <img src="/img/board-default-img.png" />
                                    </a>
                                </div>
                                <div className="info">
                                    <div className="title">
                                        맛있는 요리 레시피
                                    </div>
                                    <div className="writer">작성자</div>
                                    <div className="popular">추천수</div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <button className="b-Btn">글쓰기</button>
                </div>

                <div className="b-pagination">
                    <button>&lt;</button>
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                    <button>&gt;</button>
                </div>
            </div>
        </>
    );
}
