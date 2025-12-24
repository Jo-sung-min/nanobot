import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {

    let session = await getServerSession(req, res, authOptions);
    console.log(session);

    // 유저가 보낸 글들을 db 에 저장한다.
    if (req.method == 'GET') {

        try{
            const client = await connectDB;
            const db = client.db("nanobot")
            // 해당글의 댓글 가져오기
            // const result = await db.collection('comment').findOne(req.body.ObjectId);
            const result = await db.collection('comment')
            .find({parentId: new ObjectId(req.query.parentId)})
            .toArray();

            return res.status(200).json(result);

        }catch(e){
            return res.status(400).json('문자열이 아닙니다.');
        }


    }else{
        console.log('GET 요청입니다.');
    }

    res.status(200).json('처리완료');

}
