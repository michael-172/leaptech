"use client";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, Spin } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter();
  const [fileFromLocalStorage, setFileFromLocalStorage] = React.useState<
    string | null
  >(null);

  console.log(fileFromLocalStorage);
  React.useEffect(() => {
    const storedFile = localStorage.getItem("uploadedFile");
    if (storedFile) {
      setFileFromLocalStorage(storedFile);
    }
  }, []);

  if (!fileFromLocalStorage) {
    return (
      <div className="w-full h-full flex items-center justify-center min-h-screen">
        <Spin
          size="large"
          tip="Loading file preview..."
          indicator={<LoadingOutlined />}
        />
      </div>
    );
  }

  return (
    <div
      className=" grid grid-rows-[20px_1fr_20px] gap-10 justify-items-center h-fit items-start
     p-8 pb-20  sm:p-20 font-[family-name:var(--font-geist-sans)]"
    >
      {" "}
      <h1 className="text-2xl  mb-4 flex items-center justify-center">
        File Preview
      </h1>
      <div className="flex flex-col items-center">
        <Image
          width={300}
          height={300}
          src={fileFromLocalStorage}
          alt="Uploaded File"
          className="max-w-full !w-auto h-auto !max-h-[300px] rounded-lg shadow-md mb-4"
        />
      </div>
      <div className="mt-4">
        <Button
          onClick={() => {
            router.push("/");
          }}
          type="primary"
          className="!w-60"
        >
          Upload another file
        </Button>
      </div>
    </div>
  );
};

export default Page;
