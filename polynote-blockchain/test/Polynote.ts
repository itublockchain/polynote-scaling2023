import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
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
<<<<<<< HEAD
        await polynote.isShared(user1.getAddress(), user2.getAddress())
=======
        await polynote.isShared(user1.getAddress(), 0, user2.getAddress())
>>>>>>> contract
      ).to.equal(false);
    });

    it("Share with partner", async function () {
      const { polynote, user1, user2 } = await loadFixture(deployFixture);
<<<<<<< HEAD
      await polynote.connect(user1).addPartner(user2.getAddress());
      expect(
        await polynote.isShared(user1.getAddress(), user2.getAddress())
=======
      await polynote.connect(user1).addPartners(0, [user2.getAddress()]);
      expect(
        await polynote.isShared(user1.getAddress(), 0, user2.getAddress())
>>>>>>> contract
      ).to.equal(true);
    });

    it("Remove partner", async function () {
      const { polynote, user1, user2 } = await loadFixture(deployFixture);
<<<<<<< HEAD
      await polynote.connect(user1).addPartner(user2.getAddress());
      expect(
        await polynote.isShared(user1.getAddress(), user2.getAddress())
      ).to.equal(true);

      await polynote.connect(user1).removePartner(user2.getAddress());

      expect(
        await polynote.isShared(user1.getAddress(), user2.getAddress())
=======
      await polynote.connect(user1).addPartners(0, [user2.getAddress()]);
      expect(
        await polynote.isShared(user1.getAddress(), 0, user2.getAddress())
      ).to.equal(true);

      await polynote.connect(user1).removePartners(0, [user2.getAddress()]);

      expect(
        await polynote.isShared(user1.getAddress(), 0, user2.getAddress())
>>>>>>> contract
      ).to.equal(false);
    });
  });
});
