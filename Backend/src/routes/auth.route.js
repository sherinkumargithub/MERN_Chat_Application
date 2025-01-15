import express from "express"; // Import the express module to use its routing features.

// 4 importing all the contrllers functions
import {login, logout, signup} from "../controllers/auth.controller.js"

const router = express.Router(); // Create a router instance to group and manage routes.

/*
router.get("/signup", (req, res) => { // Define a POST route for "/signup".
    res.send("signup route"); // Send a simple text response: "signup route".
});
*/
router.post("/signup", signup)

router.post("/login", login);

router.post("/logout", logout);

export default router; // Export the router instance so it can be imported into other files.

//3 HERE now shifting all the logics to the controller section, for better code handleing
