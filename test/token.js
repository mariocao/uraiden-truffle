var CustomToken = artifacts.require("./raiden/test/CustomToken.sol");

contract("CustomToken", function(accounts) {
  const owner = accounts[0];
  const user = accounts[1];

  const exp_owner_bal = 1000;
  const exp_user_bal = 0;

  it("...should have initial value set to 1000 for the owner", function() {
    return CustomToken.deployed()
      .then(function(instance) {
        customTokenInstance = instance;

        return customTokenInstance.balanceOf(owner);
      })
      .then(function(balance) {
        assert.equal(
          balance,
          exp_owner_bal,
          "The initial value of the token (1000) was wrong"
        );
      });
  });

  it("...should have initial value set to 0 for a user", function() {
    return CustomToken.deployed()
      .then(function(instance) {
        customTokenInstance = instance;

        return customTokenInstance.balanceOf(user);
      })
      .then(function(balance) {
        assert.equal(
          balance,
          exp_user_bal,
          "The initial value of the token (1000) was wrong"
        );
      });
  });

  it("...should allow token minting", function() {
    return CustomToken.deployed().then(function(instance) {
      customTokenInstance = instance;

      customTokenInstance
        .mint({
          from: user,
          value: web3.toWei("0.1", "ether")
        })
        .then(() => {
          return customTokenInstance.balanceOf(user).then(balance => {
            assert.equal(
              balance,
              exp_user_bal + 50,
              "The balance of the token is wrong"
            );
          });
        });
    });
  });

});
