"use client"
import { useAuth, useUser } from "@clerk/nextjs"

import { useState } from "react";

export const Counter = () => {
    // isLoaded and userId can be used to return null incase the user signed out while the component is still mounted.
    // Sample usage as follows.
    // Be sure to to it after your useState.
    
    // const{ isLoaded, userId, sessionId, getToken } = useAuth()
    console.log("Counter component")
    const [count, setCount] = useState(0)
    //This makes use of useAuth to check if the user is signed in, conditionally renderin content.
    //Similairly, you could use useUserHooks hook as follows:
    //
    // if(!isLoaded || !userId) {
    //     return null;
    // }
    const { isLoaded, isSignedIn, user } = useUser()

        if (!isLoaded || !isSignedIn) {
            return null;
        }
    return (
        <button onClick={() => setCount(count + 1)}>Clicked {count} times</button>
    )
}
