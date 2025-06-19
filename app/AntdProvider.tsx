"use client";
import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const AntdProvider = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <body>
      <AntdRegistry>{children}</AntdRegistry>
    </body>
  </html>
);

export default AntdProvider;
