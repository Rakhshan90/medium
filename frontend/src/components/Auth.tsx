// import React from 'react'
import { SignupType } from "@rakhshan90/common-app"
import { Link, useNavigate } from "react-router-dom"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { FormEvent, useState } from "react"
import axios from "axios"
import { backendURL } from "@/config/backendURL"

const Auth = ({ type }: { type: "signup" | "signin" }) => {

    const [signUpInputs, setSignUpInputs] = useState<SignupType>({
        name: "",
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post(`${backendURL}/api/v1/user/${type === 'signup' ? 'signup' : 'signin'}`, signUpInputs)
            const jwt = response.data;
            localStorage.setItem('token', jwt);
            setLoading(false);
            navigate(type === 'signup' ? '/signin' : '/');
        } catch (error) {
            alert("Error in authentication process")
            setLoading(false);
        }
    }

    return (
        <div className="h-screen flex flex-col gap-10 justify-center">

            <div className="flex justify-center">
                <div className="flex flex-col gap-2">
                    <div className="text-4xl font-bold text-center">
                        {type === "signup" ? "Create an account" : "Enter your credentials"}
                    </div>
                    <div className="text-lg text-slate-600 text-center font-semibold">
                        {type === "signup" ? "Already have an account?" : "Don't have an account?"} <Link className="ml-2 underline font-semibold"
                            to={type === "signup" ? '/signin' : '/signup'}>
                            {type === "signup" ? "Login" : "Sign Up"}
                        </Link>
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                <form onSubmit={submitHandler} className="flex flex-col gap-4 w-96">
                    {type === "signup" ? (
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input type="text" id="username" placeholder="Enter your username"
                                onChange={(e) => {
                                    setSignUpInputs(c => (
                                        {
                                            ...c,
                                            name: e.target.value
                                        }
                                    ))
                                }} />
                        </div>
                    ) : null}
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" id="email" placeholder="john@gmail.com"
                            onChange={(e) => {
                                setSignUpInputs(c => (
                                    {
                                        ...c,
                                        email: e.target.value
                                    }
                                ))
                            }} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input type="password" id="password"
                            onChange={(e) => {
                                setSignUpInputs(c => (
                                    {
                                        ...c,
                                        password: e.target.value
                                    }
                                ))
                            }}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        {loading ? (
                            <Button disabled >Loading...</Button>
                        ) : (
                            <Button >{type === 'signup' ? "Sign Up" : "Sign In"}</Button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Auth