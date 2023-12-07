"use client";
import React, { useState } from "react";
import { MdOutlineAttachFile } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import toast from "react-hot-toast";
import supabase from "@/app/providers/supabaseProvider";

function Footer() {
  const [msg, setMsg] = useState<string>("");
  const [flag, setFlag] = useState(false);
  const receiver = useSelector((state: RootState) => state.receiver);
  const sender = useSelector((state:RootState)=>state.user)
  const sendMessage = async () => {
    if (msg === "") {
      toast.error("Message Cannot be Empty.");
    } else {
      const newMsg = await supabase.from("messages").insert({
        message: msg,
        sender_id: sender.id,
        receiver_id: receiver.id,
        is_seen:false
      });

      if (newMsg.error) {
        toast.error(newMsg.error.message);
      } else {
        toast.success("Sent Successfully.");
        window.document
          .getElementById("chatbox")
          ?.scrollTo(
            0,
            window.document.getElementById("chatbox")?.scrollHeight as number
          );
        setMsg("");
      }
    }
  };
  setTimeout(() => {
    setFlag(true)
  }, 1100);
  return (
    <>
      <div className={`w-full dark:bg-neutral-800 dark:border-l bg-white scale-0 ${flag?"scale-100":"scale-0"} transition-all origin-bottom-left duration-500  flex items-center pt-1 gap-1 px-1`}>
        <div className="text-2xl relative px-3 hover:bg-slate-100 py-4 ">
          <input
            type="file"
            name=""
            className="absolute  w-full opacity-0 z-0"
            id=""
          />
          <MdOutlineAttachFile className="z-10 " />
        </div>
        <div className="w-full">
          <textarea
            rows={1}
            name="msg"
            id="msg"
            className="focus:outline-none border border-neutral-500 w-full rounded-3xl  py-2 px-3 text-lg "
            value={msg}
            onChange={(e) => {
              setMsg(e.target.value);
            }}
            placeholder="Enter Your Message"
          />
        </div>
        <button
          className="bg-sky-600 text-white font-semibold rounded-full text-2xl p-3"
          onClick={sendMessage}
        >
          <IoSend />
        </button>
      </div>
    </>
  );
}

export default Footer;
