import React, { useState } from 'react'

// contract
import ContractAbi from "../contract/contractAbi.json";
import { ethers } from 'ethers';
import { useSnackbar } from 'notistack';


export const SubmitSection = () => {
  const {enqueueSnackbar} = useSnackbar();

  const contractAddress = "0x0Cf4D7E930812a02ea119a02C5B4764D45b40026";

  const [votersAddress, setVotersAddress] = useState('');

  const submitAddress = async (event) => {
    event.preventDefault();
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      // const address = await signer.getAddress();
      const votingContract = new ethers.Contract(contractAddress, ContractAbi, signer);

      const transaction = await votingContract.submitAddress(votersAddress);

      //you wait for the transaction to be mined
      let receipt;
      receipt = await transaction.wait();

      console.log(receipt)

      // Optionally, reset the input field after submission
      setVotersAddress('');

      console.log(votersAddress + "submited")
      enqueueSnackbar("Address submitted", {variant: "success"});
           


    } catch (error) {
      console.error('Error submitting voters address:', error);
      enqueueSnackbar("Error submitting voters address:," + error, {variant: "success"});
           
    }

  }

  const handleInputChange = (event) => {
    setVotersAddress(event.target.value);
  };



  return (
    <div className='submit-container'>
      <h3 className='primary-color'>Sumbit Address</h3>
      <p className='txt-white'>Ready to make your voice heard? We invite all interested users to participate in the voting process.
        Simply submit your Ethereum Virtual Machine (EVM) address in the space below and hit the submit button.
      </p>
      <form onSubmit={submitAddress}>
        <input type="text" placeholder='voters address' value={votersAddress} onChange={handleInputChange} className='primary-color' required />
        <p className='txt-white'>By submitting your address, you gain the power to influence the future.
          Be a part of the decision-making process. submit now!
        </p>
        <button type="submit" className=' submit-btn txt-white'>Submit</button>
      </form>
    </div>
  )
}
