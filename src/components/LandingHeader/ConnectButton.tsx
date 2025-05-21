import { FC, useState, useEffect } from "react";
import { ethers } from "ethers";
import Swal from "sweetalert2";

interface Props {
  showSideBar?: boolean;
}

const ConnectButton: FC<Props> = ({ showSideBar }) => {
  const [ethAddress, setEthAddress] = useState<string | null>(null);
  const [ethBalance, setEthBalance] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEthBalance() {
      if (!window.ethereum || !ethAddress) {
        setEthBalance(null);
        return;
      }
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const balanceWei = await provider.getBalance(ethAddress);
        const balanceEth = ethers.formatEther(balanceWei);
        setEthBalance(balanceEth);
      } catch (err) {
        console.error("Error fetching MetaMask balance:", err);
        Swal.fire({
          icon: "error",
          title: "Balance Error",
          text: "Failed to fetch ETH balance.",
        });
        setEthBalance(null);
      }
    }
    fetchEthBalance();
  }, [ethAddress]);

  const connectMetaMask = async () => {
    if (!window.ethereum) {
      Swal.fire({
        icon: "error",
        title: "MetaMask Not Found",
        text: "Please install MetaMask to continue.",
      });
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      if (accounts.length > 0) {
        setEthAddress(accounts[0]);
        Swal.fire({
          icon: "success",
          title: "Connected",
          text: "MetaMask connected successfully!",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      console.error("MetaMask connection error:", err);
      Swal.fire({
        icon: "error",
        title: "Connection Failed",
        text: "Could not connect to MetaMask.",
      });
    }
  };

  const disconnectMetaMask = () => {
    setEthAddress(null);
    setEthBalance(null);
    Swal.fire({
      icon: "info",
      title: "Disconnected",
      text: "MetaMask has been disconnected.",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  return (
    <div className="p-5 flex gap-4 flex-wrap">
      {ethAddress ? (
        <div className="relative group">
          <button
            onClick={disconnectMetaMask}
            className="rounded-xl bg-primary-200 text-white py-2 px-4 cursor-pointer relative overflow-hidden"
          >
            {/* Address */}
            <span className="group-hover:hidden transition duration-300 block">
              {`${ethAddress.slice(0, 6)}...${ethAddress.slice(-4)}`}
            </span>

            {/* Balance */}
            <span className="hidden group-hover:flex transition duration-300">
              Balance:{" "}
              {ethBalance ? parseFloat(ethBalance).toFixed(1) : "Loading..."}{" "}
              ETH | Disconnect
            </span>
          </button>
        </div>
      ) : (
        <button
          onClick={connectMetaMask}
          className="rounded-xl bg-primary-200 text-white py-2 px-4 cursor-pointer"
        >
          Connect MetaMask
        </button>
      )}
    </div>
  );
};

export default ConnectButton;
