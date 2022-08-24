import Head from "next/head";
import * as ethers from "ethers";
import { useEffect, useState, useRef } from "react";
import { NFT_CONTRACT_ADDRESS, ABI } from "../constants";

import styles from "../styles/Home.module.css";
import Web3Modal from "web3modal";

export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [presaleStarted, setPresaleStarted] = useState(false);
  const [presaleEnded, setPresaleEnded] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tokenIdsMinted, setTokenIdsMinted] = useState("0");
  const web3ModalRef = useRef();

  async function getTokensMinted() {
    try {
      const provider = getProviderOrSigner();
      const nftContract = new ethers.Contract(
        NFT_CONTRACT_ADDRESS,
        ABI,
        provider
      );

      const _tokenIdsMinted = await nftContract.tokenIds();
      setTokenIdsMinted(_tokenIdsMinted);
    } catch (error) {
      console.log(error);
    }
  }

  async function presaleMint() {
    setLoading(true);
    try {
      const signer = await getProviderOrSigner(true);

      const nftContract = new ethers.Contract(
        NFT_CONTRACT_ADDRESS,
        ABI,
        signer
      );

      const txn = await nftContract.presaleMint({
        value: ethers.utils.parseEther("0.01"),
      });

      await txn.wait();

      windows.alert("You have successfully minted a Crypto Dev");
    } catch (error) {
      console.error(error);
      windows.alert(error.message);
      setLoading(false);
    }
    setLoading(false);
  }

  async function publicMint() {
    setLoading(true);
    try {
      const signer = await getProviderOrSigner(true);

      const nftContract = new ethers.Contract(
        NFT_CONTRACT_ADDRESS,
        ABI,
        signer
      );

      const txn = await nftContract.mint({
        value: ethers.utils.parseEther("0.01"),
      });
      await txn.wait();

      windows.alert("You have successfully minted a Crypto Dev");
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
    setLoading(false);
  }

  async function checkIfPresaleStarted() {
    try {
      const provider = await getProviderOrSigner();

      const nftContract = new ethers.Contract(
        NFT_CONTRACT_ADDRESS,
        ABI,
        provider
      );

      const isPresaleStarted = await nftContract.presaleStarted();
      setPresaleStarted(isPresaleStarted);
      return isPresaleStarted;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async function checkIFPresaleEnded() {
    try {
      const provider = await getProviderOrSigner();

      const nftContract = new ethers.Contract(
        NFT_CONTRACT_ADDRESS,
        ABI,
        provider
      );

      const presaleEndTime = await nftContract.presaleEnded();
      const currentTimeInSeconds = Date.now() / 1000;

      const hasPresaleEnded = presaleEndTime.lt(
        Math.floor(currentTimeInSeconds)
      );
      setPresaleEnded(hasPresaleEnded);
    } catch (error) {
      console.error(error);
    }
  }

  async function startPresale() {
    setLoading(true);
    try {
      const signer = await getProviderOrSigner(true);

      const nftContract = new ethers.Contract(
        NFT_CONTRACT_ADDRESS,
        ABI,
        signer
      );

      const txn = await nftContract.startPresale();
      await txn.wait();
      setPresaleStarted(true);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
    setLoading(false);
  }

  async function getOwner() {
    try {
      const signer = await getProviderOrSigner(true);

      const nftContract = new ethers.Contract(
        NFT_CONTRACT_ADDRESS,
        ABI,
        signer
      );

      const owner = await nftContract.owner();

      const userAddress = await signer.getAddress();

      if (owner.toLowerCase() === userAddress.toLowerCase()) {
        setIsOwner(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function connectWallet() {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (error) {
      console.error(error);
    }
  }

  async function getProviderOrSigner(needSigner = false) {
    try {
      const provider = await web3ModalRef.current.connect();
      const web3Provider = new ethers.providers.Web3Provider(provider);

      const { chainId } = await web3Provider.getNetwork();
      if (chainId !== 4) {
        window.alert("Please switch to the Rinkeby network");
        throw new Error("Wrong Network detected");
      }
      if (needSigner) {
        const signer = web3Provider.getSigner();
        return signer;
      }
      return web3Provider;
    } catch (error) {
      console.log(error);
    }
  }

  async function onPageLoad() {
    await connectWallet();
    await getOwner();
    const presaleStarted = await checkIfPresaleStarted();
    if (presaleStarted) {
      await checkIFPresaleEnded();
    }
    await getTokensMinted();

    setInterval(async () => {
      await getTokensMinted();
    }, 5 * 1000);

    setInterval(async () => {
      const presaleStarted = await checkIfPresaleStarted();
      if (presaleStarted) {
        await checkIFPresaleEnded();
      }
    }, 5 * 1000);
  }

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "rinkeby",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      onPageLoad();
    }
  }, [walletConnected]);

  function renderButton() {
    if (!walletConnected) {
      return (
        <button onClick={connectWallet} className={styles.button}>
          Connect Wallet
        </button>
      );
    }
    if (loading) {
      return <div className={styles.description}>Loading...</div>;
    }
    if (isOwner && !presaleStarted) {
      return (
        <button onClick={startPresale} className={styles.button}>
          Start Presale
        </button>
      );
    }

    if (!presaleStarted) {
      return (
        <div className={styles.description}>
          Presale has not Started yet, come back later!
        </div>
      );
    }

    if (presaleStarted && !presaleEnded) {
      return (
        <div>
          <span onClick={publicMint} className={styles.description}>
            Presale Mint has started, Whitelist can mint with the button below
          </span>
          <div>
            <button onClick={presaleMint} className={styles.button}>
              "Mint Now(0.01ETH)
            </button>
            ;
          </div>
        </div>
      );
    }

    if (presaleEnded) {
      return (
        <div>
          <span className={styles.description}>
            Public Mint has started, Everyone can mint with the button below
          </span>
          <div>
            <button onClick={publicMint} className={styles.button}>
              "Mint Now(0.01ETH)
            </button>
            ;
          </div>
        </div>
      );
    }
  }

  return (
    <div>
      <Head>
        <title>Crypto Devs</title>
        <meta name="description" content="Whitelist-Dapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <div>
          <h1 className={styles.title}>Welcome to Crypto Devs!</h1>
          <div className={styles.description}>
            Its an NFT collection for developers in Crypto.
          </div>
          <div className={styles.description}>
            {tokenIdsMinted}/20 have been minted
          </div>
          {renderButton()}
        </div>
        <div>
          <img className={styles.image} src="./cryptodevs/0.png" />
        </div>
      </div>

      <footer className={styles.footer}>
        Made with &#10084; by Crypto Devs
      </footer>
    </div>
  );
}
