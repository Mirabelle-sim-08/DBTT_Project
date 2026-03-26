import { ethers, BrowserProvider, Contract, Signer } from 'ethers';

// ABI for the CertificationRegistry contract
export const CERTIFICATION_REGISTRY_ABI = [
  "event CertificationRegistered(string indexed certNumber, bytes32 certHash, address indexed welderAddress, string issuer, uint256 issueDate, uint256 expiryDate)",
  "event CertificationRevoked(string indexed certNumber, uint256 revokeDate)",
  "event CertificationRenewed(string indexed certNumber, uint256 newExpiryDate)",
  "function registerCertification(string _certNumber, bytes32 _certHash, address _welderAddress, string _issuer, uint256 _issueDate, uint256 _expiryDate)",
  "function verifyCertification(string _certNumber, bytes32 _certHash) view returns (bool isValid, bool exists, address welderAddress)",
  "function isDuplicateHash(bytes32 _certHash) view returns (bool, string)",
  "function revokeCertification(string _certNumber)",
  "function renewCertification(string _certNumber, uint256 _newExpiryDate)",
  "function getWelderCertifications(address _welderAddress) view returns (string[])",
  "function getCertification(string _certNumber) view returns (bytes32 certHash, address welderAddress, string issuer, uint256 issueDate, uint256 expiryDate, bool isValid, bool exists)"
];

// Contract address - In production, this would be the deployed contract address
// For demo purposes, we'll use a placeholder address
export const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export interface CertificationData {
  certNumber: string;
  welderName: string;
  issuer: string;
  certType: string;
  issueDate: string;
  expiryDate: string;
}

export class BlockchainService {
  private provider: BrowserProvider | null = null;
  private signer: Signer | null = null;
  private contract: Contract | null = null;
  private connected: boolean = false;

  /**
   * Check if MetaMask is installed
   */
  isMetaMaskInstalled(): boolean {
    return typeof window !== 'undefined' && typeof (window as any).ethereum !== 'undefined';
  }

  /**
   * Connect to MetaMask wallet
   */
  async connectWallet(): Promise<string> {
    if (!this.isMetaMaskInstalled()) {
      throw new Error('MetaMask is not installed. Please install MetaMask to use blockchain features.');
    }

    try {
      const ethereum = (window as any).ethereum;
      
      // Request account access
      const accounts = await ethereum.request({ 
        method: 'eth_requestAccounts' 
      });

      // Create provider and signer
      this.provider = new BrowserProvider(ethereum);
      this.signer = await this.provider.getSigner();
      
      // Initialize contract
      this.contract = new Contract(
        CONTRACT_ADDRESS,
        CERTIFICATION_REGISTRY_ABI,
        this.signer
      );

      this.connected = true;
      return accounts[0];
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      throw new Error('Failed to connect to MetaMask wallet');
    }
  }

  /**
   * Get current connected wallet address
   */
  async getWalletAddress(): Promise<string | null> {
    if (!this.signer) {
      return null;
    }
    try {
      return await this.signer.getAddress();
    } catch (error) {
      console.error('Error getting wallet address:', error);
      return null;
    }
  }

  /**
   * Check if wallet is connected
   */
  isConnected(): boolean {
    return this.connected && this.signer !== null;
  }

  /**
   * Generate hash for certification data
   */
  generateCertHash(data: CertificationData): string {
    const dataString = `${data.certNumber}|${data.welderName}|${data.issuer}|${data.certType}|${data.issueDate}|${data.expiryDate}`;
    return ethers.keccak256(ethers.toUtf8Bytes(dataString));
  }

  /**
   * Register certification on blockchain
   */
  async registerCertification(data: CertificationData): Promise<{ success: boolean; txHash?: string; error?: string }> {
    if (!this.contract || !this.signer) {
      return { success: false, error: 'Wallet not connected' };
    }

    try {
      const certHash = this.generateCertHash(data);
      const welderAddress = await this.signer.getAddress();
      
      // Convert dates to timestamps
      const issueTimestamp = Math.floor(new Date(data.issueDate).getTime() / 1000);
      const expiryTimestamp = Math.floor(new Date(data.expiryDate).getTime() / 1000);

      // Call smart contract
      const tx = await this.contract.registerCertification(
        data.certNumber,
        certHash,
        welderAddress,
        data.issuer,
        issueTimestamp,
        expiryTimestamp
      );

      // Wait for transaction confirmation
      await tx.wait();

      return { 
        success: true, 
        txHash: tx.hash 
      };
    } catch (error: any) {
      console.error('Error registering certification:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to register certification on blockchain' 
      };
    }
  }

