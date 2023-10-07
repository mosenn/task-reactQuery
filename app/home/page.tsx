"use client";
import Link from "next/link";
import React from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { deleteUser, getUsers, updateUser } from "../querys/users";

type usersType = {
  name: string;
  phone: string;
  email: string;
  id: string;
};
export default function HomePage() {
  const queryCl = useQueryClient();
  const query = useQuery("users", getUsers);
  const { data, error, status, isLoading } = query;
  // console.log(data, status);
  const mutiationDel = useMutation(deleteUser, {
    onSuccess: () => {
      queryCl.invalidateQueries("users");
    },
  });

  const mutiationUpdate = useMutation(updateUser, {
    onSuccess: () => {
      queryCl.invalidateQueries("users");
    },
  });
  return (
    <section>
      <Link href="/add-user">add user</Link>

      <section>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          data.map((user: usersType) => {
            const { name, email, phone, id } = user;
            return (
              <ul key={id}>
                <li>name : {name}</li>
                <li>email : {email}</li>
                <li>phone : {phone}</li>
                <button
                  onClick={() => {
                    mutiationDel.mutate(id);
                  }}
                >
                  delete
                </button>
                <button>
                  <Link href={`update-user/${id}`}>update user</Link>
                </button>
              </ul>
            );
          })
        )}
      </section>
    </section>
  );
}
