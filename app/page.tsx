"use client";
import { InboxOutlined } from "@ant-design/icons";
import { Button, message, notification, Upload, UploadProps } from "antd";
import Dragger from "antd/es/upload/Dragger";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function Home() {
  const router = useRouter();
  const [uploadedFile, setUploadedFile] = React.useState<File | null>(null);
  const [imgExtention, setImgExtension] = React.useState<string | null>(null);
  const allowedFileTypes = ["image/jpg", "image/png"];
  const props: UploadProps = {
    name: "file",
    multiple: true,
    // accept: ".jpg,.png",
    maxCount: 1,

    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
      //check file size
      const file = e.dataTransfer.files[0];
      if (file.size > 2 * 1024 * 1024) {
        notification.error({
          message: "File size exceeds limit",
          description: `Maximum file size is 2MB. Your file size is ${(
            file.size /
            1024 /
            1024
          ).toFixed(2)}MB`,
          duration: 3,
        });
        return;
      }
    },
    beforeUpload(file) {
      const isAllowedType = allowedFileTypes.includes(file.type);
      console.log(file.type);
      setImgExtension(file.type);
      if (!isAllowedType) {
        notification.error({
          message: "Invalid file type",
          description: `Only .jpg and .png files are allowed, this file extention is ${file.type}`,
          duration: 3,
        });
      }
      // Check file size
      if (file.size > 2 * 1024 * 1024) {
        notification.error({
          message: "File size exceeds limit",
          description: `Maximum file size is 2MB. Your file size is ${(
            file.size /
            1024 /
            1024
          ).toFixed(2)}MB`,
          duration: 3,
        });
        return Upload.LIST_IGNORE;
      }
      return isAllowedType || Upload.LIST_IGNORE;

      // Check file size
    },
    onChange(info) {
      if (info.file.status === "done") {
        notification.success({
          message: "File uploaded successfully",
          description: `${info.file.name} has been uploaded.`,
          duration: 3,
        });

        //convert the file to base64 and save it in local storage
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            const base64File = e.target.result as string;
            localStorage.setItem("uploadedFile", base64File);
            setUploadedFile(info.file.originFileObj as File);
          }
        };
        reader.readAsDataURL(info.file.originFileObj as File);

        // save in local storage
        localStorage.setItem(
          "uploadedFile",
          JSON.stringify(info.file.originFileObj)
        );
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div className="flex flex-col w-full">
      {" "}
      <div className="w-full h-[100px] py-6 bg-[#19335d]">
        <div className=" px-4 sm:px-8 flex items-center justify-between">
          <Image src={"/logo1.png"} width={100} height={55} alt="Leap Tech" />
        </div>
      </div>
      <div
        className=" flex flex-col gap-10 justify-items-center h-fit items-start
     p-8 pb-20  sm:p-20 font-[family-name:var(--font-geist-sans)]"
      >
        <div className="text-2xl  w-full flex items-center justify-center">
          File uploader
        </div>

        <Dragger className="w-[800px] !mx-auto max-w-full" {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined size={20} />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">Allowed file types: .jpg, .png</p>
          <p className="ant-upload-hint">Maximum file size: 2MB</p>
        </Dragger>

        <Button
          onClick={() => {
            router.push("/preview");
          }}
          disabled={!uploadedFile}
          type="primary"
          className="!w-60 !mx-auto"
        >
          Preview
        </Button>
      </div>
    </div>
  );
}
