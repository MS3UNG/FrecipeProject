import {Link} from "react-router-dom";

export default function MattersInquiry() {
    return (
        <>
            <div className="container-fluid fruite pt-5">
                <div className="container pt-5">
                    <div className="tab-class text-center"></div>
                    <div className="tab-content">
                        <div id="tab-1" className="tab-pane fade show p-0 active">
                            <div className="row g-4">
                                <div className="col-lg-12">
                                    <div className="row g-4">
                                        <div className="col-md-6 col-lg-4 col-xl-3 d-flex">
                                            <div
                                                className="rounded position-relative fruite-item d-flex flex-column border border-secondary"
                                                style={{flexGrow: 1}}
                                            >
                                                <div
                                                    className="fruite-img d-flex justify-content-center align-items-center "
                                                    style={{flexGrow: 1}}
                                                >
                                                    <img
                                                        src="/img/free-icon-email-218835.png"
                                                        className="rounded-top"
                                                        style={{maxHeight: "150px", maxWidth: "100%"}}
                                                        alt=""
                                                    />
                                                </div>
                                                <div
                                                    className="p-4  border-top-0 rounded-bottom d-flex flex-column"
                                                    style={{flexGrow: 1}}
                                                >
                                                    <h4>안내사항</h4>
                                                    <p>
                                                        문의 내용을 명확하고 간결하게 적어주시면
                                                        처리 시간이 단축되어 보다 신속하게 답변 드릴 수 있습니다.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-4 col-xl-3 d-flex">
                                            <div
                                                className="rounded position-relative fruite-item d-flex flex-column border border-secondary"
                                                style={{flexGrow: 1}}
                                            >
                                                <div
                                                    className="fruite-img d-flex justify-content-center align-items-center "
                                                    style={{flexGrow: 1}}
                                                >
                                                    <img
                                                        src="/img/free-icon-email-218835.png"
                                                        className="rounded-top"
                                                        style={{maxHeight: "150px", maxWidth: "100%"}}
                                                        alt=""
                                                    />
                                                </div>
                                                <div
                                                    className="p-4  border-top-0 rounded-bottom d-flex flex-column"
                                                    style={{flexGrow: 1}}
                                                >
                                                    <h4>일대일 문의</h4>
                                                    <p>
                                                        찾으시는 질문이 없거나,<br/>
                                                        빠른 답변을 원하신다면 1:1 문의를 이용해주세요.
                                                    </p>
                                                    <Link to="/support/board">
                                                        <div className="text-end">
                                                            <button
                                                                className="btn border border-secondary rounded-pill px-3 text-primary mx-2"
                                                                id="writeBtn"
                                                                type="button"
                                                                style={{border: "1px solid black"}}
                                                            >
                                                                1:1문의
                                                            </button>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-4 col-xl-3 d-flex">
                                            <div
                                                className="rounded position-relative fruite-item d-flex flex-column border border-secondary"
                                                style={{flexGrow: 1}}
                                            >
                                                <div
                                                    className="fruite-img d-flex justify-content-center align-items-center "
                                                    style={{flexGrow: 1}}
                                                >
                                                    <img
                                                        src="/img/free-icon-email-218835.png"
                                                        className="rounded-top"
                                                        style={{maxHeight: "150px", maxWidth: "100%"}}
                                                        alt=""
                                                    />
                                                </div>
                                                <div
                                                    className="p-4  border-top-0 rounded-bottom d-flex flex-column"
                                                    style={{flexGrow: 1}}
                                                >
                                                    <h4>광고 문의</h4>
                                                    <p>
                                                        하단 담당자 이메일에 별도 문의주시면
                                                        빠른 시일 내에 회신드리겠습니다.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-4 col-xl-3 d-flex">
                                            <div
                                                className="rounded position-relative fruite-item d-flex flex-column border border-secondary"
                                                style={{flexGrow: 1}}
                                            >
                                                <div
                                                    className="fruite-img d-flex justify-content-center align-items-center "
                                                    style={{flexGrow: 1}}
                                                >
                                                    <img
                                                        src="/img/free-icon-email-218835.png"
                                                        className="rounded-top"
                                                        style={{maxHeight: "150px", maxWidth: "100%"}}
                                                        alt=""
                                                    />
                                                </div>
                                                <div
                                                    className="p-4  border-top-0 rounded-bottom d-flex flex-column"
                                                    style={{flexGrow: 1}}
                                                >
                                                    <h4>그 외</h4>
                                                    <p>
                                                        기타 건의사항은 담당자에게 직접 문의 바랍니다.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
