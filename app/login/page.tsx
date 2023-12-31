'use client'

import { useState, useEffect } from "react"
import { signIn, useSession } from 'next-auth/react'
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"



export default function Login() {
    const session = useSession()
    const router = useRouter()
    const [data, setData] = useState({
        email: '',
        password: ''
    })


    useEffect(() => {
        if (session?.status === 'authenticated') {
            router.push('/')
        }
    })

    const loginUser = async (e) => {
        e.preventDefault()
        signIn('credentials',
            {...data, redirect: false
            })
            .then((callback) => {
                if (callback?.error) {
                    toast.error(callback.error)
                }

                if(callback?.ok && !callback?.error) {
                    toast.success('Logged in successfully!')
                }
            } )
    }

    return (
        <>
            {
                session?.status === "unauthenticated" &&
                    <div className="flex bg-white max-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <div className={"w-full flex-row flex justify-center"}>
                                <img width="67" height="67" src="https://img.icons8.com/external-others-inmotus-design/67/external-M-alphabet-others-inmotus-design-19.png" alt="external-M-alphabet-others-inmotus-design-19"/>
                            </div>
                            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Sign in to your account
                            </h2>
                        </div>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form className="space-y-6" onSubmit={loginUser}>
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
                                            value={data.email}
                                            onChange={e => setData({ ...data, email: e.target.value })}
                                            required
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
                                        Sign in
                                    </button>
                                </div>
                            </form>
                            {/*<h1 className={"text-blue-500"}>Sign into Github below</h1>*/}
                            <div className={"w-full my-2 flex flex-row justify-evenly border-2 border-gray-300 rounded-lg"}>
                                <button onClick={() => signIn('github')} className={"bg-white text-white"}>
                                    <img width="48" height="48" src="https://img.icons8.com/ios-glyphs/60/github.png" alt="github"/>
                                </button>
                            </div>
                            {/*<div className={"w-full my-2 flex flex-row justify-evenly border-2 border-gray-300 rounded-lg"}>*/}
                            {/*    <button onClick={() => signIn('google')} className={"bg-white text-white"}>*/}
                            {/*        <img width="48" height="48" src="https://img.icons8.com/fluency/48/google-logo.png" alt="google-logo"/>                        </button>*/}
                            {/*</div>*/}
                            <p className="mt-10 text-center text-sm text-gray-500">
                                Not a member?{' '}
                                <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                    Register
                                </a>
                            </p>
                        </div>
                    </div>
                    // :
                    // router.push("/")
            }
        </>
    )
}