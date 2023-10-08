import React from "react";
type propsType = { text: string };
const Title = ({ text }: propsType) => {
  return (
    <div>
      <h1 className="my-4 text-2xl text-gray-700">{text}</h1>
    </div>
  );
};

export default Title;
