import { MongoClient } from 'mongodb'


const url = 'mongodb+srv://wings1761:tjdals17@nanobot-db.nysvpfk.mongodb.net/nanobot?retryWrites=true&w=majority'

let connectDB

if (process.env.NODE_ENV === 'development') {
  // 개발 중일 때는 서버가 재시작될 때마다 DB 연결이 중복되는 것을 방지합니다.
  if (!global._mongo) {
    global._mongo = new MongoClient(url).connect()
  }
  connectDB = global._mongo
} else {
  // 실제 배포(Production) 시에는 매번 새로 연결해도 무방합니다.
  connectDB = new MongoClient(url).connect()
}

export { connectDB }