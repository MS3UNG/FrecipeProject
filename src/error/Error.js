export default function ErrorPageMain() {
    return (
        <>
            <div className="container-fluid py-5" style={{marginTop: "200px"}}>
                <div className="container py-5 text-center">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <i className="bi bi-exclamation-triangle display-1 text-secondary"></i>
                            <h1 className="display-1">404</h1>
                            <h1 className="mb-4">원하시는 페이지를 찾을 수 없습니다.</h1>
                            <p className="mb-4">
                                찾으시려는 페이지의 주소가 잘못 입력되었거나,<br/>
                                주소의 변경 혹은 삭제로 인해 사용하실 수 없습니다.<br/>
                                입력하신 페이지의 주소가 정확한지 다시 한번 확인해 주세요.
                            </p>
                            <a
                                className="btn border-secondary rounded-pill py-3 px-5"
                                href="/"
                            >
                                프레시피 홈 가기
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
