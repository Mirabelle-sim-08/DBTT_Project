import { Outlet } from "react-router";
import { BlockchainProvider } from "../context/BlockchainContext";
import { CertificateProvider } from "../context/CertificateContext";
import RoleSwitcher from "./role-switcher";

export default function EmployerLayout() {
  return (
    <BlockchainProvider>
      <CertificateProvider>
        <Outlet />
        <RoleSwitcher />
      </CertificateProvider>
    </BlockchainProvider>
  );
}