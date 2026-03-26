import { createBrowserRouter } from "react-router";
import Layout from "./components/layout";
import EmployeeLayout from "./components/employee-layout";
import EmployerLayout from "./components/employer-layout";
import Dashboard from "./components/dashboard";
import CertificationWallet from "./components/certification-wallet";
import CertificationQR from "./components/certification-qr";
import VerificationScanner from "./components/verification-scanner";
import AddCertification from "./components/add-certification";
import EducationHub from "./components/education-hub";
import Login from "./components/login";
import WorkshopSignup from "./components/workshop-signup";
import RedirectToDashboard from "./components/redirect-to-dashboard";
import ComplianceDashboard from "./components/compliance-dashboard";
import EmployerDashboard from "./components/employer-dashboard";
import EmployerDashboardHome from "./components/employer-dashboard-home";
import EmployeeDirectory from "./components/employee-directory";
import FraudDetection from "./components/fraud-detection";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <RedirectToDashboard />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <RedirectToDashboard />,
  },
  
  // Employee Routes
  {
    path: "/employee",
    element: <EmployeeLayout />,
    errorElement: <RedirectToDashboard />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "wallet",
        element: <CertificationWallet />,
      },
      {
        path: "qr/:certId",
        element: <CertificationQR />,
      },
      {
        path: "add-certification",
        element: <AddCertification />,
      },
      {
        path: "education",
        element: <EducationHub />,
      },
      {
        path: "workshop/:workshopId",
        element: <WorkshopSignup />,
      },
      {
        path: "compliance",
        element: <ComplianceDashboard />,
      },
    ],
  },

  // Employer Routes
  {
    path: "/employer",
    element: <EmployerLayout />,
    errorElement: <RedirectToDashboard />,
    children: [
      {
        path: "dashboard",
        element: <EmployerDashboardHome />,
      },
      {
        path: "verify",
        element: <VerificationScanner />,
      },
      {
        path: "analytics",
        element: <EmployerDashboard />,
      },
      {
        path: "fraud-detection",
        element: <FraudDetection />,
      },
      {
        path: "employees",
        element: <EmployeeDirectory />,
      },
    ],
  },

  // Legacy routes (redirects)
  {
    path: "/dashboard",
    element: <Layout />,
    errorElement: <RedirectToDashboard />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "wallet",
        element: <CertificationWallet />,
      },
      {
        path: "qr/:certId",
        element: <CertificationQR />,
      },
      {
        path: "verify",
        element: <VerificationScanner />,
      },
      {
        path: "add-certification",
        element: <AddCertification />,
      },
      {
        path: "education",
        element: <EducationHub />,
      },
      {
        path: "workshop/:workshopId",
        element: <WorkshopSignup />,
      },
      {
        path: "compliance",
        element: <ComplianceDashboard />,
      },
      {
        path: "employer",
        element: <EmployerDashboard />,
      },
      {
        path: "fraud-detection",
        element: <FraudDetection />,
      },
    ],
  },
  
  // Catch-all route for any unmatched paths - redirects to dashboard
  {
    path: "*",
    element: <RedirectToDashboard />,
  },
]);