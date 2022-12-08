import { createContext, useState, useEffect, ReactNode, Dispatch } from "react";
import { isAuthenticated } from "./AuthService";

const UserContext = createContext<UserContextInterface>([{ id: null, nickname: "", email: "" }, () => null]);

export const UserProvider = (props: UserProviderProps) => {
    const [currentUser, setCurrentUser] = useState<User>({ id: null, nickname: "", email: "" });

    useEffect(() => {
        const checkLoggedIn = async () => {
            let userLoggedIn = isAuthenticated();
            if (!userLoggedIn) {
                localStorage.setItem('user', '');
                userLoggedIn = "";
            }

            setCurrentUser(userLoggedIn);
        }

        checkLoggedIn();
    }, []);

    console.log('usercontext', currentUser);

  return (
    <UserContext.Provider value={[ currentUser, setCurrentUser ]}>
        { props.children }
    </UserContext.Provider>
  )
}

type User = {
    id: number | null;
    nickname: string;
    email: string;
}

interface UserProviderProps {
    children: ReactNode;
}

type UserContextInterface = [User, Dispatch<User>];

export default UserContext;