// Function to handle document verification
async function verifyCertificateAsNFT() {
    // Get the certificate ID input element
    const certificateIdInput = document.getElementById('certificateId');

    // Get the value entered by the user (the certificate ID)
    const certificateId = certificateIdInput.value;

    // Check if Web3 provider (MetaMask) is available
    if (typeof ethereum === 'undefined') {
        console.error('MetaMask or similar Ethereum wallet not detected.');
        return;
    }

    // Create a Web3 instance
    const web3 = new Web3(ethereum);

    try {
        // Request account access if needed
        await ethereum.enable();

        // Your contract interaction code
        const contractAddress = 'YOUR_CONTRACT_ADDRESS'; 
        const contractAbi = [
            {
                constant: true,
                inputs: [
                    {
                        name: 'certificateId',
                        type: 'uint256',
                    },
                ],
                name: 'verifyCertificate',
                outputs: [
                    {
                        name: '',
                        type: 'bool',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
        ];        

        // Create a contract instance
        const contract = new web3.eth.Contract(contractAbi, contractAddress);

        // Call the 'verifyCertificate' function on the contract
        const isVerified = await contract.methods.verifyCertificate(certificateId).call();

        // Display the verification result
        const verificationResult = document.querySelector('.verification-result .status');
        if (isVerified) {
            verificationResult.textContent = 'Verified';
            verificationResult.style.color = 'green';
        } else {
            verificationResult.textContent = 'Not Verified';
            verificationResult.style.color = 'red';
        }
    } catch (error) {
        // Handle errors, display an error message
        console.error('Verification failed:', error);
        const verificationResult = document.querySelector('.verification-result .status');
        verificationResult.textContent = 'Verification Failed';
        verificationResult.style.color = 'red';
    }
}

// Event listener for the form submission
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission behavior
    verifyCertificateAsNFT(); // Call the verifyCertificateAsNFT function
});
