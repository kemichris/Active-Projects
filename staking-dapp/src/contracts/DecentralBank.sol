// SPDX-License-Identifier: MIT

pragma solidity ^0.5.0;

// Have access to the Tether tokens and reward tokens
//be able to keep track ot this
//Issue tokesn and reward tokens
//Be able to aceept deposit and withdrawals 

import "./RWD.sol";
import "./Tether.sol";

contract DecentralBank {
    string public name = "Kemi's Decentral BanK";
    address public owner;
    Tether public tether;
    RWD public rwd;

    address [] public stakers;

    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;


    constructor(RWD _rwd, Tether _tether) public {
        rwd = _rwd;
        tether = _tether;
        owner = msg.sender;
    }

    //Staking function
    function deposit(uint _amount) public {
        // amount must be greater than 0 
        require(_amount > 0, 'amout cannot be 0');

        //transfer tether tokens to this contract
        tether.trasferFrom(msg.sender, address(this), _amount);

        // update staking balance 
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        //update staking balance
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;       
    }

    //issue rewards
    function issueTokens() public {
        // require only owner to issue tokens only
        require(msg.sender == owner, "caller must be the owner");

        for (uint i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient] / 9; // devide by 9 to creat incentives;
            if(balance > 0) {
            rwd.transfer(recipient, balance);
            }
        }
    }

    // Unstaking function 
    function withdraw() public {
        uint balance = stakingBalance[msg.sender];

        // require the amount to be greater than zero
        require(balance > 0, "staking balance can't be less than zero");

        // transfer the withdrawn token to the owners address

        tether.transfer(msg.sender, balance);

        // reset staking balance 
        stakingBalance[msg.sender] = 0;

        // update staking status 
        isStaking[msg.sender] = false;

        
    }
    
}