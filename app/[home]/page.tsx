"use client";
import Link from "next/link";

import DisplayUser from "../components/DisplayUser";

import usePagenation from "../components/Pagenation";
type usersType = {
  name: string;
  phone: string;
  email: string;
  id: string;
};

export default function HomePage() {
  const { isLoading, data, nextPage, prevPage, page, perPage } =
    usePagenation();

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
            <span>
              {+page} / {+perPage - 1}{" "}
            </span>
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
