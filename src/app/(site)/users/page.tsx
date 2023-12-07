"use client";
import React, { useEffect } from "react";
import EmptyState from "../../components/EmptyState";
import MobileNav from "@/app/components/MobileNav";
import Minibar from "@/app/components/Minibar";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import ChatSection from "@/app/components/Chat Section/ChatSection";
import Userbar from "@/app/components/Userbar";
import { redirect, usePathname } from "next/navigation";
import toast from "react-hot-toast";
function Page() {
  const receiverId = useSelector((state: RootState) => state.receiver);
  const loggedUser = useSelector((state:RootState)=>state.user)
  const path = usePathname()
  useEffect(()=>{
    if(loggedUser.id === ""){
      toast.error("Login Required")
      redirect("/")
    }
  },[])
  return (
    <>
      {loggedUser.id !== "" && <div className="flex md:flex-row flex-col w-full h-screen dark:bg-black">
        <Minibar />
        <Userbar all={path==="/users"?true:false} />
        {receiverId.id === "" ? <EmptyState /> : <ChatSection />}
        <MobileNav />
      </div>}
    </>
  );
}

export default Page;
