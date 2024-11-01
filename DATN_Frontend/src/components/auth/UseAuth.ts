import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth } from "../../firebase"


const UseAuth = () => {
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        const stateChanged = onAuthStateChanged(auth, (user: any) => {
            if (user) {
                setCurrentUser(user)
            } else {
                setCurrentUser(null)
            }
        })

        return stateChanged
    }, [])
    return currentUser
}

export default UseAuth