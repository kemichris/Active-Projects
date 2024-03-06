import React from 'react'

export const ProposalsSection = () => {
  return (
    <div>
        <h2>Proposals</h2>
        <p>Here are the proposals submitted by the community; every member has the right to vote for their choice of proposals.</p>
        <div className="proposal-card">
            <div className="proposal-1">
                <h3>Community Events Sponsorship</h3>
                <p>Proposal to allocate funds for sponsoring local community events related to blockchain and technology.</p>
            </div>
            <div className="proposal-2">
                <h3>Development Grant Program</h3>
                <p>Proposal to establish a grant program to support developers working on innovative blockchain projects.</p>
            </div>
            <div className="proposal-3">
                <h3>Educational Webinar Series</h3>
                <p>Proposal to organize a series of educational webinars to increase awareness and understanding of blockchain technology.</p>
            </div>
            <div className="proposal-4">
                <h3>Blockchain for Social Impact</h3>
                <p>PProposal to allocate resources for blockchain projects aimed at addressing social and environmental challenges.</p>
            </div>
            <div className="proposal-5">
                <h3>Security and Auditing Framework</h3>
                <p>Proposal to allocate resources for blockchain projects aimed at addressing social and environmental challenges.</p>
            </div>
        </div>

        <button>Vote</button>
    </div>
  )
}
