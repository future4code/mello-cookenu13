import knex from "knex";

export abstract class BaseDatabase {
    private static connection: Knex | null = null;

    protected GetConnection () :Knex {
        if(!BaseDatabase.connection)
        {
            BaseDatabase.connection = knex({
                client: "mysql",
                connection: {
                    host: process.env.DB_HOST,
                    port: Number(process.env.DB_PORT || "3306"),
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_NAME,
                },
            })
        }

        return BaseDatabase.connection;
    }

    public static async DestroyConnection(): Promise<void> {
        if(BaseDatabase.connection)
        {
            await BaseDatabase.connection.destroy(); 
            BaseDatabase.connection = null;
        }
    }
}