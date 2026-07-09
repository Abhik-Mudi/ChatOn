import jwt from "jsonwebtoken"

// This function generates a JWT token for the user
const generateToken=(userId, res)=>{
    const token=jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "15d"
    })

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 *1000,
        httpOnly: true,
        sameSite: process.env.NODE_ENV==="development" ? "strict" : "none",
        secure: process.env.NODE_ENV!=="development",
    })
}

export default generateToken;