const etherlime = require('etherlime');
const MerkleUtils = require('../build/MerkleUtils.json');
const MerkleLime = require('../build/MerkleLime.json');
const ethers = require('ethers');
const utils = ethers.utils;


const deploy = async (network, secret) => {

	const aOriginal = 'a;b;50';
	const bOriginal = 'b;c;20';
	const cOriginal = 'c;d;30';
	const dOriginal = 'd;a;10';
	const eOriginal = 'a;b;50';
	const fOriginal = 'b;c;20';
	const gOriginal = 'c;d;30';
	const hOriginal = 'd;a;10';
	const aHash = utils.solidityKeccak256(['bytes'], [utils.toUtf8Bytes(aOriginal)]);
	const bHash = utils.solidityKeccak256(['bytes'], [utils.toUtf8Bytes(bOriginal)]);
	const cHash = utils.solidityKeccak256(['bytes'], [utils.toUtf8Bytes(cOriginal)]);
	const dHash = utils.solidityKeccak256(['bytes'], [utils.toUtf8Bytes(dOriginal)]);
	const eHash = utils.solidityKeccak256(['bytes'], [utils.toUtf8Bytes(eOriginal)]);
	const fHash = utils.solidityKeccak256(['bytes'], [utils.toUtf8Bytes(fOriginal)]);
	const gHash = utils.solidityKeccak256(['bytes'], [utils.toUtf8Bytes(gOriginal)]);
	const hHash = utils.solidityKeccak256(['bytes'], [utils.toUtf8Bytes(hOriginal)]);
	const abHash = utils.solidityKeccak256(['bytes32', 'bytes32'], [aHash, bHash]);
	const cdHash = utils.solidityKeccak256(['bytes32', 'bytes32'], [cHash, dHash]);
	const efHash = utils.solidityKeccak256(['bytes32', 'bytes32'], [eHash, fHash]);
	const ghHash = utils.solidityKeccak256(['bytes32', 'bytes32'], [gHash, hHash]);
	const abcdHash = utils.solidityKeccak256(['bytes32', 'bytes32'], [abHash, cdHash]);
	const efghHash = utils.solidityKeccak256(['bytes32', 'bytes32'], [efHash, ghHash]);

	const root = utils.solidityKeccak256(['bytes32', 'bytes32'], [abcdHash, efghHash]);
	console.log(root);

	const deployer = new etherlime.EtherlimeGanacheDeployer();
	const MerkleUtilsLib = await deployer.deploy(MerkleUtils);
	const result = await deployer.deploy(MerkleLime, { MerkleUtils: MerkleUtilsLib.contractAddress }, root);
	const merkleContract = result.contract;
	const isPart = await merkleContract.verifyDataInState(utils.toUtf8Bytes(eOriginal), [fHash, ghHash, abcdHash], 4)
	console.log(isPart);

};

module.exports = {
	deploy
};