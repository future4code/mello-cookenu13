import { v4 } from "uuid";

export default abstract class IdGenerator {
  static generate(): string {
    return v4()
  }
}