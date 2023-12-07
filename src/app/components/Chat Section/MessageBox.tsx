"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import supabase from "@/app/providers/supabaseProvider";
import toast from "react-hot-toast";
type messageProps = {
  message: string;
  sender: string;
  reciever: string;
  currentUser: string;
  date: string;
  id:number
  is_seen: boolean;
};
function MessageBox({
  message,
  sender,
  id,
  reciever,
  currentUser,
  is_seen,
  date,
}: messageProps) {
  let receiver = useSelector((state: RootState) => state.receiver);

  const sendDate = new Date(date);

  const updateStatus = async () => {
    if (is_seen===false && sender !== currentUser) {
      console.log(is_seen,sender,message,currentUser,id);
      
      const res = await supabase
        .from("messages")
        .update({ is_seen: true })
        .eq("id",id)

      if (res.error) {
        toast.error(res.error.message);
      }
      console.log(res);
    }
  };
  
  useEffect(() => {
    updateStatus();
  }, []);
  return (
    <>
      {/* <p className={`text-xs ${
          currentUser === sender
            ? " ml-auto pl-2"
            : " mr-auto pr-2 "
        }`}> {sendDate.getHours()>12?(sendDate.getHours()-12<10?` 0${sendDate.getHours()-12}`: sendDate.getHours()-12):(sendDate.getHours()<10?" 0"+sendDate.getHours(): sendDate.getHours())}-
        {sendDate.getMinutes()<10?`0${sendDate.getMinutes()}`:sendDate.getMinutes()}

        {sendDate.getHours()<12?" AM":" PM"}
        
        {sendDate.getDate()<=9?` 0${sendDate.getDate()}`: sendDate.getDate()}
        -
        {sendDate.getMonth()<8?`0${sendDate.getMonth()+1} `:sendDate.getMonth()+1 }
        -{sendDate.getFullYear()} 
           
          
          </p> */}
      <div
        className={`inline-block  px-2 py-1 rounded-3xl text-lg shadow my-1 min-w-[150px] lg:max-w-[55%] md:max-w-[65%] max-w-[80%] ${
          currentUser === sender
            ? "bg-blue-600 ml-auto text-white my-2"
            : "bg-neutral-300 mr-auto dark:bg-neutral-600 "
        }`}
      >
        {message}
      </div>
    </>
  );
}

export default MessageBox;
