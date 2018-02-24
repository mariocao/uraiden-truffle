var CustomToken = artifacts.require("./raiden/test/CustomToken.sol");

contract("CustomToken", function(accounts) {
  const sender = accounts[0];

  it("...should have initial value set to 1000", function() {
    return CustomToken.deployed()
      .then(function(instance) {
        customTokenInstance = instance;

        return customTokenInstance.balanceOf(sender);
      })
      .then(function(balance) {
        assert.equal(
          balance,
          1000,
          "The initial value of the token (1000) was wrong"
        );
      });
  });

  it("...should allow token minting", function() {
    return CustomToken.deployed().then(function(instance) {
      customTokenInstance = instance;

      customTokenInstance
        .mint({
          from: sender,
          value: web3.toWei("0.1", "ether")
        })
        .then(() => {
          return customTokenInstance.balanceOf(sender).then(balance => {
            assert.equal(
              tkn2num(balance),
              1050,
              "The balance of the token is wrong"
            );
          });
        });
    });
  });

  function tkn2num(bal) {
    const BigNumber = require("bignumber.js").BigNumber;
    return new BigNumber(bal).toNumber();
  }
});
