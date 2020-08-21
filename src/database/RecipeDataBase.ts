import BaseDB from './BaseDatabase';
import moment from 'moment';

export default class RecipeDB extends BaseDB{
    static TABLE_NAME: string = 'Recipe_Cookenu';

    public async CreateRecipe (id: string, title: string, description: string, created_at: string, created_by: string) :Promise<void>{
        await this.getConnection()
        .insert({
            id,
            name,
            description,
            created_at,
            created_by
        }).into(RecipeDB.TABLE_NAME)
    }
    
    public async GetRecipeById (id: string) :Promise<any>{
        const result = await this.getConnection()
        .select('*')
        .from(RecipeDB.TABLE_NAME)
        .where({
            id
        });

        return result[0];
    }
}