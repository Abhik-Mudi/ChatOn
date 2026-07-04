import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiUser, FiLock, FiLogIn } from 'react-icons/fi'
import useLogin from '../../hooks/useLogin'

// This component renders the login page with a premium glassmorphic theme
const Login = () => {
    const {loading, login}=useLogin()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const onSubmit=async (e)=>{
        e.preventDefault()
        await login(username, password)
    }

    return (
        <div className="min-h-screen min-w-screen flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md bg-slate-900/60 rounded-3xl shadow-2xl backdrop-blur-xl border border-white/10 flex flex-col items-center p-6 md:p-10 transition-all duration-300 hover:shadow-blue-500/5">
                
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-white/60 text-sm">
                        Log in to continue chatting with <span className="text-blue-400 font-semibold">ChatOn</span>
                    </p>
                </div>

                <form className='flex flex-col w-full gap-5' onSubmit={(e)=>onSubmit(e)}>

                    {/* Username */}
                    <div>
                        <label className="block text-white/80 text-xs font-semibold uppercase tracking-wider mb-2" htmlFor="username">Username</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-white/40">
                                <FiUser className="w-5 h-5" />
                            </span>
                            <input
                                id="username"
                                value={username}
                                onChange={(e)=>setUsername(e.target.value)}
                                type="text"
                                className="w-full pl-11 pr-4 py-3 bg-slate-950/40 hover:bg-slate-950/50 focus:bg-slate-950/60 text-white placeholder:text-white/30 border border-white/10 focus:border-blue-500 rounded-2xl outline-none transition-all duration-300 text-sm"
                                placeholder="Enter your username"
                                pattern="[A-Za-z][A-Za-z0-9\-_]*"
                                minLength="3"
                                maxLength="30"
                                title="Only letters, numbers or dash"
                                required
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-white/80 text-xs font-semibold uppercase tracking-wider mb-2" htmlFor="password">Password</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-white/40">
                                <FiLock className="w-5 h-5" />
                            </span>
                            <input
                                id="password"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                type="password"
                                className="w-full pl-11 pr-4 py-3 bg-slate-950/40 hover:bg-slate-950/50 focus:bg-slate-950/60 text-white placeholder:text-white/30 border border-white/10 focus:border-blue-500 rounded-2xl outline-none transition-all duration-300 text-sm"
                                placeholder="Enter your password"
                                minLength="8"
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-indigo-500/30 transition-all duration-300 active:scale-[0.98] mt-4 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                    >
                        {loading ? (
                            <span className='loading loading-spinner'></span>
                        ) : (
                            <>
                                <FiLogIn className="w-5 h-5" />
                                <span>Sign In</span>
                            </>
                        )}
                    </button>

                </form>

                {/* Footer link */}
                <div className="mt-8 text-center text-white/60 text-sm">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-400 font-semibold hover:text-blue-300 underline underline-offset-4 transition-colors">
                        Sign up free
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login