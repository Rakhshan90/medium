// import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, User } from "lucide-react"
import logo from '../../public/logo.svg'


const Navbar = () => {
    const navigate = useNavigate();

    const logoutHandler = ()=>{
        localStorage.removeItem('token');
        navigate('/signin');
    }

    return (
        <div className="px-10 py-4 flex justify-between items-center border-b border-gray-200">
            {/* container 1 */}
            <Link to='/' className="font-medium text-xl flex gap-4 items-center">
                <img src={logo} alt="logo-image" className="w-12" />
                <span>Medium</span>
            </Link>

            {/* container 2 */}
            <div className="flex gap-6 items-center">
                <Button onClick={() => navigate('/create-post')} className="rounded-full bg-green-600 text-white">Publish</Button>
                <DropdownMenu>
                    <DropdownMenuTrigger className="">
                        <Avatar>
                            <AvatarImage src="https://i.ibb.co/jhGx9mX/account-circle-55dp-5-F6368-FILL1-wght400-GRAD0-opsz48.png" alt="account-circle-55dp-5-F6368-FILL1-wght400-GRAD0-opsz48" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 mr-14">
                        <DropdownMenuLabel className="w-full">My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator className="w-full" />
                        <DropdownMenuItem className="w-full">
                            <User className="mr-2 h-4 w-4 font-bold" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="w-full" onClick={logoutHandler}>
                            <LogOut className="mr-2 h-4 w-4 text-red-600 font-bold" />
                            <span>Log out</span>
                            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>
        </div>
    )
}

export default Navbar