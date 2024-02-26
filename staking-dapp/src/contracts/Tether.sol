// SPDX-License-Identifier: MIT

pragma solidity ^0.5.0;

contract Tether {
    string public name = "Kemi Tether Token";
    string public symbol = "kUSDT";
    uint256 public totalSupply = 1000000000000000000000000; // 1 million tokens
    uint8 public decimal = 18;
    

    // declaring the transfer event for sending tokens
    //only use 3 indexed for an event as this adds to making gas fee high
    event Transfer (
        uint indexed _date,
        address indexed _from,
        address indexed _to,
        uint _value
    );

    event Approval (
        address indexed _owner,
        address indexed _spender,
        uint _value
    );

    mapping (address => uint256) public balanceOf;

    mapping ( address => mapping (address => uint256)) public allowance;

    constructor() public {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint _value) public returns(bool success) {
        //requires that the value is equal or greater than the transfer
        require(balanceOf[msg.sender] >= _value);

        //subtract the amount from the senders balance
        balanceOf[msg.sender] -= _value;

        //add the amount to the receivers balance
        balanceOf[_to] += _value;

        //eemiting the event
        //block.timestamp is global variable that gives current time stamp
        emit Transfer(block.timestamp, msg.sender, _to, _value);
        return true;
    } 

    function approve (address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender] [_spender] = _value;
        emit Approval (msg.sender, _spender, _value);
    }

    function trasferFrom(address _from,  address _to, uint256 _value) public returns (bool success) {

        require(balanceOf[_from] >= _value);

        require(balanceOf[_from] >= allowance[_from][msg.sender]);

        // subtract from the trasfer from
        balanceOf[_from] -= _value;

         //add to the balance of receiver 
        balanceOf[_to] += _value;

        allowance[_from] [msg.sender] -= _value;

        emit Transfer(block.timestamp, _from, _to, _value);

        return true; 
    }

}