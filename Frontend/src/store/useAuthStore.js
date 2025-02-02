// this file is created for store the changes in global state using zustand
import {create} from "zustand"
import { axiosInstance } from "../lib/axious.js" 

//This Zustand store manages authentication state.
export const useAuthStore = create((set) =>({
    //set will work in initial stage which is before authenticate
    //initialy dont know weather the user is authenticated or not
    authUser: null,
    //initialy the user is not signin up and login
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    //checking if the user is authenticated
    isCheckingAuth: true,

    //to check the auth when the page got refresh
    checkAuth: async() => {
        try {
            //this logic for the result is be written in server side, check function
            const res = await axiosInstance.get("/auth/check")

            set({authUser:res.data})
        } catch (error) {
            //for debugging purpose
            console.log("Error in checkAuth:", error)
            set({authUser:null})
        } finally {
            set({isCheckingAuth: false})
        }
    }
}))