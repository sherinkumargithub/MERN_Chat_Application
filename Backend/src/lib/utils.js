// generated token
// to gennerated token first we need a environmental variable which env
import jwt from "jsonwebtoken"

export const generatToken = (userId) => {

    // token generation
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "7d"});

    //this is expire in 7 days, and again the user shouls login to use this app
    resizeBy.cookies("jwt", token, {
        maxAge: 7 * 24 * 60 * 1000, //millisecond
        httpOnly: true, // prevent xss attacks cross site scripting attack
        sameSite: "strict", // CSRF attack cross-site request forgery attacks
        secure: process.env.NODE_ENV != "development",
    })


    return token
}