import BaseDB from "./BaseDatabase";
import moment from "moment";
import RecipeDB from "./RecipeDatabase";
import FollowDB from "./FollowDatabase";

export default class UserDB extends BaseDB {
  static tableName = "User_Cookenu"

  async createUser(
    id: string,
    name: string,
    email: string,
    password: string
  ) {
    await this.getConnection()
      .insert({id, name, email, password})
      .into(UserDB.tableName)

      await this.destroyConnection()
  }

  async getUserByMail(email: string) {
    const result = await this.getConnection()
      .select('*')
      .from(UserDB.tableName)
      .where({email})

      await this.destroyConnection()

      return result[0]
  }

  async getUserById(id: string) {
    const result = await this.getConnection()
      .select('*')
      .from(UserDB.tableName)
      .where({id})

      await this.destroyConnection()

      return result[0]
  }

  async getFeed(id: string): Promise<any> {
    const result = await this.getConnection()
      .raw(`SELECT r.id, r.title, r.description, r.created_at as createdAt, uc.followed_id as followedId, u.name as userName
      FROM ${RecipeDB.TABLE_NAME} r JOIN ${FollowDB.TABLE_NAME} uc ON r.created_by = uc.followed_id
      JOIN ${UserDB.tableName} u ON uc.followed_id = u.id
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