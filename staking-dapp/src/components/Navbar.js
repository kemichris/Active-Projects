import React, { Component } from 'react'

import bankImg from "../bank.png"

class Navbar extends Component{
  render() {
    return (
      <nav className='navbar bg-body-tertiary fixed-top shadow p-0' style={{ background: 'black' }}>
        <a className='navbar-brand col-sm-3 col-md-2 mr-0'
          style={{ color: 'white' }} href="example.com"><img width="50" height="30" className='d-inline-block align-top' src={bankImg} alt="logo" /> 
          Dapp Yield Staking (Decentralized Banking)</a>

        <ul className='navbar-nav px-3'>
          <li className='text-nowrap d-none nav-item d-sm-none d-sm-block'>
            <small style={{ color: 'white' }}>Account Number:{this.props.account}</small>
          </li>
        </ul>

      </nav>
    )
  }
}

export default Navbar