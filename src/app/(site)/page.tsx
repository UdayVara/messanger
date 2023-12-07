"use client";
import supabase from "@/app/providers/supabaseProvider";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { login } from "../redux/features/UserSlice";
function Page(): React.ReactNode {
  const router = useRouter();
  const dispatch = useDispatch()
  const [data, setData] = useState({ email: "", password: "" });
  const [variant, setVariant] = useState<string>("login");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email)) {
      toast.error("Enter a valid Email");
      return;
    }

    if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        data.password
      )
    ) {
      toast.error(
        "Length of password must be atleast 8 characters and it should contain 1 number, 1 special character"
      );
      return;
    }

    if (variant === "signup") {
      const result = await supabase.auth.signUp({
        email: data.email,
        password: data.email,
      });
      if (result.error) {
        toast.error(result.error.message);
      } else {
        toast.success(
          "Confirmation Email sent.After confirming you can login."
        );
        setVariant("login")
      }
    } else {
      const result = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.email,
      });

      if (result.error) {
        toast.error(result.error.message);
      } else {
        toast.success("Login Successfully.");
        const users_id = await (await supabase.auth.getUser()).data.user?.id as string
        dispatch(login(users_id))
        router.push("/conversations");
      }
    }
  };

  const handleGithub = async () => {
    const result = await supabase.auth.signInWithOAuth({
      provider: "github",
    });

    if (result.error) {
      toast.error("Internal Server Error.");
    }
  };

  const handleGoole = async () => {
    const result = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };
  const checkUser = async () => {
    
    let user = await supabase.auth.getSession() ;
    if (user.data.session) {
      dispatch(login(user.data.session.user.id))
      router.push("/conversations");
    }
  };
  useEffect(() => {
    checkUser();
  }, [variant]);
  return (
    <>
      <div className="w-full h-full flex items-center justify-center">
        {variant === "login" || variant === "signup" ? (
          <div className="px-5 rounded-md w-full flex flex-col items-center max-w-md ">
            <Image
              src={"/Images/logo.png"}
              alt="Logo"
              className="w-16"
              width={1000}
              height={1000}
            />
            <h4 className="text-2xl font-semibold mt-4 capitalize">
              {variant} to Messanger
            </h4>
            <div className="w-full h-full dark:bg-neutral-800 bg-white px-6 pt-4 pb-8 text-lg mt-4 rounded flex gap-2 flex-col">
              
              <div className="flex flex-col">
                <label htmlFor="username" className="font-semibold">
                  Email :{" "}
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="border-2 dark:border py-1 px-1 rounded text-lg focus:outline-sky-400"
                  autoComplete="off"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="password" className="font-semibold">
                  Password :{" "}
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="border-2 dark:border py-1 px-1 rounded text-lg focus:outline-sky-400"
                  autoComplete="off"
                  onChange={handleChange}
                />
              </div>

              <button
                className="bg-sky-500 text-white py-2 hover:bg-sky-600 rounded-md hover:rounded-3xl transition-all capitalize"
                onClick={handleSubmit}
              >
                {variant}
              </button>
              <div className="flex items-center">
                <hr className="grow bg-neutral-600 h-1" />
                <p className="text-xl px-2"> OR </p>
                <hr className="grow bg-neutral-600 h-1" />
              </div>
              <button
                className="flex border py-2 text-white  bg-black hover:bg-neutral-800 dark:border-neutral-600 rounded items-center  justify-center"
                onClick={handleGithub}
              >
                Continue with Github
                <FaGithub className="ml-2 text-2xl" />
              </button>
              <button
                className="flex border border-black py-2 text-black bg-slate-50 shadow hover:bg-slate-200 dark:border-0 rounded items-center  justify-center"
                onClick={handleGoole}
              >
                Continue with Google
                <FcGoogle className="ml-2 text-2xl" />
              </button>
              <button
                className="text-center hover:text-sky-500 hover:underline mt-2"
                onClick={() => {
                  variant === "login"
                    ? setVariant("signup")
                    : setVariant("login");
                }}
              >
                {variant === "login"
                  ? "Don't have an account? Signup Now"
                  : "Already have an account? Login Now"}
              </button>
            </div>
          </div>
        ) : (
          <h1 className="text-xl">
            Invalid Route Detected.{" "}
            <Link
              href={"/signup"}
              className="text-sky-500 font-semibold underline"
            >
              Back to Home
            </Link>
          </h1>
        )}
      </div>
    </>
  );
}

export default Page;
