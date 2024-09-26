import Header from "../components/Header";
import Footer from "../components/Footer";
import SupportInquiry from "./SupportInquiry";
import SupportHeadre from "./SupportHeadre";
import MattersInquiry from "../matters/MattersInquiry";
import SupportBoardBody from "./SupportBoardBody";

export default function Support() {
    return (
        <>

            <SupportHeadre/>
            <MattersInquiry/>
            <SupportBoardBody/>

        </>
    );
}
