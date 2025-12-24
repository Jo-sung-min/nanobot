'use client';

export default async function Write() {
    return (
        <div>
            <h4>글 작성 페이지</h4>
            <form action="/api/post/new" method="POST">
                <input name="title" type="text" placeholder="제목" /><br />
                <textarea name="content" placeholder="내용"></textarea><br />
                <image src="createObjectURL" alt="이미지 미리보기"/><br />
                <input name="image" type="file" accept="image/*"
                    onChange={()=>{uploadImage(e);}}
                />
                
                <button type="submit">작성완료</button>
            </form>
        </div>
    )

}




async function uploadImage(e){
    await fetch('/api/post/image', {
            method: 'POST',
            body: e.target.files[0]
        }).then((res)=>{        
            if(res.ok){
                return res.json();
            }
        }).then((result)=>{
            console.log(result);
        })
}