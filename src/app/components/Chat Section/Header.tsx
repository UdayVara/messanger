"use client";
import { remove } from "@/app/redux/features/ReceiverSilce";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { MdArrowBackIosNew } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../Sidebar";
import { RootState } from "@/app/redux/store";
import supabase from "@/app/providers/supabaseProvider";
import toast from "react-hot-toast";
type user = {
  username:string,
  email:string,
  password:string,
  id:string
}
function Header() {
  const receiver = useSelector((state:RootState) => state.receiver)
  const dispatch = useDispatch();
  
  const [isOpen,setOpen] = useState<boolean>(false)
  const [user,setUser] = useState<user>()
  const getUser = async() => {
    const res = await supabase.from("users").select().eq("id",receiver.id)
    if (res.error) {
      toast.error("Internal Server Error.")
    } else {
      setUser(res.data[0])
    }
  }
  
  useEffect(()=>{
    getUser()
  },[receiver])
  console.log(user);
  
  return (
    <>
       <>
      <div className={`w-full py-2 px-2 bg-white flex items-center ${user?"translate-y-0":"-translate-y-full"} justify-between transition-all duration-200 origin-right-top dark:bg-neutral-800 dark:border-l`}>
        <div className="flex gap-2 items-center">
          <button
            className="text-2xl text-sky-600 dark:text-white font-bold cursor-pointer"
            onClick={() => {
              dispatch(remove());
            }}
          >
            <MdArrowBackIosNew />
          </button>
          <Image
            src={"/Images/placeholder.jpg"}
            height={1000}
            width={1000}
            className="w-12 rounded-full"
            alt="Failed to load"
          />
          <div className="flex flex-col">
            <h4 className="font-semibold text-lg">{user?.username}</h4>
            <h5 className="text-sm">{user?.email}</h5>
          </div>
        </div>
        <button className="mr-3 text-2xl" onClick={()=>{setOpen(!isOpen)}}>
          <HiDotsVertical />
        </button>
      </div>
      <Sidebar id={receiver.id} username={user?.username as string } email={user?.email as string} isOpen={isOpen} changeState={setOpen} /> </>
    </>
  );
}

export default Header;
