"use client";
import { Form } from "@/app/components/Form";
import { user } from "@/app/querys/users";
import React from "react";
import { useQuery } from "react-query";
const UpdateUser = ({ params }: { params: { id: string } }) => {
  console.log(params, "paramas");
  const { id } = params;
  const { data, error, isLoading } = useQuery(["users", id], () => user(id));
  console.log(data, "data in update user");

  return (
    <div>
      UpdateUser
      {!isLoading && <Form userId={id} value={...data} />}
    </div>
  );
};

export default UpdateUser;
