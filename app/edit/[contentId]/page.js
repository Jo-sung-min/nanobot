import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";


export default async function Edit(props) {
    const params = await props.params;
    
    // 2. 이제 변수에서 contentId를 꺼낼 수 있습니다.
    const contentId = params.contentId;
    
    const client = await connectDB;
    const db = client.db("nanobot");
    const posts = await db.collection('post').findOne({ _id: new 
        ObjectId(contentId) }); 


    return (
        <div>
            <h4>수정 페이지</h4>
            <form action="/api/post/edit" method="POST">
                <input name="id" type="hidden" value={posts._id.toString()} />
                <input name="title" type="text" placeholder="제목" defaultValue={posts.title} /><br />
                <textarea name="content" placeholder="내용" defaultValue={posts.content}></textarea><br />
                <button type="submit">작성완료</button>
            </form>
        </div>
    )

}