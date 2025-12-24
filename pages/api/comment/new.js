import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {

    let session = await getServerSession(req, res, authOptions);
    console.log(session);

    if(!session){
        return res.status(401).json('로그인이 필요합니다.');
    }

    // 유저가 보낸 글들을 db 에 저장한다.
    if (req.method == 'POST') {
        req.body = JSON.parse(req.body);

        let saveData = {
            comment: req.body.comment,  
            author: session.user.email,
            parentId: req.body.parentId ? new ObjectId(req.body.parentId) : null,
            date: new Date()
        }


        if(req.body.title == '' || req.body.content == ''){
            return res.status(400).json('글이 비어있습니다.');
        }

        try{
            const client = await connectDB;
            const db = client.db("nanobot")
            // 오브젝트 형으로 받아오면 도큐먼트 하나 만들어서 저장해준다.
            const comment = await db.collection('comment').insertOne(saveData);
            
            return res.status(200).redirect('/comment/'+ comment.parentId);


        }catch(e){
            return res.status(400).json('문자열이 아닙니다.');
        }


    }else{
        console.log('GET 요청입니다.');
    }

    res.status(200).json('처리완료');

}