  /**
   * Verify certification on blockchain
   */
  async verifyCertification(certNumber: string, data: CertificationData): Promise<{
    isValid: boolean;
    exists: boolean;
    welderAddress?: string;
    error?: string;
  }> {
    if (!this.contract) {
      return { 
        isValid: false, 
        exists: false, 
        error: 'Blockchain connection not initialized' 
      };
    }

    try {
      const certHash = this.generateCertHash(data);
      
      const [isValid, exists, welderAddress] = await this.contract.verifyCertification(
        certNumber,
        certHash
      );

      return {
        isValid,
        exists,
        welderAddress: welderAddress !== ethers.ZeroAddress ? welderAddress : undefined
      };
    } catch (error: any) {
      console.error('Error verifying certification:', error);
      return { 
        isValid: false, 
        exists: false, 
        error: error.message || 'Failed to verify certification' 
      };
    }
  }

  /**
   * Check for duplicate certification
   */
  async checkDuplicate(data: CertificationData): Promise<{
    isDuplicate: boolean;
    existingCertNumber?: string;
    error?: string;
  }> {
    if (!this.contract) {
      return { isDuplicate: false, error: 'Blockchain connection not initialized' };
    }

    try {
      const certHash = this.generateCertHash(data);
      const [isDuplicate, existingCertNumber] = await this.contract.isDuplicateHash(certHash);

      return {
        isDuplicate,
        existingCertNumber: isDuplicate ? existingCertNumber : undefined
      };
    } catch (error: any) {
      console.error('Error checking duplicate:', error);
      return { 
        isDuplicate: false, 
        error: error.message || 'Failed to check for duplicates' 
      };
    }
  }

  /**
   * Get all certifications for current wallet
   */
  async getWelderCertifications(): Promise<{ certNumbers: string[]; error?: string }> {
    if (!this.contract || !this.signer) {
      return { certNumbers: [], error: 'Wallet not connected' };
    }

    try {
      const welderAddress = await this.signer.getAddress();
      const certNumbers = await this.contract.getWelderCertifications(welderAddress);
      
      return { certNumbers };
    } catch (error: any) {
      console.error('Error getting welder certifications:', error);
      return { 
        certNumbers: [], 
        error: error.message || 'Failed to get certifications' 
      };
    }
  }

  /**
   * Get certification details from blockchain
   */
  async getCertificationDetails(certNumber: string): Promise<{
    certHash?: string;
    welderAddress?: string;
    issuer?: string;
    issueDate?: Date;
    expiryDate?: Date;
    isValid?: boolean;
    exists: boolean;
    error?: string;
  }> {
    if (!this.contract) {
      return { exists: false, error: 'Blockchain connection not initialized' };
    }

    try {
      const [certHash, welderAddress, issuer, issueTimestamp, expiryTimestamp, isValid, exists] = 
        await this.contract.getCertification(certNumber);

      if (!exists) {
        return { exists: false };
      }

      return {
        certHash,
        welderAddress,
        issuer,
        issueDate: new Date(Number(issueTimestamp) * 1000),
        expiryDate: new Date(Number(expiryTimestamp) * 1000),
        isValid,
        exists: true
      };
    } catch (error: any) {
      console.error('Error getting certification details:', error);
      return { 
        exists: false, 
        error: error.message || 'Failed to get certification details' 
      };
    }
  }

  /**
   * Revoke a certification
   */
  async revokeCertification(certNumber: string): Promise<{ success: boolean; txHash?: string; error?: string }> {
    if (!this.contract) {
      return { success: false, error: 'Wallet not connected' };
    }

    try {
      const tx = await this.contract.revokeCertification(certNumber);
      await tx.wait();

      return { success: true, txHash: tx.hash };
    } catch (error: any) {
      console.error('Error revoking certification:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to revoke certification' 
      };
    }
  }

  /**
   * Disconnect wallet
   */
  disconnect(): void {
    this.provider = null;
    this.signer = null;
    this.contract = null;
    this.connected = false;
  }
}

// Singleton instance
export const blockchainService = new BlockchainService();
