"use client";
import supabase from "@/app/providers/supabaseProvider";
import { close } from "@/app/redux/features/UsernameSlice";
import { RootState } from "@/app/redux/store";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

function UpdateUsername() {
  const modalState = useSelector((state: RootState) => state.modal);
  const currentUser = useSelector((state:RootState)=>state.user)
  const dispatch = useDispatch()
  const [username,setUsername] = useState<string>("")

  const changeUsername = async() =>{
    if(username === ""){
      toast.error("Username Cannot be Empty",{
        position:"top-right"
      })
    }else{
      const {data,error} = await supabase.from("users").update({username:username}).eq("id",currentUser.id)

      if (error) {
        toast.error(error.message)
      } else {
        toast.success("Username Updated Successfully.")
        dispatch(close())
      }
    }
  }
  return (
    <>
      
        <div id="mainModal"
          className={`w-full h-full fixed top-0 flex justify-center ${
            modalState.isOpen === true ? "translate-y-0" : "-translate-y-full"
          } duration-500 z-20 backdrop-blur-sm backdrop-opacity-80`}
        >
          <div className="bg-white dark:bg-neutral-700 rounded dark:border-0 h-max px-3 py-4 border shadow-lg w-[450px] max-w-[85vw]">
            <h4 className="text-xl font-semibold">Change Username </h4>
            <div className="flex flex-col mt-2">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                className="py-1 px-2 border-2 shadow rounded border-neutral-300"
              />
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button className="py-1 px-4 text-lg shadow bg-rose-600 hover:bg-rose-800 dark:text-rose-600 dark:bg-neutral-700 dark:border dark:border-rose-600 dark:hover:bg-rose-600 dark:hover:text-white transition text-white rounded" onClick={()=>{dispatch(close())}} id="modalCloseBtn">
                Close
              </button>
              <button className="py-1 px-4 text-lg shadow border border-black rounded dark:bg-white dark:text-black hover:bg-slate-100" onClick={changeUsername}>
                Save
              </button>
            </div>
          </div>
        </div>
    
    </>
  );
}

export default UpdateUsername;
