import {useState} from "react";
import axios from "axios";

export default function AnswerModify(props) {
    const {content, no, getParam} = props;
    const [contentM, setContentM] = useState(content);
    const modifyContentOnChangeHandler = (e) =>{
        setContentM(e.target.value);
    }
    const modifyComment = async function (){
        const res = await axios.post("/chobo/modifyA",{
            content: contentM,
            id:no
        })
        alert("정상적으로 수정되었습니다.")
        getParam({open:false})
    }

    return (
        <>
            <li className="bc-comment replyc">
                <div className="bc-register row">
                    <form>
                        <div className="row">
                            <textarea className="bc-write" onChange={modifyContentOnChangeHandler} value={contentM}>
                            </textarea>
                            <button type={"button"} onClick={modifyComment}>등록</button>
                        </div>
                    </form>
                </div>
            </li>
        </>
    );
}
