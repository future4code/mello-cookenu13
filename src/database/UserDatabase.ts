import { BaseDatabase } from './BaseDatabase';

export class UserDataBase extends BaseDatabase{
    private static TABLE_NAME: string = 'User_Cookenu';

    public async CreateUser (id: string, name: string, email: string, password: string) :Promise<void>{
        await this.GetConnection()
        .insert({
            id,
            name,
            email,
            password
        }).into(UserDataBase.TABLE_NAME)
    }

    public async GetUserByEmail (email: string) :Promise<any>{
        const result = await this.GetConnection()
        .select('*')
        .from(UserDataBase.TABLE_NAME)
        .where({
            email
        });

        return result[0];
    }
    
    public async GetUserById (id: string) :Promise<any>{
        const result = await this.GetConnection()
        .select('*')
        .from(UserDataBase.TABLE_NAME)
        .where({
            id
        });

        return result[0];
    }
}