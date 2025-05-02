import { createContext, useState, useEffect } from 'react'
import Storage from '../services/storage'
import { logoutUser } from '../services/account'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        setToken(Storage.get('token'))
        setUser(Storage.get('user'))
    }, [])

    const logout = async () => {
        try {
            const response = await logoutUser()

            setToken(null)
            setUser(null)

            return response
        } catch(err) {
            throw(err)
        }
    }

    return (
        <AuthContext.Provider value={{
            token,
            setToken,
            user,
            setUser,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}
