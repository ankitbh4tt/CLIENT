import React, { useEffect, useRef, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useNavigate } from 'react-router-dom'


const Topbar = ({ username }) => {
    const [isUserMenuOpened, setIsUserMenuOpened] = useState(false)
    const navigate = useNavigate()
    const popoverRef = useRef()
    const handleUserAvatarClick = () => {
        setIsUserMenuOpened(prev => !prev)
    }
    const handleLogoutClick = () => {
        navigate('/logout')
    }

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target)) {
                setIsUserMenuOpened(false)
            }
        }
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick)
    }, [])

    return (
        <div>
            <header className="bg-white border-b p-4 flex justify-between px-8">
                <div>
                    <h2 className="text-xl font-bold">Welcome back, {username}!</h2>
                    <p className="text-gray-500">Here's your financial overview</p>
                </div>
                <div className='relative'>
                    <div onClick={handleUserAvatarClick}>
                        <Avatar className="cursor-pointer">
                            <AvatarImage src="https://github.com/shdadcn.png" />
                            <AvatarFallback>{username.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </div>
                    {
                        isUserMenuOpened &&
                        <div className="absolute right-0 mt-2 w-40 bg-gray-300 rounded shadow-lg z-50" ref={popoverRef}>
                            <div className="absolute -top-2 right-2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-gray-300"></div>

                            <button className="w-full text-left px-4 py-2 cursor-pointer hover:bg-gray-200" onClick={handleLogoutClick}>Logout</button>
                        </div>
                    }
                </div>

            </header>

        </div>
    )
}

export default Topbar
