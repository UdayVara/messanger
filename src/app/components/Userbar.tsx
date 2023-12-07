"use client";
import React, { useEffect, useState } from "react";
import Usercard from "./Usercard";
import supabase from "../providers/supabaseProvider";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useTheme } from "next-themes";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { close, open } from "../redux/features/UsernameSlice";
type user = {
  email: string;
  id: string;
  username: string;
  status: string;
};
function Userbar({ all }: { all: boolean }) {
  const [users, setUsers] = useState<user[]>([]);
  const [isOpen,setOpen] = useState<boolean>(false)
  const loggedUser = useSelector((state: RootState) => state.user);
  const receiver = useSelector((state: RootState) => state.receiver);
  const userModal = useSelector((state:RootState)=>state.modal)
  const {theme,setTheme} = useTheme()
  const dispatch = useDispatch()
  const getUsers = async () => {
    let currentUser = loggedUser.id;
    // console.log(currentUser)
    if (currentUser !== "") {
      if (all) {
        const users = await supabase
          .from("users")
          .select()
          .neq("id", loggedUser.id);

        if (users.error) {
          toast.error(users.error.message);
        } else {
          // console.log(users.data);
          setUsers(users.data);
        }
      } else {
        const sentToUsers: { sender_id: string }[] = (
          await supabase
            .from("messages")
            .select("sender_id")
            .eq(" receiver_id", currentUser)
        ).data as { sender_id: string }[];
        // console.log(sentToUsers)
        const recFromUsers: { receiver_id: string }[] = (
          await supabase
            .from("messages")
            .select("receiver_id")
            .eq("sender_id", currentUser)
        ).data as { receiver_id: string }[];

        let filteredArray: string[] = [];
        if (sentToUsers) {
          for (let index = 0; index < sentToUsers.length; index++) {
            if (!filteredArray.includes(sentToUsers[index].sender_id)) {
              filteredArray.push(sentToUsers[index].sender_id);
            }
          }
        }
        if (recFromUsers) {
          for (let index = 0; index < recFromUsers.length; index++) {
            if (!filteredArray.includes(recFromUsers[index].receiver_id)) {
              filteredArray.push(recFromUsers[index].receiver_id);
            }
          }
        }

        // console.log(filteredArray);
        const users = await supabase
          .from("users")
          .select()
          .in("id", [...filteredArray])
          .neq("id", currentUser);
        if (users.error) {
          toast.error(users.error.message);
        } else {
          // console.log(users.data);
          setUsers(users.data);
        }
      }
    }
  };

  supabase
    .channel("Realtime-users-Event")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "users",
      },
      (payload) => {
        getUsers();
        // router.refresh()
      }
    )
    .subscribe();
  supabase
    .channel("Realtime-users-for-users")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "messages",
      },
      (payload) => {
        getUsers();
        // router.refresh()
      }
    )
    .subscribe();


  useEffect(() => {
    getUsers();
  }, [all]);
  return (
    <div
      className={`h-full md:w-72 md:flex-shrink-0  w-full bg-white dark:bg-neutral-800  flex-col ${
        receiver.id === "" ? "md:flex " : "md:flex hidden"
      } md:grow-0 grow`}
    >
      <div className="flex justify-between items-center relative">
        <h3 className="font-semibold dark:text-white  text-3xl md:my-3 pt-2 pb-1 pl-2" >
          Messenger
        </h3>
        <h3 className="text-2xl font-semibold cursor-pointer" onClick={()=>{setOpen(!isOpen)}}>
          <HiDotsVertical />
        </h3>
        <div className={`absolute w-[180px]  ${isOpen?"scale-100":"scale-0"} top-14  right-0 transition-all duration-300 origin-top-right dark:bg-neutral-800 z-20`} id="dropdown">
          <h3 className="text-lg bg-white  md:pl-3 border-y-2 py-2 dark:bg-neutral-800 hover:dark:bg-neutral-700 hover:bg-slate-100 cursor-pointer " onClick={()=>{dispatch(open());setOpen(false)}}>Change Username</h3>
          <h4 className="text-lg bg-white  md:pl-3 border-y-2 py-2 dark:bg-neutral-800 hover:dark:bg-neutral-700 hover:bg-slate-100 cursor-pointer " onClick={()=>{if (theme==="light") {
            setTheme("dark")
          } else {
            setTheme("light")
          }}}>Change Theme</h4>
        </div>
        {/* <div
          className="mb-3 px-1 cursor-pointer transition-all text-2xl pt-2 md:hidden block "
          onClick={() => {
            if (theme=="light") {
              setTheme("dark")
            } else {
              setTheme("light")
            }
          }}
        >
          {theme==="dark"?<MdDarkMode className="hover:animate-pulse"  />:<MdLightMode className="hover:animate-spin" />}
        </div> */}
      </div>
      <hr className="h-1 bg-neutral-300" />
      <div className="w-full flex flex-col overflow-y-auto overflow-x-hidden">
        {users.map((element, index) => {
          return (
            <Usercard
              key={index}
              username={element.username}
              status={element.status}
              id={element.id}
              email={element.email}
            />
          );
        })}

        {users.length === 0 && <h3 className="text-center mt-10 text-xl">No Recent Chats Found.</h3>}
      </div>
    </div>
  );
}

export default Userbar;
