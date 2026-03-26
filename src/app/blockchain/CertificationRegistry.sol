// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title CertificationRegistry
 * @dev Smart contract for storing and verifying welder certifications on blockchain
 * 
 * This contract stores certification hashes on-chain for immutable verification.
 * Each certification is registered with its hash, welder address, issuer, and metadata.
 */
contract CertificationRegistry {
    struct Certification {
        bytes32 certHash;           // Hash of certification data
        address welderAddress;       // Wallet address of the welder
        string certNumber;           // Certification number (e.g., AWS-AER-2024-001)
        string issuer;               // Issuing authority
        uint256 issueDate;           // Timestamp of issue
        uint256 expiryDate;          // Expiry timestamp
        bool isValid;                // Current validity status
        bool exists;                 // Check if certification exists
    }
    
    // Mapping from certification number to certification data
    mapping(string => Certification) public certifications;
    
    // Mapping from cert hash to certification number (for duplicate detection)
    mapping(bytes32 => string) public hashToCertNumber;
    
    // Mapping from welder address to their certification numbers
    mapping(address => string[]) public welderCertifications;
    
    // Events
    event CertificationRegistered(
        string indexed certNumber,
        bytes32 certHash,
        address indexed welderAddress,
        string issuer,
        uint256 issueDate,
        uint256 expiryDate
    );
    
    event CertificationRevoked(string indexed certNumber, uint256 revokeDate);
    event CertificationRenewed(string indexed certNumber, uint256 newExpiryDate);
    
    /**
     * @dev Register a new certification on the blockchain
     */
    function registerCertification(
        string memory _certNumber,
        bytes32 _certHash,
        address _welderAddress,
        string memory _issuer,
        uint256 _issueDate,
        uint256 _expiryDate
    ) public {
        require(!certifications[_certNumber].exists, "Certification already registered");
        require(bytes(hashToCertNumber[_certHash]).length == 0, "Duplicate certification detected");
        
        certifications[_certNumber] = Certification({
            certHash: _certHash,
            welderAddress: _welderAddress,
            certNumber: _certNumber,
            issuer: _issuer,
            issueDate: _issueDate,
            expiryDate: _expiryDate,
            isValid: true,
            exists: true
        });
        
        hashToCertNumber[_certHash] = _certNumber;
        welderCertifications[_welderAddress].push(_certNumber);
        
        emit CertificationRegistered(_certNumber, _certHash, _welderAddress, _issuer, _issueDate, _expiryDate);
    }
    
    /**
     * @dev Verify a certification by number and hash
     */
    function verifyCertification(string memory _certNumber, bytes32 _certHash) 
        public 
        view 
        returns (bool isValid, bool exists, address welderAddress) 
    {
        Certification memory cert = certifications[_certNumber];
        
        if (!cert.exists) {
            return (false, false, address(0));
        }
        
        bool hashMatches = cert.certHash == _certHash;
        bool notExpired = block.timestamp <= cert.expiryDate;
        bool stillValid = cert.isValid;
        
        return (hashMatches && notExpired && stillValid, true, cert.welderAddress);
    }
    
    /**
     * @dev Check if a certification hash already exists (duplicate detection)
     */
    function isDuplicateHash(bytes32 _certHash) public view returns (bool, string memory) {
        string memory existingCertNumber = hashToCertNumber[_certHash];
        if (bytes(existingCertNumber).length > 0) {
            return (true, existingCertNumber);
        }
        return (false, "");
    }
    
    /**
     * @dev Revoke a certification
     */
    function revokeCertification(string memory _certNumber) public {
        require(certifications[_certNumber].exists, "Certification does not exist");
        
        certifications[_certNumber].isValid = false;
        
        emit CertificationRevoked(_certNumber, block.timestamp);
    }
    
    /**
     * @dev Renew a certification with new expiry date
     */
    function renewCertification(string memory _certNumber, uint256 _newExpiryDate) public {
        require(certifications[_certNumber].exists, "Certification does not exist");
        
        certifications[_certNumber].expiryDate = _newExpiryDate;
        certifications[_certNumber].isValid = true;
        
        emit CertificationRenewed(_certNumber, _newExpiryDate);
    }
    
    /**
     * @dev Get all certifications for a welder
     */
    function getWelderCertifications(address _welderAddress) 
        public 
        view 
        returns (string[] memory) 
    {
        return welderCertifications[_welderAddress];
    }
    
    /**
     * @dev Get certification details
     */
    function getCertification(string memory _certNumber) 
        public 
        view 
        returns (
            bytes32 certHash,
            address welderAddress,
            string memory issuer,
            uint256 issueDate,
            uint256 expiryDate,
            bool isValid,
            bool exists
        ) 
    {
        Certification memory cert = certifications[_certNumber];
        return (
            cert.certHash,
            cert.welderAddress,
            cert.issuer,
            cert.issueDate,
            cert.expiryDate,
            cert.isValid,
            cert.exists
        );
    }
}
