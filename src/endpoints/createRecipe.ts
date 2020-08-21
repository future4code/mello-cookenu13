import { Request, Response} from 'express';
import moment from 'moment';
import { IdGenerator } from '../services/IdGenerator';
import { RecipeDataBase } from '../database/RecipeDataBase';
import { Authenticator } from '../services/Authenticator';

export const CreateRecipe = async(req: Request, res: Response) => {
    try{
        const token = req.headers.authorization as string;
        const title = req.body.title;
        const description = req.body.description;

        if(!title || !description ){
            throw new Error('Missing Parameter ' + title + " " + description);
        }

        const idGenerator = new IdGenerator();
        const id = idGenerator.GenerateID();

        const auth = new Authenticator();
        const userID = auth.GetData(token);
        const recipeToken = auth.GenerateToken({id});

        const recipeDataBase = new RecipeDataBase();
        await recipeDataBase.CreateRecipe(id, title, description, moment().toString(), userID.id);

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