import React, { useState } from 'react'

// contract
import ContractAbi from "../contract/contractAbi.json";
import { ethers } from 'ethers';
import { useSnackbar } from 'notistack';
import { wait } from '@testing-library/user-event/dist/utils';


export const ProposalsSection = () => {

    const contractAddress = "0x0Cf4D7E930812a02ea119a02C5B4764D45b40026";

    const [value, setValue] = useState("");

    // const [voteCount1, setVoteCount1] = useState("0");
    // const [voteCount2, setVoteCount2] = useState("0");
    // const [voteCount3, setVoteCount3] = useState("0");
    // const [voteCount4, setVoteCount4] = useState("0");
    // const [voteCount5, setVoteCount5] = useState("0");

    // const [voteCount, setVoteCount] = useState(0);

    const { enqueueSnackbar } = useSnackbar();




    const handleInput = (event) => {
        const inputValue = event.target.checked ? parseInt(event.target.value, 10) : "";
        setValue(inputValue);
        console.log(inputValue);
        if (inputValue === 0) {
            enqueueSnackbar("Community Events Sponsorship selected, now Vote", { variant: "success" })
        } else if (inputValue === 1) {
            enqueueSnackbar("Development Grant Program selected, now Vote", { variant: "success" })
        } else if (inputValue === 2) {
            enqueueSnackbar("Educational Webinar Series selected, now Vote", { variant: "success" })
        } else if (inputValue === 3) {
            enqueueSnackbar("Blockchain for Social Impact selected, now Vote", { variant: "success" })
        } else if (inputValue === 4) {
            enqueueSnackbar("Security and Auditing Framework, now Vote", { variant: "success" })
        }
    }

    //Checking the winning proposal
    const winningProposal = async () => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const votingContract = new ethers.Contract(contractAddress, ContractAbi, signer);

            const winningName = await votingContract.winningName();

            enqueueSnackbar(winningName + "project is leading", {
                variant: "success"
            });

            console.log(winningName)

        } catch (error) {
            console.log("Error Message:", error.data)
        }
    }

    // voting the proposal 
    const voteProposal = async (event) => {
        event.preventDefault();

        try {
            const provider = new ethers.BrowserProvider(window.ethereum)
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            // const address = await signer.getAddress();
            let receipt;
            const votingContract = new ethers.Contract(contractAddress, ContractAbi, signer);

            console.log(receipt)
            //proceed with voting
            const transaction = await votingContract.voteProposal(parseInt(value, 10));

            receipt = await wait(transaction);
            console.log(receipt)
            enqueueSnackbar("vote successful", { variant: "success" });

        } catch (error) {
            enqueueSnackbar(error, { variant: "error" });
            console.log("Failed, reason", error);

        }

    }

    // checking vote counnt for each proposal 
    // const voteCounting = async () => {
    //     try {
    //         const provider = new ethers.BrowserProvider(window.ethereum);
    //         await provider.send("eth_requestAccounts", []);
    //         const signer = await provider.getSigner();
    //         const votingContract = new ethers.Contract(contractAddress, ContractAbi, signer);

    //         const proposals = await votingContract.getProposals();

    //         let proposalCount = []
    //         console.log(proposalCount)

    //         for (let vc = 0; vc < proposals.length; vc++) {
    //             const proposalVoteCount = proposals[vc].voteCount;
    //             console.log(`Vote count for proposal ${vc + 1}: ${proposalVoteCount}`);

    //             proposalCount.push(proposalVoteCount);
    //         }

    //         setVoteCount1(proposalCount[0])
    //         setVoteCount2(proposalCount[1])
    //         setVoteCount3(proposalCount[2])
    //         setVoteCount4(proposalCount[3])
    //         setVoteCount5(proposalCount[4])

    //     } catch (error) {
    //         console.error("Error fetching vote count:", error);
    //     }
        
    // }

    


    return (

        <div className='proposal-section'>
            <h2>Proposals</h2>
            <p className='proposal-p'>Here are the proposals submitted by the community; every member has the right to vote for their choice of proposals.</p>
            <form onSubmit={voteProposal}>
                <div className="proposal-card">
                    <input type="radio" name="option" value="0" id="option1" onChange={handleInput} />
                    <label htmlFor='option1' className="proposal-1">
                        <h3>Community Events Sponsorship</h3>
                        <p className='txt-white'>Proposal to allocate funds for sponsoring local community events related to blockchain and technology.</p>
                        {/* <p className='vote-p'>Vote count <span>{voteCount1}</span></p> */}
                    </label>
                    <input type="radio" name="option" value="1" id="option2" onChange={handleInput} />
                    <label htmlFor='option2' className="proposal-2">
                        <h3>Development Grant Program</h3>
                        <p className='txt-white'>Proposal to establish a grant program to support developers working on innovative blockchain projects.</p>
                        {/* <p className='vote-p'>Vote count <span>{voteCount2}</span></p> */}
                    </label>
                    <input type="radio" name="option" value="2" id="option3" onChange={handleInput} />
                    <label htmlFor='option3' className="proposal-3">
                        <h3>Educational Webinar Series</h3>
                        <p className='txt-white'>Proposal to organize a series of educational webinars to increase awareness and understanding of blockchain technology.</p>
                        {/* <p className='vote-p'>Vote count <span>{voteCount3}</span></p> */}
                    </label>
                    <input type="radio" name="option" value="3" id="option4" onChange={handleInput} />
                    <label htmlFor='option4' className="proposal-4">
                        <h3>Blockchain for Social Impact</h3>
                        <p className='txt-white'>PProposal to allocate resources for blockchain projects aimed at addressing social and environmental challenges.</p>
                        {/* <p className='vote-p'>Vote count <span>{voteCount4}</span></p> */}
                    </label>
                    <input type="radio" name="option" value="4" id="option5" onChange={handleInput} />
                    <label htmlFor='option5' className="proposal-5">
                        <h3>Security and Auditing Framework</h3>
                        <p className='txt-white'>Proposal to allocate resources for blockchain projects aimed at addressing social and environmental challenges.</p>
                        {/* <p className='vote-p'>Vote count <span>{voteCount5}</span></p> */}
                    </label>

                </div>
                <button type='submit' className='vote-btn txt-white'>Vote</button>
            </form>

            <button className='check-winner' onClick={winningProposal}>Check Winner</button>
        </div>
    )
}