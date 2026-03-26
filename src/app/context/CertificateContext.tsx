import { createContext, useContext, useState, ReactNode } from "react";

export interface Certificate {
  id: string;
  // Welder Information
  welderName: string;
  ssoNumber?: string; // SSO NO from real cert
  badgeNumber?: string; // BADGE NO from real cert
  stampNumber?: string; // STAMP NO from real cert
  welderPhoto?: string;
  
  // Certification Details
  certificationType: string; // e.g., "TIG WELDING (NICKEL ALLOY)"
  certificationNumber: string; // Main cert number
  issuer: string;
  location?: string; // e.g., "GE AVIATION, ENGINE SERVICES-SINGAPORE"
  
  // Dates
  issueDate: string;
  expiryDate: string;
  
  // Signatures & Verification
  authorizingSignature?: string; // Name or signature data
  operatorSignature?: string;
  
  // Status & Files
  status: "valid" | "pending" | "expiring" | "expired";
  fileUrl?: string;
  fileName?: string;
}

interface CertificateContextType {
  certificates: Certificate[];
  addCertificate: (cert: Omit<Certificate, "id" | "status">) => void;
}

const CertificateContext = createContext<CertificateContextType | undefined>(
  undefined
);

export function CertificateProvider({ children }: { children: ReactNode }) {
  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      id: "1",
      welderName: "Marcus Chen",
      ssoNumber: "SSO-2024-8293",
      badgeNumber: "BADGE-MC-001",
      stampNumber: "STAMP-8293",
      certificationType: "TIG WELDING (NICKEL ALLOY)",
      certificationNumber: "AWS-AER-2024-001",
      issuer: "AWS - American Welding Society",
      location: "GE AVIATION, ENGINE SERVICES-SINGAPORE",
      issueDate: "2024-01-15",
      expiryDate: "2027-01-15",
      authorizingSignature: "Robert Johnson (Chief Inspector)",
      status: "valid",
      fileName: "AWS_D17.1_Certificate.pdf",
      fileUrl: "data:application/pdf;base64,sample",
    },
    {
      id: "2",
      welderName: "Marcus Chen",
      ssoNumber: "SSO-2024-8293",
      badgeNumber: "BADGE-MC-001",
      stampNumber: "STAMP-8293",
      certificationType: "PRESSURE VESSEL WELDING (ASME IX)",
      certificationNumber: "ASME-IX-2024-892",
      issuer: "ASME - American Society of Mechanical Engineers",
      location: "GE AVIATION, ENGINE SERVICES-SINGAPORE",
      issueDate: "2024-02-20",
      expiryDate: "2027-02-20",
      authorizingSignature: "Sarah Martinez (Quality Manager)",
      status: "valid",
      fileName: "ASME_Section_IX.pdf",
      fileUrl: "data:application/pdf;base64,sample",
    },
    {
      id: "3",
      welderName: "Marcus Chen",
      ssoNumber: "SSO-2024-8293",
      badgeNumber: "BADGE-MC-001",
      stampNumber: "STAMP-8293",
      certificationType: "AIRFRAME WELDING CERTIFICATION",
      certificationNumber: "FAA-AFW-2023-4521",
      issuer: "FAA - Federal Aviation Administration",
      location: "GE AVIATION, ENGINE SERVICES-SINGAPORE",
      issueDate: "2023-11-10",
      expiryDate: "2026-11-10",
      authorizingSignature: "David Thompson (FAA Inspector)",
      status: "valid",
    },
    {
      id: "4",
      welderName: "Marcus Chen",
      ssoNumber: "SSO-2024-8293",
      badgeNumber: "BADGE-MC-001",
      stampNumber: "STAMP-8293",
      certificationType: "PART-66 WELDING LICENSE",
      certificationNumber: "EASA-P66-W-2024-338",
      issuer: "EASA - European Aviation Safety Agency",
      location: "GE AVIATION, ENGINE SERVICES-SINGAPORE",
      issueDate: "2024-03-05",
      expiryDate: "2026-05-20",
      authorizingSignature: "Michael Chen (EASA Examiner)",
      status: "expiring",
    },
    {
      id: "5",
      welderName: "Marcus Chen",
      ssoNumber: "SSO-2024-8293",
      badgeNumber: "BADGE-MC-001",
      stampNumber: "STAMP-8293",
      certificationType: "PIPELINE WELDING (API 1104)",
      certificationNumber: "API-1104-2023-7732",
      issuer: "API - American Petroleum Institute",
      location: "GE AVIATION, ENGINE SERVICES-SINGAPORE",
      issueDate: "2023-08-15",
      expiryDate: "2026-08-15",
      authorizingSignature: "James Wilson (API Authorized Inspector)",
      status: "valid",
    },
  ]);

  const addCertificate = (cert: Omit<Certificate, "id" | "status">) => {
    const newCert: Certificate = {
      ...cert,
      id: Date.now().toString(),
      status: "pending", // New certificates start as pending verification
    };
    setCertificates((prev) => [newCert, ...prev]); // Add to beginning of list
  };

  return (
    <CertificateContext.Provider value={{ certificates, addCertificate }}>
      {children}
    </CertificateContext.Provider>
  );
}

export function useCertificates() {
  const context = useContext(CertificateContext);
  if (context === undefined) {
    throw new Error("useCertificates must be used within a CertificateProvider");
  }
  return context;
}