import { createContext, use, useContext, useState } from 'react'
import { useEffect } from 'react'

const UserContext = createContext()

export function UserProvider({ children }) {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user')
        return storedUser ? JSON.parse(storedUser) : null
    })

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    useEffect(() => {
        if (!user) return
        localStorage.setItem('user', JSON.stringify(user))
    }, [user])

    const login = (userData) => {
        setUser(userData)
    }

    const logout = () => {
        setUser(null)
        localStorage.clear()
    }

    const register = (userData) => {
        setUser(userData)
    }

    return (
        <UserContext.Provider value={{ user, setUser, login, logout, register }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error('useUser must be used within a UserProvider')
    }
    return context
}
