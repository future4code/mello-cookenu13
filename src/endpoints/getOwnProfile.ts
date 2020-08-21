import { Request, Response } from "express";
import Authenticator from "../services/Authenticator"
import UserDB from "../database/UserDatabase";

async function getOwnProfile (req: Request, res: Response) {
  try {
    const retrievedData = Authenticator.getTokenData(req.headers.authorization as string)
    const userData = await new UserDB().getUserById(retrievedData.id)

    if(!userData) {
      throw new Error('Faça login primeiro.')
    }

    res.status(200).send({
      id: userData.id,
      name: userData.name,
      email: userData.email
    })
  } catch (err) {
    res.status(400).send({
      message: err.sqlMessage || err.message
    })
  }
}

export default getOwnProfile;