'use client';

import { useEffect, useState } from "react";



export default function Comment(props) {
    let [comment , setComment] = useState('');
    let [data, setData] = useState([]);

    useEffect(()=>{
        fetch('/api/comment/list?parentId='+props.contentId).then(r=> r.json())
            .then((result)=>{
                setData(result);
            })
    },[]);


  return (
    <div>
        <div>댓글목록 보여줄 부분</div>
        {
            data.length > 0 ?
            data.map((a,i)=>{
                return (
                    <div key={i}>
                        <p>{a.comment}</p>
                    </div>
                )
            })
            : <div>로딩딩동</div>
        }
        <input onChange={(e)=>{
            setComment(e.target.value);
        }} type="text" placeholder="댓글입력창"></input>
        <button onClick={()=>{
            console.log(comment);
            fetch('/api/comment/new', {
                method: 'POST',
                body: JSON.stringify({
                    comment: comment,
                    parentId: props.contentId
                })
            }).then((res)=>{
                if(res.ok){
                    alert('댓글작성완료');
                }  
            })
        }}>댓글작성</button>
    </div>
  )
}



