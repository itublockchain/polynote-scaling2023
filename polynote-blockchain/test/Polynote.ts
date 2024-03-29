import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Lock", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [deployer, user1, user2] = await ethers.getSigners();

    const Polynote = await ethers.getContractFactory("Polynote");
    const polynote = await Polynote.deploy();

    return { deployer, user1, user2, Polynote, polynote };
  }

  describe("Deployment", function () {
    it("Not shared in the beginning", async function () {
      const { polynote, user1, user2 } = await loadFixture(deployFixture);

      expect(
        await polynote.isShared(user1.getAddress(), "0", user2.getAddress())
      ).to.equal(false);
    });

    it("Share with partner", async function () {
      const { polynote, user1, user2 } = await loadFixture(deployFixture);
      await polynote.connect(user1).setPartners("0", [user2.getAddress()]);
      expect(
        await polynote.isShared(user1.getAddress(), "0", user2.getAddress())
      ).to.equal(true);
    });
  });
});
