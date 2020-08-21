import { BaseDatabase } from './BaseDatabase';

export class FollowDataBase extends BaseDatabase{
    private static TABLE_NAME: string = 'Follow_Cookenu';

    public async CreateFollow (follower_id: string, followed_id: string) :Promise<void>{
        await this.GetConnection()
        .insert({
            follower_id,
            followed_id
        }).into(FollowDataBase.TABLE_NAME)
    }

    public async RemoveFollow (follower_id: string, followed_id: string) :Promise<void>{
        await this.GetConnection()
            .delete()
            .from(FollowDataBase.TABLE_NAME)
            .where({
            follower_id: follower_id,
            followed_id: followed_id
        })
    }
}