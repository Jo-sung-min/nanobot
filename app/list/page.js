import { connectDB } from "@/util/database";
import ListItem from "./ListItem";

export const dynamic = 'force-dynamic';
// export const revalidate = 600;

export default async function List() {

  const client = await connectDB;
  const db = client.db("nanobot");
  let posts = await db.collection('post').find().toArray();
  
  // _id를 문자열로 변환하는 핵심 코드
  posts = posts.map((post) => {
    post._id = post._id.toString();
    return post;
  });

  return (
    <div className="list-bg">
      <ListItem posts={posts} />
    </div>
  )
} 