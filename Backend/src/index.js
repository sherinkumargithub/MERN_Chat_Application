// const express = require("express")
import express from "express";
// 2 - whenever we do login, log out this file will me called
import authRoutes from "./routes/auth.route.js"
import dotenv from "dotenv"
import {connectDB} from "./lib/db.js"



const app = express()
dotenv.config()
// the port env by importing dotenv
const PORT = process.env.PORT

// for the user to provide data and we can able to modify it later using this middleware function
app.use(express.json())

// 1 - defining routes for the authentication -  here this below line act as a bridge between other routes to this index.js file
app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
    console.log("Server is running on PORT:" + PORT)
    connectDB()
})
  