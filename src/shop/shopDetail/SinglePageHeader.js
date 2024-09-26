import {Link} from "react-router-dom";

export default function SinglePageHeader() {
    return (
        <div className="container-fluid page-header py-5">
            <h1 className="text-center text-white display-6">상품 상세보기</h1>
            <ol className="breadcrumb justify-content-center mb-0">
                <li className="breadcrumb-item">
                    <Link to={"/shop"}>
                        <a href="#">스토어</a>
                    </Link>
                </li>
            </ol>
        </div>
    );
}
