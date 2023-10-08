"use client";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addUser, updateUser } from "../../libs/users";
import { usePathname, useRouter } from "next/navigation";
import { Validation } from "./Validation";

type userIdProps = {
  userId?: string;
  style?: string;
  value?: inpValue;
};
type inpValue = {
  name?: string;
  email?: string;
  phone?: string;
};
export const Form = ({ userId, style, value }: userIdProps | any) => {
  console.log(value, "value");
  const [errorMessage, setErrorMessage] = useState({
    name: "",
    phone: "",
    email: "",
    empty: "",
  });
  const { name, email, phone } = value || {};

  // console.log(userId, "userId in form");
  const router = useRouter();
  const [user, setUser] = useState({
    name,
    email,
    phone,
  });
  const path = usePathname();

  const onchangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const queryCL = useQueryClient();
  const mutationAddUser = useMutation(addUser, {
    onSuccess: () => {
      queryCL.invalidateQueries("users");
      router.push("/");
    },
  });

  const mutationUpdateUser = useMutation(updateUser, {
    onSuccess: async () => {
      await queryCL.invalidateQueries(["users"]);
      // navigate to home page
      router.push("/");
    },
  });

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    // validation setup
    const errors: any = Validation(user);
    setErrorMessage(errors);
    if (Object.keys(errors).length === 0) {
      setErrorMessage({ email: "", empty: "", phone: "", name: "" });

      // set path for add and update user
      if (path === "/user/add") {
        mutationAddUser.mutate({
          ...user,
        } as any);
      }
      if (path === `/update-user/${userId}` || path === "/") {
        mutationUpdateUser.mutate({
          ...user,
          id: userId,
        });
      }
    }
  };
  return (
    <section>
      {Object.values(errorMessage).map((err, index) => {
        return (
          <div key={index} className="flex flex-col items-center ">
            <p>{err}</p>
          </div>
        );
      })}

      <form onSubmit={submitHandler} className={style}>
        <input
          type="text"
          name="name"
          placeholder="name"
          onChange={onchangeHandler}
          value={user.name}
          className=" m-2 p-2 rounded-md focus:outline-lime-600"
        />
        <input
          type="text"
          name="email"
          placeholder="email"
          onChange={onchangeHandler}
          value={user.email}
          className="  m-2 p-2 rounded-md focus:outline-lime-600"
        />
        <input
          type="text"
          name="phone"
          placeholder="phone"
          onChange={onchangeHandler}
          value={user.phone}
          className="m-2 p-2 rounded-md focus:outline-none focus:outline-lime-600"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 rounded-md w-[170px] m-2 p-2 text-white"
        >
          {path === "/user/add" ? "add user" : "update user"}
        </button>
      </form>
    </section>
  );
};
