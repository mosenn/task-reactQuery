"use client";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addUser, updateUser } from "../querys/users";
import { usePathname, useRouter } from "next/navigation";

type userIdProps = { userId?: string; style?: string };
export const Form = ({ userId, style }: userIdProps) => {
  // console.log(userId, "userId in form");
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
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

  //
  // const mutationUpdateUser = useMutation((input: user) => updateUser(input), {
  //   onSuccess: (data) => {
  //     queryCL.invalidateQueries(
  //       "https://63d108283f08e4a8ff8ef010.mockapi.io/users"
  //     );
  //     const message = "Contact Added Successfuly";
  //     console.log(message);
  //   },
  //   onError: (data) => {
  //     console.log(data + " there was an error");
  //   },
  // });
  //

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (path === "/add-user") {
      mutationAddUser.mutate({
        ...user,
      } as any);
      // console.log(user);
    }
    if (path === `/update-user/${userId}` || path === "/") {
      mutationUpdateUser.mutate({
        ...user,
        id: userId,
      });
    }
  };
  return (
    <form onSubmit={submitHandler} className={style}>
      <input
        type="text"
        name="name"
        placeholder="name"
        onChange={onchangeHandler}
      />
      <input
        type="text"
        name="email"
        placeholder="email"
        onChange={onchangeHandler}
      />
      <input
        type="text"
        name="phone"
        placeholder="phone"
        onChange={onchangeHandler}
      />
      <button type="submit">
        {path === "/add-user" ? "add user" : "update user"}
      </button>
    </form>
  );
};
