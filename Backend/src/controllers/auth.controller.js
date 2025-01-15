// here this file help to write a detail function for login logout and sign up , from the routes
// Importing the User model from the specified file path.
// This model is used to interact with the "users" collection in the database.
import User from "../models/user.model.js";

// Importing bcrypt.js library for hashing passwords.
// This is used to securely hash the user's password before storing it in the database.
import bcrypt from "bcryptjs";

//importing the token file
import { generateToken } from "../lib/utils.js";
// Exporting the signup function to handle user registration.
// This function is designed as an asynchronous middleware for an Express.js route.
export const signup = async (req, res) => {
    // Extracting the fullName, email, and password from the incoming request body.
    const { fullName, email, password } = req.body;

    try {
        //to get all fields from the user
        if( !fullName, !email, !password ){
            return res.status(400).json({message: "All the fields are required"})
        }

        // Check if the password is at least 6 characters long.
        if (password.length < 6) {
            // Respond with a 400 status code and an error message if the password is too short.
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        // Check if a user with the same email already exists in the database.
        const user = await User.findOne({ email });

        // If a user with the provided email exists, return a 400 status code with an error message.
        if (user) return res.status(400).json({ message: "Email already exists" });

        // Generate a salt for hashing the password. The number 10 indicates the cost factor.
        const salt = await bcrypt.genSalt(10);

        // Hash the user's password using the generated salt.
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user instance with the provided fullName and email, and the hashed password.
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });

        // Check if the new user instance was created successfully.
        if (newUser) {
            // Placeholder for generating a JSON Web Token (JWT) for authentication.
            // Add logic here to create and return a JWT to the client if required.
            generateToken(newUser._id)
            await newUser.save()

            //scucess message for the signup of newuser
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            })
        } else {
            // Respond with a 400 status code and an error message if the user creation fails.
            res.status(400).json({ message: "Invalid user data" });

            
        }

    } catch (error) {
        // Catch any errors that occur during the signup process and respond with a 500 status code.
        // Send the error message as a response for debugging or logging purposes.
        // res.status(500).json({ message: "Server error", error: error.message });
        console.log("Error in the signup controller", error.message)
        res.status(500).json({message: "Internal server error"})
    }
};



export const login = (req, res) =>{
    res.send("login route")
}

export const logout = (req, res) =>{
    res.send("logout route")
}