import React, {useState} from 'react'

// contract
import ContractAbi from "../contract/contractAbi.json";
import { ethers } from 'ethers';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';



export const ProposalsSection = () => {

    const contractAddress = "0x48564fc514e458861BD7891Df840A37dB78386f2"

    const winningProposal = async ()=> {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const votingContract = new ethers.Contract(contractAddress, ContractAbi, signer);

            const winningName = votingContract.winningName();

            enqueueSnackbar(winningName + "project is leading", {
                variant: "success"
            } );

        } catch (error) {
            console.log("Error Message:", error.data)
        }
    }
    
  return (
    <div className='proposal-section'>
        <h2>Proposals</h2>
        <p className='proposal-p'>Here are the proposals submitted by the community; every member has the right to vote for their choice of proposals.</p>
        <div className="proposal-card">
            <div className="proposal-1">
                <h3>Community Events Sponsorship</h3>
                <p className='txt-white'>Proposal to allocate funds for sponsoring local community events related to blockchain and technology.</p>
                <p className='vote-p'>Vote count <span>0</span></p>
            </div>
            <div className="proposal-2">
                <h3>Development Grant Program</h3>
                <p className='txt-white'>Proposal to establish a grant program to support developers working on innovative blockchain projects.</p>
                <p className='vote-p'>Vote count <span>0</span></p>
            </div>
            <div className="proposal-3">
                <h3>Educational Webinar Series</h3>
                <p className='txt-white'>Proposal to organize a series of educational webinars to increase awareness and understanding of blockchain technology.</p>
                <p className='vote-p'>Vote count <span>0</span></p>
            </div>
            <div className="proposal-4">
                <h3>Blockchain for Social Impact</h3>
                <p className='txt-white'>PProposal to allocate resources for blockchain projects aimed at addressing social and environmental challenges.</p>
                <p className='vote-p'>Vote count <span>0</span></p>
            </div>
            <div className="proposal-5">
                <h3>Security and Auditing Framework</h3>
                <p className='txt-white'>Proposal to allocate resources for blockchain projects aimed at addressing social and environmental challenges.</p>
                <p className='vote-p'>Vote count <span>0</span></p>
            </div>
        </div>
        <form action="">


        </form>

        <button className='vote-btn txt-white'>Vote</button>
    </div>
  )
}
