"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useQuery } from "react-query";
import DisplayUser from "../components/DisplayUser";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
type usersType = {
  name: string;
  phone: string;
  email: string;
  id: string;
};

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? 1;
  const perPage = searchParams.get("perPage") ?? 5;

  const users = (page = 1) =>
    fetch(
      `https://63d108283f08e4a8ff8ef010.mockapi.io/users?page=${page}&limit=${perPage}`
    ).then((res) => res.json());

  const { isLoading, data } = useQuery(
    ["users", page, perPage],
    () => users(+page),
    {
      keepPreviousData: true,
    }
  );

  const nextPage = () => {
    if (data.length === 5) {
      router.push(`/?page=${+page + 1}&per_page=${perPage}`);
    }
  };

  const prevPage = () => {
    if (+page > 1) {
      router.push(`/?page=${+page - 1}&per_page=${perPage}`);
    }
  };

  return (
    <section>
      <Link href="/user/add">add user</Link>
      <h1>home page</h1>
      <section>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            {data.map((user: usersType) => {
              const { id } = user;
              return <div key={id}>{<DisplayUser {...user} />}</div>;
            })}
            <span>Current Page: {page}</span>
            <button onClick={prevPage} disabled={page === 1}>
              Previous Page
            </button>{" "}
            <button onClick={nextPage}>Next Page</button>
          </>
        )}
      </section>
    </section>
  );
}
