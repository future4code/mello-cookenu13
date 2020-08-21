import { Request, Response} from 'express';
import moment from 'moment';
import Authenticator from '../services/Authenticator';
import IdGenerator from '../services/IdGenerator';
import RecipeDB from '../database/RecipeDatabase';

export const CreateRecipe = async(req: Request, res: Response) => {
    try{
        const token = req.headers.authorization as string;
        const title = req.body.title;
        const description = req.body.description;

        if(!title || !description ){
            throw new Error('Missing Parameter ' + title + " " + description);
        }

        const id =  IdGenerator.generate();

        const userId = Authenticator.getTokenData(token)
        const recipeToken = Authenticator.generateToken({id});

        const recipeDatabase = new RecipeDB()
        await recipeDatabase.CreateRecipe(id, title, description, moment().toString(), userId.id);

        res.status(200).send({
            message: "Recipe Created",
            recipeToken
        })


    }catch (e) {
        res.status(400).send({
            message: e.message
        })
    }
}