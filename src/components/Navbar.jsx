import React, { useState } from 'react'

import Logo from "../assets/dappLogo.jpg"

import { ethers } from 'ethers';

import {useSnackbar } from 'notistack';

const Navbar = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState("");

  // function to connect wallet 
  const connectWallet = async ()=> {

    // using try block to easily catch errors 
    try {

      //declare provider to search for window.ethereum
      const provider = new ethers.BrowserProvider(window.ethereum);
      // make request to connect network
      await provider.send("eth_requestAccounts", []);
      //declare signer
      const signer = await provider.getSigner();
      // chainId of the connected Network
      const chainId = await provider.getNetwork();

      // addding a condition that says if chainId is not equal to mumbai network it should make request to change

      if (chainId !== "0x13881") {
        try {
          //make request to change the connected chain
          await provider.send("wallet_switchEthereumChain", [ {chainId: "0x13881"},]);
        } catch (error) {
          console.log("Error requesting account switch:", error);
          return;
        }
      }

      // a constant to get connected address
      const address = await signer.getAddress();
      //using slice method to truncate address
      const truncatedAddress = address.slice(0, 4) + ".." + address.slice(-2);
      // set signer
      setConnected(signer);
      // set connected Address 
      setAddress(truncatedAddress);

      enqueueSnackbar("Wallet Connected succesfully", {variant: "success"});

    } catch (error) {
      // catch error
      console.log("Error Conneting:", error)
    }
  }

  return (
    <div>
        <nav className='flex'>
            <img className='logo' src={Logo} alt="logo" />
            {/* <ul className='flex primary-color'>
                <li>Submit Address</li>
                <li>Vote Proposal</li>
            </ul> */}

            <button className='connect-btn primary-color' onClick={connectWallet}>
              {connected ? address : "Connect Wallet"}
            </button>

        </nav>
    </div>
  )
}

export default Navbar;