import { Outlet } from "react-router";
import { CertificateProvider } from "../context/CertificateContext";
import { BlockchainProvider } from "../context/BlockchainContext";
import ChatAssistant from "./chat-assistant";
import RoleSwitcher from "./role-switcher";

export default function EmployeeLayout() {
  return (
    <BlockchainProvider>
      <CertificateProvider>
        <Outlet />
        <ChatAssistant />
        <RoleSwitcher />
      </CertificateProvider>
    </BlockchainProvider>
  );
}