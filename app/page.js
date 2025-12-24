import { connectDB } from '@/util/database';

export default async function Home() {

  const client = await connectDB;
  const db = client.db("nanobot")
  const posts = await db.collection('post').find().toArray();

  return (
    <div>
      {
        posts.map(post => (
          <div key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))
      }
    </div>
  );
}  