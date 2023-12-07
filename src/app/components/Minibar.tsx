"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import supabase from "../providers/supabaseProvider";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { useTheme } from 'next-themes'
function Minibar() {
  const pathname = usePathname();
  const router = useRouter();
  console.log(pathname);
  const handleLogout = async () => {
    const result = await supabase.auth.signOut();

    if (result.error) {
      toast.error(result.error.message);
    } else {
      router.push("/");
    }
  };

  const { theme, setTheme } = useTheme()

  
  return (
    <>
      <div className="h-full w-12 md:flex hidden flex-col border-r-2 border-r-neutral-400 bg-white items-center pt-5 transtion-all duration-75 dark:bg-neutral-800">
        <div className="flex flex-col w-full h-full">
          <Link
            href={"/conversations"}
            className={`${
              pathname === "/conversations" ? "bg-neutral-200 dark:bg-neutral-600" : "bg-white dark:bg-neutral-800"
            } hover:text-sky-600 duration-150 dark:hover:bg-neutral-700  hover:bg-slate-100 w-full h-12 flex items-center justify-center font-semibold text-2xl transition-all`}
          >
            <IoChatbubbleEllipsesOutline />
          </Link>
          <Link
            href={"/users"}
            className={`${
              pathname === "/users" ? "bg-neutral-200 dark:bg-neutral-600" : "bg-white dark:bg-neutral-800 dark:hover:bg-neutral-700  border-neutral-400"
            } hover:text-sky-600 hover:bg-slate-100 w-full h-12 flex items-center justify-center font-semibold duration-150 text-2xl transition-all`}
          >
            <FaUsers />
          </Link>
          <button
            className={` hover:bg-slate-100 dark:bg-neutral-800  border-neutral-400 hover:text-red-600 dark:hover:bg-neutral-700 w-full h-12 flex items-center justify-center font-semibold text-2xl transition-all `}
            onClick={handleLogout}
          >
            <TbLogout2 />
          </button>
        </div>
        <div
          className="mb-3 px-1 cursor-pointer transition-all text-4xl "
          onClick={() => {
            if (theme=="light") {
              setTheme("dark")
            } else {
              setTheme("light")
            }
          }}
        >
          {theme==="dark"?<MdDarkMode className="hover:animate-pulse"  />:<MdLightMode className="hover:animate-spin" />}
        </div>
      </div>
      
    </>
  );
}

export default Minibar;
