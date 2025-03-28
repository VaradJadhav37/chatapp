import {create} from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast';
export const useAuthStore=create((set)=>({
    authUser:null,
    isSignedUp:false,
    isLoggedIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    checkAuth:async()=>{
        try{
            const res=await axiosInstance.get("/auth/check");
            set({authUser:res.data})
        }
        catch(error){
            console.log("Error in checkAuth",error)
            set({authUser:null})
        }
        finally{
            set({isCheckingAuth:false})
        }
    },
    signup:async (data) => {
        set({isSignedUp:true})
    try{
        const res=await axiosInstance.post("/auth/signup",data);
        set({authUser:res.data});
        toast.success("Account Created Successfully")
    }
    catch(error) {
        console.log("Error in signup", error);
        toast.error(error.response.data.message)
    }
}
    
}));