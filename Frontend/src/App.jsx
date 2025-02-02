import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
// importing the navbar component
import Navbar from './components/Navbar'
//importing the some pages
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import SettingPage from './pages/SettingPage'
import ProfilePage from './pages/ProfilePage'
import { useAuthStore } from './store/useAuthStore'
//importing lucide-react for the load page
import {Loader} from "lucide-react"
   
const App = () => {

  const {authUser, checkAuth, isCheckingAuth} = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  console.log({authUser})

  if(isCheckingAuth && !authUser)
  // if(true)
     return(
    <div className="flex items-center justify-center h-screen">
      {/* here we are using loader from lucide-react */}
      <Loader className='size-10 animate-spin'/>
     </div>
  ) 

  return (
    <>

     <Navbar />

     <Routes>
      {/* if a non authericed person directly redirect to the login page */}
        <Route path="/" element={authUser ? <HomePage/> : <Navigate to= "/login"/>} />
        <Route  path='/signup' element = {!authUser ?<SignUpPage/> : <Navigate to="/"/>} />
        <Route  path='/login' element = {!authUser ?<LoginPage/> : <Navigate to="/"/>} />
        <Route  path='/settings' element = {<SettingPage/>} />
        <Route  path='/profile' element = {authUser ? <ProfilePage/> : <Navigate to= "/login"/>} />
      </Routes>

     

    </>
  )
}

export default App 