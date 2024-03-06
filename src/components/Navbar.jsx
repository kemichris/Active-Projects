import React from 'react'

import Logo from "../assets/dappLogo.jpg"

export const Navbar = () => {
  return (
    <div>
        <nav className='flex'>
            <img className='logo' src={Logo} alt="logo" />
            <ul className='flex primary-color'>
                <li>Submit Address</li>
                <li>Vote Proposal</li>
            </ul>

            <button className='connect-btn primary-color'>Connect Wallet</button>

        </nav>
    </div>
  )
}
