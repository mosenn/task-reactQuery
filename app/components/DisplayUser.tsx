"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useQueryClient, useMutation, useQuery } from "react-query";
import { deleteUser } from "../querys/users";
import { Form } from "./Form";
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

  return (
    <section>
      <div className="flex flex-col">
        <p>name : {name}</p>
        <p>email : {email}</p>
        <p>phone : {phone}</p>
        <section className=" p-2 my-3 flex gap-3 border">
          <button
            onClick={() => {
              mutiationDel.mutate(id);
            }}
          >
            delete
          </button>
          <button>
            <Link href={`update-user/${id}`}>update in page</Link>
          </button>

          <button
            onClick={() => {
              setFormActive(!formActive);
            }}
          >
            update user here
          </button>
        </section>
        {formActive && <Form userId={id} style={`my-3`} />}
      </div>
    </section>
  );
};

export default DisplayUser;
