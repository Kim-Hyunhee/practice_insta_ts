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
