import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {

    
    // 유저가 보낸 글들을 db 에 저장한다.
    if (req.method == 'POST') {

        if(req.body.title == '' || req.body.content == ''){
            return res.status(400).json('글이 비어있습니다.');
        }

        try{
            const client = await connectDB;
            const db = client.db("nanobot")
            // 오브젝트 형으로 받아오면 도큐먼트 하나 만들어서 저장해준다.

            const posts = await db.collection('post').updateOne(
                { _id :  new ObjectId(req.body.id) },
                { $set : { title : req.body.title, content : req.body.content } }
            );

            res.status(302).redirect('/'); // redirect는 보통 302를 씁니다.
            return; // 함수를 종료하고 싶다면 값 없이 return만 사용


        }catch(e){
            return res.status(400).json('문자열이 아닙니다.');
        }


    }else{
        console.log('GET 요청입니다.');
    }

    res.status(200).json('처리완료');

}
