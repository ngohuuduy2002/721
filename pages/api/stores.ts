import { NextApiRequest, NextApiResponse } from "next";
import { User, generateUsers } from "../../lib/store/data";

// Khởi tạo dữ liệu người dùng bên trong hàm handler
const stores: User[] = generateUsers(500);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(stores);
}
