import Slider from "../components/Slider";

export default function TestimonialMain() {
    return (
        <div className="container-fluid testimonial py-5">
            <div className="container py-5">
                <div className="testimonial-header text-center">
                    <h4 className="text-primary">Our Testimonial</h4>
                    <h1 className="display-5 mb-5 text-dark">
                        Our Client Saying!
                    </h1>
                </div>

                <Slider />
            </div>
        </div>
    );
}
