pragma solidity 0.4.25;

library MerkleUtils {
    function containedInTree(bytes32 merkleRoot, bytes data, bytes32[] nodes, uint256 index) public pure returns(bool) {
        bytes32 hashData = keccak256(data);
        for(uint i = 0; i < nodes.length; i++) {
            if(index % 2 == 1) {
                hashData = keccak256(abi.encodePacked(nodes[i], hashData));
            } else {
                hashData = keccak256(abi.encodePacked(hashData, nodes[i]));
            }
            index /= 2;
        }

        return hashData == merkleRoot;
    }
}