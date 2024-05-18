import { useGlobalStore } from "@/stores";
import React from "react";

const CheckBtnAuth: React.FC<{
  permission: string;
  children: React.ReactNode;
}> = ({ permission, children }) => {
  const permissions = useGlobalStore((state) => state.btnPermissions || []);

  return permissions.includes(permission) ? <>{children}</> : null;
};

export default CheckBtnAuth;
