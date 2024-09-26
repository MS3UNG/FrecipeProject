import {useState} from "react";
import axios from "axios";

export default function Reply(props) {
    const {writer, nickname, boardNo, parent, getParam} = props

    const [replyContent, setReplyContent] = useState("")
    const replyContentOnChangeHandler =  (e) =>{
        setReplyContent(e.target.value)
    }
    const registerReply = async function (){
        const res = await axios.post("/reply/register",{
            boardNo:boardNo,
            writer:writer,
            nickname:nickname,
            parent:parent,
            content:replyContent,
            depth:1
        })
        alert("정상적으로 등록되었습니다.")
        getParam({reply:true})
    }

    return (
        <>
            <li className="bc-comment replyc">
                <div className="bc-register row">
                    <form>
                        <input type="hidden" value={"지금접속중인사람"}/>
                        <div className="row">
                            <textarea
                                className="bc-write"
                                placeholder="댓글을 입력해보세요."
                                onChange={replyContentOnChangeHandler}
                            />
                            <button type={"button"} onClick={registerReply}>등록</button>
                        </div>
                    </form>
                </div>
            </li>
        </>
    )
}