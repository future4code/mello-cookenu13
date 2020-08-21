import { Request, Response } from "express";
import IdGenerator from "../services/IdGenerator"
import HashManger from "../services/HashManager"
import UserDB from "../database/UserDatabase"
import Authenticator from "../services/Authenticator"

async function signUp(req: Request, res: Response){
  try {
    const { name, email, password } = req.body
    const id = IdGenerator.generate()

    if(!name || !email || !password) {
      throw new Error("\"name\", \"email\" e \"password\" são obrigatórios.")
    }
    
    const cypherText = await new HashManger().hash(password)

    await new UserDB().createUser(id, name, email, cypherText)

    const token = Authenticator.generateToken({id})

    res
      .status(200)
      .send({
        message: "Usuário criado.",
        token
      });
  } catch (err) {
    res
      .status(400)
      .send({
        message: err.message || err.sqlMessage
      })
  }
}

export default signUp;