import { useEffect, useState } from "react";

export function useLocalStorage(key,initialValue){
    const [value,setValue] = useState(()=>{
        const storedValue = localStorage.getItem(key)
        try {
            return storedValue?JSON.parse(storedValue):initialValue
        } catch (error) {
            console.error('Failed to parse localstorage item',error)
            return initialValue;
        }
    })

    useEffect(()=>{
        try {
            localStorage.setItem(key,JSON.stringify(value))
        } catch (error) {
            console.error('Failed to save to localStorage',error)
        }
    },[key,value])
    return [value,setValue]
}