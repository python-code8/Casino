//SPDX-License-Identifier: MIT
pragma solidity 0.6.6;

import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract Casino is VRFConsumerBase, Ownable {

    bytes32 internal keyHash;
    uint256 internal fee;
    uint256 public randomResult;
    uint256 public contractBalance;

    event Outcome(address player, uint256 amount, bool result);

    constructor(

        address _vrfcoordinator,
        address _linktoken,
        bytes32 _keyhash,
        uint256 _fee
        ) 
        public VRFConsumerBase(
            _vrfcoordinator,
            _linktoken
        )
    {
        keyHash = _keyhash;
        fee =  _fee;
    }
    
  
    function getRandomNumber() public returns (bytes32 requestId) {
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK - fill contract with faucet");
        return requestRandomness(keyHash, fee);
    }


    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        randomResult = randomness % 2;
    }


    function flip(uint256 choice) public payable {
        require(msg.value > 0, "Invalid amount");
        bool result;

        if (choice == randomResult) {
            contractBalance -= msg.value;
            payable(msg.sender).transfer(msg.value * 2);
            emit Outcome(msg.sender, msg.value, true);
        } 
        else {
            contractBalance += msg.value;
            emit Outcome(msg.sender, msg.value, false);
        }
    }

    function checkContractBalance() public view returns (uint256) {
        return contractBalance;
    }

    function fundContract() public payable onlyOwner {
        contractBalance = contractBalance.add(msg.value);
    }

    function withdraw() public payable onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
        contractBalance = 0;
    }
}
