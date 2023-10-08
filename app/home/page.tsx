"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { getUsers } from "../querys/users";

import DisplayUser from "../components/DisplayUser";

type usersType = {
  name: string;
  phone: string;
  email: string;
  id: string;
};
export default function HomePage() {
  const query = useQuery("users", getUsers);

  const { data, isLoading } = query;

  return (
    <section>
      <Link href="/add-user">add user</Link>

      <section>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          data.map((user: usersType) => {
            const { id } = user;
            return (
              <div key={id}>
                <DisplayUser {...user} />
              </div>
            );
          })
        )}
      </section>
    </section>
  );
}
