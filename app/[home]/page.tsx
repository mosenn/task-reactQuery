"use client";
import Link from "next/link";

import DisplayUser from "../components/DisplayUser";
import usePagenation from "../components/Pagenation";
import Title from "../components/Title";
import LinkContainer from "../components/LinkContainer";
type usersType = {
  name: string;
  phone: string;
  email: string;
  id: string;
};
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
export default function HomePage() {
  const { isLoading, data, nextPage, prevPage, page, perPage } =
    usePagenation();

  return (
    <section>
      <Title text="Welcome to this app" />
      <LinkContainer address="/user/add" text="add user " sizeText="2xl" />
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3">
          {data.map((user: usersType) => {
            const { id } = user;
            return (
              <div key={id}>
                <DisplayUser {...user} />
              </div>
            );
          })}
        </div>
      )}
      <section className="flex justify-center items-center p-3">
        <button onClick={prevPage} disabled={page === 1}>
          <AiOutlineArrowLeft
            size={20}
            fill={+page === 1 && "rgb(200, 200, 200)"}
            className="hover:fill-cyan-600"
          />
        </button>{" "}
        <div className="mx-3 text-xl">{page}</div>
        <button onClick={nextPage}>
          <AiOutlineArrowRight
            className="hover:fill-cyan-600"
            size={20}
            fill={data?.length >= perPage ? "black" : "rgb(200, 200, 200)"}
          />
        </button>
      </section>
    </section>
  );
}
