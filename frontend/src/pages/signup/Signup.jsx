import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useSignup from '../../hooks/useSignup'

// This component renders the signup page
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
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-cover bg-center">
            <div className="w-[90%] md:w-full max-w-md bg-white/20 rounded-xl shadow-lg backdrop-blur-md border border-white/30 flex flex-col items-center px-6 py-4 md:px-8 md:py-6">
                <h1 className="text-2xl font-bold text-white mb-1">
                    Signup <span className='text-blue-300'>ChatOn</span>
                </h1>
                <form className='flex flex-col w-full' onSubmit={(e)=>onSubmit(e)}>

                    {/* Full Name */}
                    <div>
                        <label className="block text-white mb-1" htmlFor="fullname">Full Name</label>
                        <input
                            id="fullname"
                            type="text"
                            className="input input-bordered w-full bg-white/60 text-black placeholder:text-gray-500"
                            placeholder="Full Name"
                            value={input.fullname}
                            onChange={(e)=>setInput({...input, fullname: e.target.value})}
                            required
                        />
                    </div>

                    {/* Username */}
                    <div>
                        <label className="block text-white mb-1" htmlFor="username">Username</label>
                        <input
                            id="username"
                            type="text"
                            className="input input-bordered w-full bg-white/60 text-black placeholder:text-gray-500"
                            placeholder="Username"
                            pattern="[A-Za-z][A-Za-z0-9\-_]*"
                            minLength="3"
                            maxLength="30"
                            title="Only letters, numbers, dash or underscore"
                            value={input.username}
                            onChange={(e)=>setInput({...input, username: e.target.value})}
                            required
                        />
                        <p className="text-[10px] hidden text-gray-200 mt-1">
                            Must be 3 to 30 characters containing only letters, numbers or dash
                        </p>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-white mb-1" htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            className="input input-bordered w-full bg-white/60 text-black placeholder:text-gray-500"
                            placeholder="Password"
                            minLength="8"
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                            value={input.password}
                            onChange={(e)=>setInput({...input, password: e.target.value})}
                            required
                        />
                        <p className="text-[10px] hidden text-gray-200 mt-1">
                            Must be more than 8 characters, including at least one number, one lowercase letter, and one uppercase letter
                        </p>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-white mb-1" htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            className="input input-bordered w-full bg-white/60 text-black placeholder:text-gray-500"
                            placeholder="Confirm Password"
                            minLength="8"
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                            value={input.confirmPassword}
                            onChange={(e)=>setInput({...input, confirmPassword: e.target.value})}
                            required
                        />
                    </div>

                    {/* Gender */}
                    <div>
                        <label className="block text-white">Gender</label>
                        <div className="flex gap-4">
                            <label className="flex items-center text-white">
                                <input type="radio" name="gender" value="male" onClick={(e)=>setInput({...input, gender:e.target.value})} className="radio radio-xs mr-2" required />
                                Male
                            </label>
                            <label className="flex items-center text-white">
                                <input type="radio" name="gender" value="female" onClick={(e)=>setInput({...input, gender:e.target.value})} className="radio radio-xs mr-2" required />
                                Female
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn w-full h-10 bg-white text-black border-[#e5e5e5] mt-2 hover:bg-blue-100 transition">
                        {loading ? <span className='loading loading-spinner'></span> : <><svg aria-label="Email icon" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="black"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></g></svg>
                        Sign Up</>}
                    </button>

                </form>

                <div className="mt-4 text-white text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-300 underline hover:text-blue-400">
                        Login
                    </Link>
                </div>
                
            </div>
        </div>
    )
}

export default Signup