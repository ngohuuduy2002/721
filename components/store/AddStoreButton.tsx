import { Col } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AddStoreButton = () => {
  return (
    <Col
      span={5}
      className="border-4 flex flex-col rounded-3xl py-3 border-[#3E6DD2]"
    >
      <Link href={"/addStore"}>
        <div className="h-full text-xl text-black flex justify-center items-center flex-col">
          <Image
            src={"/store/store-add-icon.png"}
            alt="AddStore"
            width={120}
            height={120}
          />
          <p className="text-[#3E6DD2] font-bold text-2xl">New Store</p>
        </div>
      </Link>
    </Col>
  );
};

export default AddStoreButton;
