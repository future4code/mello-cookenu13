import BaseDatabase from './BaseDatabase';
import moment from 'moment' 
import FollowDB from './FollowDatabase';
import RecipeDB from './RecipeDatabase';

export default class UserDB extends BaseDatabase{
    private static TABLE_NAME: string = 'User_Cookenu';

    public async createUser (id: string, name: string, email: string, password: string) :Promise<void>{
        await this.getConnection()
        .insert({
            id,
            name,
            email,
            password
        }).into(UserDB.TABLE_NAME)
    }

    public async getUserByEmail (email: string) :Promise<any>{
        const result = await this.getConnection()
        .select('*')
        .from(UserDB.TABLE_NAME)
        .where({
            email
        });

        return result[0];
    }
    
    public async getUserById (id: string) :Promise<any>{
        const result = await this.getConnection()
        .select('*')
        .from(UserDB.TABLE_NAME)
        .where({
            id
        });

        return result[0];
    }

    async getFeed(id: string): Promise<any> {
      const result = await this.getConnection()
        .raw(`SELECT r.id, r.title, r.description, r.created_at as createdAt, uc.followed_id as followedId, u.name as userName
        FROM ${RecipeDB.TABLE_NAME} r JOIN ${FollowDB.TABLE_NAME} uc ON r.created_by = uc.followed_id
        JOIN ${UserDB.TABLE_NAME} u ON uc.followed_id = u.id
        WHERE uc.follower_id = "${id}"
        ORDER BY r.created_at DESC`
      )
  
    const newArray = result[0].map((recipe: {createdAt: number}) => {
      return {
        ...recipe,
        createdAt: moment.unix(recipe.createdAt/100).format("DD/MM/YYYY")
      }
    })

  
    await this.destroyConnection()
    
    return newArray
  }
}