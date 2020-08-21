import { Request, Response } from "express";
import HashManger from "../services/HashManager"
import UserDB from "../database/UserDatabase"
import Authenticator from "../services/Authenticator"

export default async function (req: Request, res: Response) {

  try {

    const { email, password } = req.body
    const user = await new UserDB().getUserByEmail(email)
    const passwordIsCorrect = await new HashManger().compare(password, user.password)

    if(!user || !passwordIsCorrect) {
      throw new Error("Usuário ou senha incorretos.")
    }

    const token = Authenticator.generateToken({
      id: user.id
    })

    res
      .status(200)
      .send({
        message: "Usuário logado.",
        token
      })

  }catch (err) {
    res
      .status(400)
      .send({
        message: err.sqlMessage || err.message
      })
  }
}