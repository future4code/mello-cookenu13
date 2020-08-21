import * as jwt from 'jsonwebtoken';

export class Authenticator {
    public static GetExpiresIn(): number {
        return Number(process.env.ACESS_TOKEN_EXPIRES_IN);
    }

    public GenerateToken(data: AuthenticationData) :string {
        return jwt.sign(data, process.env.JWT_KEY as string, {expiresIn: Authenticator.GetExpiresIn()});
    }

    public GetData(token: string) : AuthenticationData {
        const data = jwt.verify(token, process.env.JWT_KEY as string) as any;
        return {
            id: data.id
        }
    }
} 

interface AuthenticationData {
    id: string
}