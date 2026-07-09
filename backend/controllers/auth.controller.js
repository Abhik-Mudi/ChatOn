import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

// This function handles user signup
// It checks if the passwords match, if the user already exists, hashes the password, and creates a new user
// If successful, it generates a token and sends the user data back in the response
export const signup= async (req, res)=>{
    try {
        const {fullname, username, password, confirmPassword, gender}= req.body;

        if(password !== confirmPassword){
            return res.status(400).send("Passwords don't match")
        }

        const user=await User.findOne({username})

        if(user){ 
            return res.status(200).json({fullname})
        }

        const hashedPassword=await bcrypt.hash(password, 10);
        
        const boyProfilePic=`https://avatar.iran.liara.run/public/boy?username=${username}`  
        const girlProfilePic=`https://avatar.iran.liara.run/public/girl?username=${username}`  

        const newUser=await User.create({
            fullname,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male"? boyProfilePic: girlProfilePic
        })

        if(newUser){
            generateToken(newUser._id, res)
            res.status(201).json({fullname: newUser.fullname, profilePic: newUser.profilePic, id: newUser._id})
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

// This function handles user login
// It checks if the user exists, compares the provided password with the stored hashed password,
// and if successful, generates a token and sends the user data back in the response
export const login=async (req, res)=>{
    try {
        const {username, password}=req.body;
    
        const user=await User.findOne({username})
        if(!user) return res.status(400).json({error: "Invalid Credentials"})

        bcrypt.compare(password, user.password, async function(err, result) {
            if(result){
                await generateToken(user._id, res);
                res.status(201).json({fullname: user.fullname, profilePic: user.profilePic ? user.profilePic: `../public/Profile_avatar_placeholder_large.png`, id: user._id})
            }else{
                res.status(400).json({error: "Invalid Credentials"});
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}

// This function handles user logout
// It clears the JWT cookie and sends a success message back in the response
export const logout=async (req, res)=>{
    try {
        res.cookie("jwt", "", {maxAge: 0});
        res.status(201).json({"message":"Logged Out successfully"})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}