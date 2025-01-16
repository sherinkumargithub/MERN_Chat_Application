import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const protectRoute = async (req, res, next) =>{
    try {
        //check the token is present
        const token = req.cookies.jwt;

        //if token is not true
        if(!token){
          return res.status(401).json({message:"Unotherized - no token provided"})
        }

        //decode the token if it is provided
        // to check the token is valid or not
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded){
            return res.status(401).json({message:"Unotherized - Invalid token"})
        }

        //and finaly find the user from the database
        const user = await User.findById(decoded.userId).select("-password");
        if(!user) {
           return res.status(404).json({ message: "User not found" });
        }

        req.user = user

        next()

       } catch (error) {
        console.log("Error in the protectRoute middleware:", error.message)
        res.status(500).json({message:"Internal server error"})
      }

}