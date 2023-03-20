import { ethers } from "hardhat";

async function main() {
  const Polynote = await ethers.getContractFactory("Polynote");
  const polynote = await Polynote.deploy();

  await polynote.deployed();

  console.log(`Polynote contract deployer to  ${polynote.address}`);
  // console.log(`Block explorer URL: https://l2scan.scroll.io/address/${lock.address}`); Uncomment here to use the pre-alpha
  console.log(
    `Block explorer URL: https://blockscout.scroll.io/address/${polynote.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
