import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
    
    // 유저가 보낸 글들을 db 에 삭제한다.
    if (req.method == 'DELETE') {

        //로그인 체크 
        let session = await getServerSession(req, res, authOptions);
        if(!session){
            return res.status(401).json('로그인이 필요합니다.');
        }


        try{

            const client = await connectDB;
            const db = client.db("nanobot");
            const data = JSON.parse(req.body);

            let post = await db.collection('post').findOne({ _id : new ObjectId(data.id) })

            if(post.author !== session.user.email){
                return res.status(401).json('작성자만 삭제할 수 있습니다.');
            }

            let posts = await db.collection('post').deleteOne(  
                { _id :  new ObjectId(data.id) }
            );

            if(posts.deletedCount === 0){
                return res.status(404).json('삭제할 글을 찾지 못했습니다.');
            }
            res.status(200).json('삭제 완료요');
            return; // 함수를 종료하고 싶다면 값 없이 return만 사용

        }catch(e){
            return res.status(400).json('삭제 실패했습니다.');
        }

    }else{
        console.log('GET 요청입니다.');
    }

    res.status(200).json('처리완료');

}
