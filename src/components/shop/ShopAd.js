export default function ShopAd() {
    return (
        <div className="col-lg-12">
            <div className="position-relative">
                <img
                    src="/img/banner-fruits.jpg"
                    className="img-fluid w-100 rounded"
                    alt=""
                />
                <div
                    className="position-absolute"
                    style={{
                        top: "50%",
                        right: "10px",
                        transform: "translateY(-50%)",
                    }}
                >
                    <h3 className="text-secondary fw-bold">
                        Fresh <br /> Fruits <br /> Banner
                    </h3>
                </div>
            </div>
        </div>
    );
}
