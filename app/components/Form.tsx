"use client";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addUser, updateUser } from "../querys/users";
import { usePathname, useRouter } from "next/navigation";

type userIdProps = { userId?: string };
export const Form = ({ userId }: userIdProps) => {
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

      queryCL.invalidateQueries("users");
      router.push("/");
    },
  });

  const mutationUpdateUser = useMutation(updateUser, {
    onSuccess: (data) => {
      // Update the cache with the updated user
      queryCL.setQueryData(["users", { id: data.id }], data);
      // navigate to home page
      router.push("/");
    },
  });

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (path === "/add-user") {
      mutationAddUser.mutate({
        //   email: "email@yahoo.com",
        //   phone: "12313",
        //   name: "213123",
        //   id: "12",
        ...user,
      } as any);
      // console.log(user);
    }
    if (path === `/update-user/${userId}`) {
      mutationUpdateUser.mutate({
        ...user,
        id: userId,
      });
    }
  };
  return (
    <form onSubmit={submitHandler}>
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
