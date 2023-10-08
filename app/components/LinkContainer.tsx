import Link from "next/link";
import React from "react";
type propsType = { address: string; text: string; sizeText: string };
const LinkContainer = ({ address, text, sizeText }: propsType) => {
  return (
    <div className={`my-3 text-${sizeText} text-blue-500 hover:text-blue-600`}>
      <Link href={address}>{text}</Link>
    </div>
  );
};

export default LinkContainer;
