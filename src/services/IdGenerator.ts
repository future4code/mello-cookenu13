import { v4 } from 'uuid';
export class IdGenerator {
    public generateID(): string {
        return v4();
    }
}