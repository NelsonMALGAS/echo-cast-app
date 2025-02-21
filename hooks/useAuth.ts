import { auth } from "@/db/firebase"
import { ErrorType, StatusType } from "@/types"
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    sendPasswordResetEmail,
    User,
    updateProfile
} from "firebase/auth"
import { useState, useEffect } from "react"

const useAuth = () => {
const [user, setUser] = useState<User | null>(null)
const [loading, setLoading] = useState<boolean>(true)
const [error, setError] = useState<ErrorType | null>({ message: "", statusCode: null })
const [success, setSuccess] = useState<string | null>(null)
const [status , setStatus] = useState<StatusType>("idle")

useEffect(() => {
    setLoading(true)
    setStatus("pending")
    setError({message: "", statusCode: null})
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user)
        setLoading(false)
    })

    setLoading(false)
    setStatus("success")
  

    return () => unsubscribe()

}, [])


/**
 * This function is used to sign in a user
 * 
 * @param email - user email
 * @param password - user password
 */
const handleSignUp = async (email: string, password: string , username:string) => {
    setStatus("pending")
    setLoading(true)
    setError({message: "", statusCode: null})
    try {

        const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredentials.user
        await updateProfile(user, {displayName: username})
        setLoading(false)
        setStatus("success")
        setSuccess("Account created successfully")
        
    } catch (error) {
        if(error instanceof Error){
            setError({message: error.message, statusCode : error.name === "auth/email-already-in-use" ? 400 : null})
            setStatus("error")
        }
    }finally{
      setLoading(false)
    }
}


/**
 * This function is used to sign in a user
 * 
 * @param email - user email
 * @param password - user password
 */
const handleLogin = async (email: string, password: string) => {
    setLoading(true)
    setStatus("pending")
     setError({message: "", statusCode: null})
    try {
        await signInWithEmailAndPassword(auth, email, password)
        setLoading(false)
        setStatus("success")
        setSuccess("Login successful")
    } catch (error) {
        if(error instanceof Error){
            setError({message: error.message, statusCode : error.name === "auth/wrong-password" ? 400 : null})
            setStatus("error")
        }
    }finally{
      setLoading(false)
    }
}

/**
 * This function is used to sign out a user
 */
const handleLogout = async () => {
    setLoading(true)
    setStatus("pending")
    try {
        await signOut(auth)
        setStatus("success")
        setSuccess("Logout successful")
        setStatus("success")
    } catch (error) {
        if(error instanceof Error){
            setError({message: error.message, statusCode : null})
            setStatus("error")
        }
    }finally{
      setLoading(false)
    }
}

/**
 * This function is used to send a password reset email
 * 
 * @param email - user email
 */
const handleSendPasswordResetEmail = async (email: string) => {
    setLoading(true)
    setStatus("pending")
    try {
        await sendPasswordResetEmail(auth, email)
        setStatus("success")
        setSuccess("Password reset email sent")
    } catch (error) {
        if(error instanceof Error){
            setError({message: error.message, statusCode : null})
            setStatus("error")
        }
    }finally{
      setLoading(false)
    }
}

return {
    user,
    loading,
    error,
    success,
    status,
    handleSignUp,
    handleLogin,
    handleLogout,
    handleSendPasswordResetEmail
}


}

export default useAuth