import { model } from "mongoose";
import { UserSchema } from "../schemas/user-schema.js";
import jwt from "jsonwebtoken";

const User = model("users", UserSchema);

export class UserModel {
  // 로그인 로직 (email, paasword)
  async login(email, password) {
    // 이메일과 비밀번호를 확인하고 로그인 성공 시 토큰을 발급합니다.
    const user = await User.findOne({ email });

    // 로그인 성공
    if (user && user.password === password) {
      // 토큰을 발급합니다.
      const token = jwt.sign({ userId: user.user_id }, "mysecretkey", {
        expiresIn: "1h",
      });

      return token;
    } else {
      // 로그인 실패
      throw new Error("로그인에 실패");
    }
  }

  async findByEmail(email) {
    const user = await User.findOne({ email });

    return user;
  }

  async findById(userId) {
    const user = await User.findOne({ user_id: userId });
    return user;
  }

  async addUser(name, email, password, phone) {
    const addNewUser = await User.addUser(name, email, password, phone);

    return addNewUser;
  }

  async findAll() {
    const users = await User.find({});
    return users;
  }

  async update({ userId, update }) {
    const filter = { user_id: userId };
    const option = { returnOriginal: false };

    const updatedUser = await User.findOneAndUpdate(filter, update, option);
    return updatedUser;
  }

  async deleteById(userId) {
    const result = await User.deleteOne({ user_id: userId });
    return result;
  }
}
