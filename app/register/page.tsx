'use client'

import React, { useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

export default function Register() {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const router=useRouter();
    const session=useSession()
    const registerUser = async (e) => {
        e.preventDefault()
        const response = await axios.post('http://localhost:3000/api/register', data)
            .then(() => toast.success('User has been registered!'))
            .catch(() => toast.error('Something went wrong!'))
        console.log(response)
    }

    return (
        <>
            {
                session?.status === "unauthenticated" &&
                    <div className="bg-white w-full h-full flex flex-col justify-center px-6 py-12 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <div className={"w-full flex-row flex justify-center"}>
                                <img width="67" height="67" src="https://img.icons8.com/external-others-inmotus-design/67/external-M-alphabet-others-inmotus-design-19.png" alt="external-M-alphabet-others-inmotus-design-19"/>
                            </div>
                            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Register for an account
                            </h2>
                        </div>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form className="space-y-6" onSubmit={registerUser}>
                                <div>
                                    <label htmlFor="name" className="block text-lg font-medium leading-6 text-gray-900">
                                        Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            required
                                            value={data.name}
                                            onChange={e => setData({ ...data, name: e.target.value })}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-lg font-medium leading-6 text-gray-900">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            value={data.email}
                                            onChange={e => setData({ ...data, email: e.target.value })}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="block text-lg font-medium leading-6 text-gray-900">
                                            Password
                                        </label>
                                        <div className="text-sm">
                                            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                                Forgot password?
                                            </a>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            value={data.password}
                                            onChange={e => setData({ ...data, password: e.target.value })}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Register
                                    </button>
                                </div>
                            </form>

                            <p className="mt-10 text-center text-sm text-gray-500">
                                Already a member?{' '}
                                <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                    Login
                                </a>
                            </p>
                        </div>
                    </div>
                
            }
        </>
    )
}