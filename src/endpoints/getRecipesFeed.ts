import { Request, Response } from "express";
import Authenticator from "../services/Authenticator";
import UserDB from "../database/UserDatabase";

async function getRecipesFeed(req: Request, res: Response) {
  try {
    const token = req.headers.authorization as string
    const retrieveData = Authenticator.getTokenData(token)

    const userData = await new UserDB().getUserById(retrieveData)

    if(!userData){
      throw new Error('Faça o login primeiro')
    }

    const feed = await new recipesDB().getFeed(userData.id)

    res.status(200).send({
      recipes: feed
    })
    // const authenticator = Authenticator.generateToken() as strin
  } catch (err) {
    res.status(400).send({
      message: err.sqlMessage || err.message
    })
  }
}

export default getRecipesFeed;