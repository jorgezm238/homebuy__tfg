import { useContext } from 'react'
import { AuthContext } from '../context/auth'

export function useAuth() {
    const { token, user, logout, setUser } = useContext(AuthContext)

    const isAuth = () => {
        if (token === null) {
            return false
        }

        return true
    }

    return {
        isAuth,
        user,
        setUser,
        token,
        logout
    }
}
