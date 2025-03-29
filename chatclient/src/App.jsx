import React, { useEffect } from 'react'
import {Routes,Route,Navigate} from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import Setting from './pages/Setting'
import Login from './pages/Login'
import Navbar from './components/navbar'
import { useAuthStore } from './store/userAuthStore'
import { Loader2 } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
const App = () => {
  const {authUser,checkAuth,isCheckingAuth}=useAuthStore();
  useEffect(()=>{
    checkAuth();
  },[checkAuth])
  console.log({authUser})
  if(isCheckingAuth && !authUser)
    return( 
      <div className="fixed inset-0 flex justify-center items-center   z-50">
      <Loader2 className="animate-spin h-12 w-12 text-blue-600" />
    </div>
   )
  return (
    
   <>
   <Navbar/>
   <Routes>
     <Route path="/" exact element={authUser ? <Home />:<Navigate to="/login"/>} />
     <Route path="/signup" element={!authUser ? <SignUp/>:<Navigate to="/"/>}/>
     <Route path="/login" element={!authUser ?<Login />:<Navigate to="/"/>}/>
     <Route path="/settings" element={<Setting/>} />
     <Route path="/profile" element={authUser ?<Profile />:<Navigate to="/login"/>} />
   </Routes>
   <Toaster
   position="top-center"
   reverseOrder={false}
 />
   </>
   
  )
}

export default App