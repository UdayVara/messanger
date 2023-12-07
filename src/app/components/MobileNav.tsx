"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import supabase from "../providers/supabaseProvider";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

function MobileNav() {
  const pathname = usePathname();
  const router = useRouter();
  const receiver = useSelector((state: RootState) => state.receiver);
  const handleLogout = async () => {
    const result = await supabase.auth.signOut();

    if (result.error) {
      toast.error(result.error.message);
    } else {
      router.push("/");
    }
  };
  return (
    <>
      {receiver.id === "" && (
        <div className=" w-full md:hidden flex dark:bg-neutral-800  bg-white border">
          <Link
            href={"/conversations"}
            className={`${
              pathname === "/conversations" ? "bg-neutral-200 dark:bg-neutral-700" : "bg-white dark:bg-neutral-800"
            } hover:text-sky-600 hover:bg-slate-100  w-full h-12 flex items-center justify-center font-semibold text-2xl border`}
          >
            <IoChatbubbleEllipsesOutline />
          </Link>
          <Link
            href={"/users"}
            className={`${
              pathname === "/users" ? "bg-neutral-200 dark:bg-neutral-700" : "bg-white dark:bg-neutral-800"
            } hover:text-sky-600 hover:bg-slate-100  w-full h-12 flex items-center justify-center font-semibold text-2xl border`}
          >
            <FaUsers />
          </Link>
          <button
            className={` hover:bg-slate-100 hover:text-red-600 w-full h-full flex items-center justify-center font-semibold text-2xl border`}
            onClick={handleLogout}
          >
            <TbLogout2 />
          </button>
        </div>
      )}
    </>
  );
}

export default MobileNav;
