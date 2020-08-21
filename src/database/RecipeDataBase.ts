import { BaseDatabase } from './BaseDatabase';
import { Moment } from 'moment';

export class RecipeDataBase extends BaseDatabase{
    private static TABLE_NAME: string = 'Recipe_Cookenu';

    public async CreateRecipe (id: string, title: string, description: string, created_at: string, created_by: string) :Promise<void>{
        await this.GetConnection()
        .insert({
            id,
            name,
            description,
            created_at,
            created_by
        }).into(RecipeDataBase.TABLE_NAME)
    }
    
    public async GetRecipeById (id: string) :Promise<any>{
        const result = await this.GetConnection()
        .select('*')
        .from(RecipeDataBase.TABLE_NAME)
        .where({
            id
        });

        return result[0];
    }
}