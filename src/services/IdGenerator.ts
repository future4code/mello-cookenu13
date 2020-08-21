import { v4 } from 'uuid';

export class IdGenerator {
    public GenerateID(): string {
        return v4();
    }
}