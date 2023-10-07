import { Form } from "@/app/components/Form";
import React from "react";

const UpdateUser = ({ params }: { params: { id: string } }) => {
  // console.log(params.id, "paramas");
  const { id } = params;
  // console.log(id);
  return (
    <div>
      UpdateUser
      <Form userId={id} />
    </div>
  );
};

export default UpdateUser;
