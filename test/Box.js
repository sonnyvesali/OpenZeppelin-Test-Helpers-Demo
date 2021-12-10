// //fundamentally let's start outline the process of what we want to test
// const Box = artifacts.require("Box");
// const { expect } = require("chai");
// const { BN, expectEvent, expectRevert } = require("@openzeppelin/test-helpers");

contract("Box", function () {
  beforeEach(async function () {
    this.box = await Box.new();
  });
  it("Should return the previously stored value", async function () {
    await this.box.store(4422);

    assert(String(await this.box.retrieve()) === "4422");
    // ORRR;
  });
});
//================================================================================
// Start of the more complex version that covers all the bases
//================================================================================

const { expect } = require("chai");

// Import utilities from Test Helpers
const { BN, expectEvent, expectRevert } = require("@openzeppelin/test-helpers");

// Load compiled artifacts
const Box = artifacts.require("Box");

// Start test block
contract("Box", function ([owner, other]) {
  // Use large integers ('big numbers')
  const value = new BN("42");

  beforeEach(async function () {
    this.box = await Box.new({ from: owner });
  });

  it("retrieve returns a value previously stored", async function () {
    await this.box.store(value, { from: owner });

    // Use large integer comparisons
    expect(await this.box.retrieve()).to.be.bignumber.equal(value);
  });

  it("store emits an event", async function () {
    const receipt = await this.box.store(value, { from: owner });

    // Test that a ValueChanged event was emitted with the new value
    expectEvent(receipt, "ValueChanged", { value: value });
  });

  it("non owner cannot store a value", async function () {
    // Test a transaction reverts
    try {
      await promise;
      throw null;
    } catch (error) {
      await this.box.store(value, { from: other }),
        "Ownable: caller is not the owner";
    }
  });
});
