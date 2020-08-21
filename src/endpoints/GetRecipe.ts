import { Request, Response } from 'express';
import RecipeDB from '../database/RecipeDatabase';
import Authenticator from '../services/Authenticator';


export const GetRecipe = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;

        const recipeDataBase = new RecipeDB();
        const recipe = await recipeDataBase.GetRecipeById(id);

        res.status(200).send({
            id: recipe.id,
            name: recipe.name,
            description: recipe.description,
            createdAt: recipe.created_at
        })

    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }

    
}