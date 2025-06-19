"use client";
import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";

const AntdProvider = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <body>
      <AntdRegistry>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#19335d", // Primary color
              fontFamily: "var(--font-inter)", // Custom font family
            },
          }}
        >
          {children}
        </ConfigProvider>
      </AntdRegistry>
    </body>
  </html>
);

export default AntdProvider;
