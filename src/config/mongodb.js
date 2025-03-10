import { MongoClient, ServerApiVersion } from 'mongodb';
import { env } from '~/config/environment';

let eduDatabaseInstance = null;

const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
// Kết nói với Database
export const CONNECT_DB = async () => {
  // Gọi kết nối tới MongoDB Atlas với URI đã khai báo trong thân của mongoClientInstance
  await mongoClientInstance.connect();

  // Kết nói thành công thì lấy ra database theo tên và gán ngược nó ali5 vào biến eduDatabaseInstance ở trên của chúng ta
  eduDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME);
};

// Function Ger_DB (không async) này có nhiệm vụ export ra cái Edu Database Instance sau khi đã connect thành công tới MongoDB để chúng ta sử dụng ở nhiều nơi khác nhau trong code.
// Lưu ý phải đảm bảo chỉ luôn gọi cái GET_DB này sau khi đã kết nối thành công tới MongoDB.
export const GET_DB = () => {
  // Nếu chưa kết nối thì kết nối
  if (!eduDatabaseInstance) throw new Error('Database not connected');
  return eduDatabaseInstance;
};

// Đóng kết nối tới MongoDB Atlas khi cần
export const CLOSE_DB = async () => {
  await mongoClientInstance.close();
};
