import { Request, Response } from "express"
import Authenticator from "../services/Authenticator"
import UserDB from "../database/UserDatabase"

async function getUserById (req: Request, res: Response) {
  try{
    const userId = req.params.id

    const retrievedData = Authenticator.getTokenData(req.headers.authorization as string)

    const userData = new UserDB().getUserById(retrievedData)

    if(!userData) {
      throw new Error('Faça login primeiro.')
    }

    if(!userId) {
      throw new Error('Formato da id está incorreto')
    }

    const seekUserData = await new UserDB().getUserById(userId)

    res.status(200).send({
      id: seekUserData.id,
      name: seekUserData. name,
      email: seekUserData.email
    })
  } catch (err) {
    res.status(400).send({
      message: err.sqlMessage || err.message
    })
  }
  
}

export default getUserById;