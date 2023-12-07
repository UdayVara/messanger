"use client";
import React, { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import supabase from "@/app/providers/supabaseProvider";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type messageType = {
  message: string;
  sender_id: string;
  receiver_id: string;
  is_seen: boolean;
  created_at: string;
  id:number
};

function Body() {
  const [messages, setMessages] = useState<messageType[]>([]);
  const [currentUser, setCurrentUser] = useState<string>("");
  const receiver = useSelector((state: RootState) => state.receiver);
  const router = useRouter();
  const getMessages = async () => {
    const sender_id = (await supabase.auth.getUser()).data.user?.id;
    setCurrentUser(sender_id as string);
    const msgs = await await supabase
      .from("messages")
      .select()
      .in("sender_id", [sender_id, receiver.id])
      .in("receiver_id", [sender_id, receiver.id])
      .order("created_at");
    if (msgs.error) {
      toast.error(msgs.error.message);
    } else {
      setMessages(msgs.data);
      // console.log(msgs.data);
      setTimeout(() => {
        window.document
          .getElementById("chatbox")
          ?.scrollTo(
            0,
            window.document.getElementById("chatbox")?.scrollHeight as number
          );
      }, 200);
    }
  };
  
  supabase
    .channel("Realtime-messages-for-body")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "messages",
      },
      (payload) => {
        getMessages();
        // router.refresh();
      }
    )
    .subscribe();
  
  useEffect(() => {
    getMessages();
  }, [receiver]);
  return (
    <div
      className={`grow overflow-y-auto px-2 flex ${
        messages.length === 0 ? "translate-x-full" : "translate-x-0"
      } dark:bg-neutral-950 flex-col transition duration-300 origin-right`}
      id="chatbox"
    >
      {messages.map((element, index) => {
        return (
          <MessageBox
            key={index}
            id={element.id}
            date={element.created_at}
            currentUser={currentUser}
            sender={element.sender_id}
            reciever={element.receiver_id}
            message={element.message}
            is_seen={element.is_seen}
          />
        );
      })}
    </div>
  );
}

export default Body;
