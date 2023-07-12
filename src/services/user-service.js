import { model } from "mongoose";
import { UserSchema } from "../db/schemas/user-schema.js";
import { UserModel } from "../db/models/user-model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const User = model("users", UserSchema);

class UserService {
  constructor() {
    this.userModel = new UserModel();
  }
  // 회원가입된 이메일 주소 찾기
  async findByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }

  // 회원가입된 아이디 검색
  async findById(userId) {
    const user = await User.findOne({ _id: userId });
    return user;
  }

  // 회원 가입
  async addUser(userInfo) {
    const { name, email, password, phone } = userInfo;

    // // email 형식 정규식 (알파벳,숫자 + @ + 알파벳 숫자 + . + 알파벳 숫자)
    // let validEmail =
    //   /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    // // email 형식 확인
    // if (!validEmail(email)) {
    //   throw new Error("이메일 형식이 올바르지 않습니다.");
    // }

    // email 중복 확인
    const userEmail = await this.userModel.findByEmail(email);
    if (userEmail) {
      throw new Error(
        "현재 입력한 이메일은 이미 가입되어있습니다. 다른 이메일을 입력해 주세요."
      );
    }

    // password 길이 오류
    if (!(password.length >= 8 && password.length <= 16)) {
      throw new Error("비밀번호는 8자리 이상 16자리 이하로 가입해야 합니다.");
    }

    // phoen 값 중 '-' 을 자동으로 제거
    phone = phone.replaceAll("-", "");

    // paasword 해쉬화(암호화)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 해쉬화된 paasword를 삽입함
    const newUserInfo = {
      name,
      email,
      password: hashedPassword,
      phone,
    };

    const addNewUser = await User.addUser(newUserInfo);

    return addNewUser;
  }

  // 가입된 모든 유저 출력하기 (admin)
  async findAll() {
    const users = await User.find({});
    return users;
  }

  // 유저 정보 수정하기
  async update({ userId, update }) {
    const filter = { _id: userId };
    const option = { returnOriginal: false };

    const updatedUser = await User.findOneAndUpdate(filter, update, option);
    return updatedUser;
  }

  // 유저 회원탈퇴하기
  async deleteById(userId) {
    const result = await User.deleteOne({ _id: userId });
    return result;
  }

  // 유저 로그인하기
  async login(email, password) {
    const user = await this.userModel.findByEmail({ email: email });

    // 유저가 가입되어 있지 않다면
    if (!user) {
      throw new Error("해당 이메일은 가입되어 있지 않습니다.");
    }

    // 유저의 password가 일치하지 않는다면
    if (user.password !== password) {
      throw new Error("비밀번호가 올바르지 않습니다.");
    }

    // 유저 정보를 확인한 후 토큰 발행(토큰 값은 user_id)
    const token = jwt.sign({ userId: user.user_id }, "mysecretkey", {
      // 토큰의 유효 기간 설정(1일)
      expiresIn: "1d",
    });

    // 로그인이 성공하면 코인 발급 및 유저 정보 반환
    return { token, user };
  }
}

export default UserService;
