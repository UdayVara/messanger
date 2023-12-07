"use client"
import Image from "next/image";
import React from "react";
import { GrClose } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
import supabase from "../providers/supabaseProvider";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { remove } from "../redux/features/ReceiverSilce";
import { RootState } from "../redux/store";


function Sidebar({
  isOpen,
  id,
  changeState,
  username,
  email
}: {
  isOpen: boolean;
  changeState: React.Dispatch<React.SetStateAction<boolean>>,
  username:string,
  id:string,
  email:string;
}) {
  const dispatch = useDispatch()
  const loggedUser = useSelector((state:RootState)=>state.user)
  let container = window.document.getElementById("sidebar");
  if (isOpen) {
    document.body.addEventListener("click", (e: MouseEvent) => {
      if (!container?.contains(e.target as Node)) {
        changeState(!isOpen);
      }
    });
  }
  const deleteChats = async() => {
    const res1 = await supabase.from("messages").delete().match({sender_id:loggedUser.id,receiver_id:id})
    const res2 = await supabase.from("messages").delete().match({sender_id:id,receiver_id:loggedUser.id})

    if (res1.error) {
      toast.error(res1.error.message)
    }

    if(res2.error){
      toast.error(res2.error.message)
    }

    dispatch(remove())
    changeState(!isOpen)
  }
  return (
    <>
      <div
      id="sidebar"
        className={`h-full fixed shadow-lg right-0 z-20 top-0 md:w-[300px] w-[270px] max-w-[80vw] border dark:border-0 dark:bg-neutral-700 bg-white ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition duration-300  `}
      >
        <button
          className=" text-black flex items-center text-xl p-2 border shadow-sm dark:text-white "
          onClick={() => {
            changeState(false);
          }}
        >
          <GrClose />
        </button>
        <div className="px-16">
          <Image
            width={1000}
            height={1000}
            alt="Failed To Load"
            src={"/Images/placeholder.jpg"}
            className="w-100 rounded-full"
          />
          <h3 className="text-center mt-7 font-semibold text-xl">{username}</h3>
          <h3 className="text-center  font-semibold text">
            {email}
          </h3>
          <button className="mt-10 flex w-full items-center gap-1 text-xl dark:text-red-500 text-rose-700 justify-center" onClick={deleteChats}>
            Delete <MdDeleteOutline />
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
