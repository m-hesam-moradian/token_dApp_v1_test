import { ethers } from "ethers";

declare let window: any;

export const metamaskWallet = async (): Promise<{
  address: string;
  provider: ethers.BrowserProvider;
  signer: ethers.JsonRpcSigner;
} | null> => {
  if (!window.ethereum) {
    alert("MetaMask not found. Please install it.");
    return null;
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();

    return { address, provider, signer };
  } catch (error) {
    console.error("Connection error:", error);
    return null;
  }
};
