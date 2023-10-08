"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useQueryClient, useMutation, useQuery } from "react-query";
import { deleteUser } from "../querys/users";
import { Form } from "./Form";
import LinkContainer from "./LinkContainer";
type propsTypes = {
  name: string;
  email: string;
  phone: string;
  id: string;
};
const DisplayUser = ({ name, email, phone, id }: propsTypes) => {
  const [formActive, setFormActive] = useState(false);

  const queryCl = useQueryClient();

  const mutiationDel = useMutation(deleteUser, {
    onSuccess: () => {
      queryCl.invalidateQueries("users");
    },
  });
  const value = { name, email, phone };

  return (
    <section className="border border-gray-300 my-2 md:mx-2">
      <div className=" flex flex-col -300 ">
        <section className="p-2">
          <p className="my-1">name : {name}</p>
          <p className="my-1">email : {email}</p>
          <p className="my-1">phone : {phone}</p>
        </section>
        <section className=" p-2  flex  md:flex-row md:gap-3 ">
          <button
            onClick={() => {
              mutiationDel.mutate(id);
            }}
          >
            delete
          </button>
          <button>
            <LinkContainer
              sizeText="sm"
              address={`update-user/${id}`}
              text="go to update page "
            />
          </button>

          <button
            onClick={() => {
              setFormActive(!formActive);
            }}
          >
            update user here
          </button>
        </section>
        {formActive && (
          <Form
            userId={id}
            value={value}
            style={`my-3  flex flex-col w-[100%] -300`}
          />
        )}
      </div>
    </section>
  );
};

export default DisplayUser;
