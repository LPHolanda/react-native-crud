import { createContext, useReducer } from "react";
import { UserAction } from "../@types/userAction";
import { users } from '../data/users';
import { User } from '../models/User';

// const defaultUser: User = { id: 0, name: '', email: '', avatarUrl: '' };
// const UsersContext = createContext<{ state: { users: User[] } }>({ state: { users: [defaultUser]} });
const initialState: { users: User[] } = { users: users };
const UsersContext = createContext<{ 
    state: { users: User[] },
    dispatch: React.Dispatch<UserAction>;
} | null>(null);

const actions = {
    createUser(state: { users: User[] }, action: UserAction) {
        const user = action.payload;
        user.id = Math.random();
        return {
            ...state,
            users: [...state.users, user]
        }
    },
    updateUser(state: { users: User[] }, action: UserAction) {
        const updated = action.payload;
        return {
            ...state,
            users: state.users.map(u => u.id === updated.id ? updated : u)
        }
    },
    deleteUser(state: { users: User[] }, action: UserAction) {
        const user = action.payload;
        return {
            ...state,
            users: state.users.filter(u => u.id !== user.id)
        }
    },
}

export const UsersProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {

    function reducer(state: { users: User[] }, action: UserAction) {
        const fn = actions[action.type];
        return fn ? fn(state, action) : state;
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <UsersContext.Provider value={{ state, dispatch }}>
            {children}
        </UsersContext.Provider>
    )
}

export default UsersContext;