import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiUser, FiLock, FiCheckCircle, FiUserPlus, FiSmile } from 'react-icons/fi'
import useSignup from '../../hooks/useSignup'

// This component renders the signup page with a premium glassmorphic theme
const Signup = () => {
    const {loading, signUp} = useSignup();
    
    const [input, setInput] = useState({
        fullname: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender: "",
    })

    const onSubmit= async (e)=>{
        e.preventDefault();
        await signUp(input)    
    }

    return (
        <div className="min-h-screen min-w-screen flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md bg-slate-900/60 rounded-3xl shadow-2xl backdrop-blur-xl border border-white/10 flex flex-col items-center p-6 md:p-8 transition-all duration-300 hover:shadow-blue-500/5">
                
                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
                        Create Account
                    </h1>
                    <p className="text-white/60 text-sm">
                        Join <span className="text-blue-400 font-semibold">ChatOn</span> and start connecting today
                    </p>
                </div>

                <form className='flex flex-col w-full gap-4' onSubmit={(e)=>onSubmit(e)}>

                    {/* Full Name */}
                    <div>
                        <label className="block text-white/80 text-xs font-semibold uppercase tracking-wider mb-1.5" htmlFor="fullname">Full Name</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-white/40">
                                <FiSmile className="w-5 h-5" />
                            </span>
                            <input
                                id="fullname"
                                type="text"
                                className="w-full pl-11 pr-4 py-2.5 bg-slate-950/40 hover:bg-slate-950/50 focus:bg-slate-950/60 text-white placeholder:text-white/30 border border-white/10 focus:border-blue-500 rounded-2xl outline-none transition-all duration-300 text-sm"
                                placeholder="John Doe"
                                value={input.fullname}
                                onChange={(e)=>setInput({...input, fullname: e.target.value})}
                                required
                            />
                        </div>
                    </div>

                    {/* Username */}
                    <div>
                        <label className="block text-white/80 text-xs font-semibold uppercase tracking-wider mb-1.5" htmlFor="username">Username</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-white/40">
                                <FiUser className="w-5 h-5" />
                            </span>
                            <input
                                id="username"
                                type="text"
                                className="w-full pl-11 pr-4 py-2.5 bg-slate-950/40 hover:bg-slate-950/50 focus:bg-slate-950/60 text-white placeholder:text-white/30 border border-white/10 focus:border-blue-500 rounded-2xl outline-none transition-all duration-300 text-sm"
                                placeholder="johndoe123"
                                pattern="[A-Za-z][A-Za-z0-9\-_]*"
                                minLength="3"
                                maxLength="30"
                                title="Only letters, numbers, dash or underscore"
                                value={input.username}
                                onChange={(e)=>setInput({...input, username: e.target.value})}
                                required
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-white/80 text-xs font-semibold uppercase tracking-wider mb-1.5" htmlFor="password">Password</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-white/40">
                                <FiLock className="w-5 h-5" />
                            </span>
                            <input
                                id="password"
                                type="password"
                                className="w-full pl-11 pr-4 py-2.5 bg-slate-950/40 hover:bg-slate-950/50 focus:bg-slate-950/60 text-white placeholder:text-white/30 border border-white/10 focus:border-blue-500 rounded-2xl outline-none transition-all duration-300 text-sm"
                                placeholder="••••••••"
                                minLength="8"
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                                value={input.password}
                                onChange={(e)=>setInput({...input, password: e.target.value})}
                                required
                            />
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-white/80 text-xs font-semibold uppercase tracking-wider mb-1.5" htmlFor="confirmPassword">Confirm Password</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-white/40">
                                <FiCheckCircle className="w-5 h-5" />
                            </span>
                            <input
                                id="confirmPassword"
                                type="password"
                                className="w-full pl-11 pr-4 py-2.5 bg-slate-950/40 hover:bg-slate-950/50 focus:bg-slate-950/60 text-white placeholder:text-white/30 border border-white/10 focus:border-blue-500 rounded-2xl outline-none transition-all duration-300 text-sm"
                                placeholder="••••••••"
                                minLength="8"
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                                value={input.confirmPassword}
                                onChange={(e)=>setInput({...input, confirmPassword: e.target.value})}
                                required
                            />
                        </div>
                    </div>

                    {/* Gender */}
                    <div>
                        <label className="block text-white/80 text-xs font-semibold uppercase tracking-wider mb-2">Gender</label>
                        <div className="flex gap-4">
                            <label className="flex items-center text-white/80 text-sm cursor-pointer select-none">
                                <input 
                                    type="radio" 
                                    name="gender" 
                                    value="male" 
                                    onClick={(e)=>setInput({...input, gender:e.target.value})} 
                                    className="radio radio-primary radio-sm mr-2 border-white/30 checked:border-blue-500" 
                                    required 
                                />
                                Male
                            </label>
                            <label className="flex items-center text-white/80 text-sm cursor-pointer select-none">
                                <input 
                                    type="radio" 
                                    name="gender" 
                                    value="female" 
                                    onClick={(e)=>setInput({...input, gender:e.target.value})} 
                                    className="radio radio-primary radio-sm mr-2 border-white/30 checked:border-blue-500" 
                                    required 
                                />
                                Female
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-indigo-500/30 transition-all duration-300 active:scale-[0.98] mt-4 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                    >
                        {loading ? (
                            <span className='loading loading-spinner'></span>
                        ) : (
                            <>
                                <FiUserPlus className="w-5 h-5" />
                                <span>Sign Up</span>
                            </>
                        )}
                    </button>

                </form>

                {/* Footer link */}
                <div className="mt-6 text-center text-white/60 text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-400 font-semibold hover:text-blue-300 underline underline-offset-4 transition-colors">
                        Log in
                    </Link>
                </div>
                
            </div>
        </div>
    )
}

export default Signup