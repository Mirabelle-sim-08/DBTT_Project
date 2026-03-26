import { Outlet } from "react-router";
import { CertificateProvider } from "../context/CertificateContext";
import { BlockchainProvider } from "../context/BlockchainContext";
import ChatAssistant from "./chat-assistant";

export default function Layout() {
  return (
    <BlockchainProvider>
      <CertificateProvider>
        <Outlet />
        <ChatAssistant />
      </CertificateProvider>
    </BlockchainProvider>
  );
}