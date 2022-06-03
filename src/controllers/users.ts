import { Request, Response } from "express";
import brcrypt from "bcrypt";

import conn from "../database/index";

// 회원 가입
export const postUsers = async function (req: Request, res: Response) {
  const { user_name, password, memo, name } = req.body;
  const query = `SELECT * FROM user WHERE user_name = ?;`;
  const [rows]: any = await conn.query(query, [user_name]);

  if (rows.length) {
    return res
      .status(409)
      .send({ success: false, message: "중복된 이메일이 존재합니다." });
  }

  const salt = await brcrypt.genSalt();
  const hashedPW = await brcrypt.hash(password, salt);

  const query2 = `INSERT INTO user(user_name, password, salt, memo, name) VALUES(?, ?, ?, ?, ?);`;
  await conn.query(query2, [user_name, hashedPW, salt, memo, name]);
  res.send(true);
};

// 로그인
export const postUsersToken = async function (req: Request, res: Response) {
  const { user_name, password } = req.body;
  const query = `SELECT id, user_name, password, salt FROM user WHERE user_name = ?;`;
  const [rows]: any = await conn.query(query, [user_name]);

  if (rows.length === 0) {
    return res
      .status(401)
      .send({ success: false, message: "존재하지 않는 사용자입니다." });
  }

  const user = rows[0];
  const { salt } = user;

  const hashedPW = await brcrypt.hash(password, salt);
  if (user.password !== hashedPW) {
    return res
      .status(401)
      .send({ success: false, message: "비밀번호가 틀렸습니다." });
  }
};
