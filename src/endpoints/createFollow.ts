import { Request, Response} from 'express';
import { Authenticator } from '../services/Authenticator';
import { FollowDataBase } from '../database/FollowDataBase';

export const CreateFollow = async(req: Request, res: Response) => {
    try{
        const token = req.headers.authorization as string;
        const followed_id = req.body.userToFollowId;

        if(!followed_id){
            throw new Error('Missing Parameter ' + followed_id);
        }

        const auth = new Authenticator();
        const authData = auth.GetData(token);

        const followDataBase = new FollowDataBase();
        await followDataBase.CreateFollow(authData.id, followed_id);

        res.status(200).send({
            message: "Follow Created",
            token
        })


    }catch (e) {
        res.status(400).send({
            message: e.message
        })
    }
}