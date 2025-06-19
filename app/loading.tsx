"use client";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";

const loading = () => {
  return (
    <div className="w-full h-full flex items-center justify-center min-h-screen">
      <Spin
        size="large"
        tip="Loading file preview..."
        indicator={<LoadingOutlined />}
      />
    </div>
  );
};

export default loading;
