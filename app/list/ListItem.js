'use client'

import Link from "next/link";
import DetailLink from "./DetailLink";

export default function ListItem(props) {
    return (
        <div>
            {
                props.posts.map(post => (
                    <div className="list-item" key={post._id}>
                        <Link href={`/detail/${post._id}`}><h4>{post.title}</h4></Link>
                        <Link href={`/edit/${post._id}`} className="list-btn">수정</Link>
                        <DetailLink/>
                        <button onClick={(event)=>{ deleteList(post._id,event) }}>🗑️</button>
                        <p>{post.content}</p>
                    </div>
                ))  
            }
        </div>
    )
}   


function deleteList(id,event) {
    fetch('/api/post/delete', {
        method: 'DELETE',   
        body: JSON.stringify({ id: id })
    })
    .then((res) => res.json())
    .then(() => {
        // 1. 애니메이션 시작 (CSS transition이 작동함)
        const targetElement = event.target.parentElement;
        targetElement.style.opacity = '0';

        // 2. 애니메이션이 끝나는 시간(1초) 뒤에 요소를 완전히 제거
        setTimeout(() => {
            targetElement.style.display = 'none';
            alert('삭제되었습니다.');
        }, 1000);

    });
}
