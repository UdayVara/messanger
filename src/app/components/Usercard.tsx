"use client";
import Image from "next/image";
import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { set } from "../redux/features/ReceiverSilce";
import supabase from "../providers/supabaseProvider";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";
import { RootState } from "../redux/store";
function Usercard({
  username,
  status,
  id,
  email,
}: {
  username: string;
  status: string;
  id: string;
  email: string;
}) {
  const [notification, setNotification] = useState<number>(0);
  const loggedUser = useSelector((state: RootState) => state.user);
  const receiver = useSelector((state:RootState)=>state.receiver)
  const dispatch = useDispatch();
  const setReciever = () => {
    dispatch(set(id));
  };
  const checkMessages = async () => {
    if (id !== "") {
      const { data, error } = await supabase
        .from("messages")
        .select()
        .match({ sender_id: id, is_seen: false });
      if (error) {
        toast.error(error.message);
      }
      if (data) {
        console.log(data.length);
        setNotification(data.length);
      }
    }
  };
  supabase
    .channel("Realtime-messages-for-notification")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "messages",
      },
      (payload) => {
        console.log("Message incoming");
        console.log(payload);
        checkMessages()
      }
    )
    .subscribe();

  useEffect(() => {
    checkMessages();
  }, [receiver.id]);
  return (
    <>
      <div
        onClick={setReciever}
        className="w-full flex bg-slate-50 gap-2 items-center py-3 hover:bg-slate-100 dark:bg-neutral-800 dark:border cursor-pointer border-2 pl-2 dark:border-neutral-700 relative"
      >
        <Image
          src={"/Images/placeholder.jpg"}
          width={1000}
          height={1000}
          className="w-12 rounded-full"
          alt="Failed to Load Image"
        />
        <div className="flex flex-col">
          <h3 className="text-md font-semibold">{username}</h3>
          <h4 className="text-sm">{email}</h4>
        </div>
        <h3
          id={`${id}-notification`}
          className={`bg-blue-600 absolute rounded-full p-1 flex items-center justify-center w-7 h-7 top-2 ${
            notification === 0 ? "scale-0" : "scale-100"
          } transition shadow shadow-sky-700 text-white right-2`}
        >
          {notification}
        </h3>
      </div>
      <hr />
    </>
  );
}

export default Usercard;
