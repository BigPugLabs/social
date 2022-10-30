import { createContext, useState } from "react";

const UserContext = createContext()
const UserDispatchContext = createContext()

function UserProvider({ children }) {
    const [userDetails, setUserDetails] = useState({ username: "Guest" })

    return (
        <UserContext.Provider value={userDetails}>
            <UserDispatchContext.Provider value={setUserDetails}>
                {children}
            </UserDispatchContext.Provider>
        </UserContext.Provider>
    )
}

export { UserProvider, UserContext, UserDispatchContext };