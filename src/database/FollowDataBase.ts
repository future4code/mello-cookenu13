import BaseDB from './BaseDatabase';

export default class FollowDB extends BaseDB{

    static TABLE_NAME: string = 'Follow_Cookenu';

    public async CreateFollow (follower_id: string, followed_id: string) :Promise<void>{
        await this.getConnection()
        .insert({
            follower_id,
            followed_id
        }).into(FollowDB.TABLE_NAME)
    }

    public async RemoveFollow (follower_id: string, followed_id: string) :Promise<void>{
        await this.getConnection()
            .delete()
            .from(FollowDB.TABLE_NAME)
            .where({
            follower_id: follower_id,
            followed_id: followed_id
        })
    }
}