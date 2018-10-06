pragma solidity 0.4.25;

import "./MerkleUtils.sol";

contract MerkleLime {

	bytes32 public limeRoot;

	constructor(bytes32 merkleRoot) public {
		limeRoot = merkleRoot;
	}

	function verifyDataInState(bytes data, bytes32[] nodes, uint leafIndex) view public returns(bool) {
		return MerkleUtils.containedInTree(limeRoot, data, nodes, leafIndex);
	}

    
}