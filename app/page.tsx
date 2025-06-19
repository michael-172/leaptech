"use client";
import { InboxOutlined } from "@ant-design/icons";
import { Button, message, Upload, UploadProps } from "antd";
import Dragger from "antd/es/upload/Dragger";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function Home() {
  const router = useRouter();
  const [uploadedFile, setUploadedFile] = React.useState<File | null>(null);
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
        message.error("File size exceeds 2MB limit.");
        return;
      }
    },
    beforeUpload(file) {
      const isAllowedType = allowedFileTypes.includes(file.type);
      if (!isAllowedType) {
        message.error(`${file.name} is not a valid file type.`);
      }
      // Check file size
      if (file.size > 2 * 1024 * 1024) {
        message.error("File size exceeds 2MB limit.");
        return Upload.LIST_IGNORE;
      }
      return isAllowedType || Upload.LIST_IGNORE;

      // Check file size
    },
    onChange(info) {
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        // setUploadedFile(info.file.originFileObj as File);

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
    <div
      className=" flex flex-col gap-10 justify-items-center h-fit items-start
     p-8 pb-20  sm:p-20 font-[family-name:var(--font-geist-sans)]"
    >
      <div className="text-2xl  w-full flex items-center justify-center">
        File uploader example
      </div>

      <Dragger className="w-full" {...props}>
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
  );
}
