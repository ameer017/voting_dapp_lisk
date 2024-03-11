const { ethers } = require('hardhat');

async function main() {
  const VOTING = await ethers.getContractFactory('Voting');
  const voting = await VOTING.deploy();

  await voting.deployed();

  console.log('Voting Dapp Contract Deployed at ' + voting.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
