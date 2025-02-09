import { createContext } from "react";
import useAuth from "../hooks/useAuth";

const Context = createContext()

function ServantProvider({ children }) {
    const { authenticaded,logout, login } = useAuth()
    return (
        <Context.Provider value={{ authenticaded,logout, login }}>
            {children}
        </Context.Provider>
    )
}

export { Context, ServantProvider }
