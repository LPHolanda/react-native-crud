import { User } from "../models/User";

export type UserAction =
| { type: 'createUser'; payload: User }
| { type: 'updateUser'; payload: User }
| { type: 'deleteUser'; payload: User };