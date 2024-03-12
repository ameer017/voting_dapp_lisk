import "./App.css";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { contractAbi, contractAddress } from "./constant/constant";
import Login from "./component/Login";
import Connected from "./component/Connected";

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [votingStatus, setVotingStatus] = useState(true);
  const [remainingTime, setRemainingTime] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [number, setNumber] = useState("");

  useEffect(() => {
    // getCandidates()
    // getCurrentStatus()
    // getRemainingTime()

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  });

  async function getCandidates() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAbi,
      contractAddress,
      signer
    );
    const candidatesList = await contractInstance.getAllVotesOfCandidates();
    // console.log(candidateList);
    const formattedCandidates = candidatesList.map((candidate, index) => {
      return {
        index: index,
        name: candidate.name,
        voteCount: candidate.voteCount.toNumber(),
      };
    });
    setCandidates(formattedCandidates);
  }

  async function getCurrentStatus() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAbi,
      contractAddress,
      signer
    );
    const status = await contractInstance.getVotingStatus();
    console.log(status);
    setVotingStatus(status);
  }

  async function getRemainingTime() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAbi,
      contractAddress,
      signer
    );
    const remTime = await contractInstance.getRemainingTime();
    console.log(remTime);
    setRemainingTime(remTime);
  }

  function handleAccountsChanged(accounts) {
    if (accounts.length > 0 && account !== accounts[0]) {
      setAccount(accounts[0]);
    } else {
      setIsConnected(false);
      setAccount(null);
    }
  }

  async function connectWallet() {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        console.log("Metamask connected: " + address);
        setIsConnected(true);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.error("Metamask not detected in the browser");
    }
  }

  return (
    <>
      {isConnected ? (
        <Connected
          account={account}
          candidates={candidates}
          remainingTime={remainingTime}
          number={number}
        />
      ) : (
        <Login connectWallet={connectWallet} />
      )}
    </>
  );
}

export default App;
