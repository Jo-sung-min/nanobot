import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import Comment from "./Comment";


export default async function DetailContent(props) {
// 1. params를 await로 기다려 변수에 담습니다.
  const params = await props.params;
  
  // 2. 이제 변수에서 contentId를 꺼낼 수 있습니다.
  const contentId = params.contentId;
  
  const client = await connectDB;
  const db = client.db("nanobot");
  const posts = await db.collection('post').findOne({ _id: new 
    ObjectId(contentId) }); 

    console.log(params);
 

  return (
    <div className="list-bg">
      <h4>상세페이지</h4>
      {
        posts && ( 
          <div className="list-item">
            <h4>{posts.title}</h4>   
            <p>{posts.content}</p>
          </div>
        )  
      }
      <Comment contentId={contentId.toString()} />
    </div> 
  )
} 