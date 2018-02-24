var CustomToken = artifacts.require("./raiden/test/CustomToken.sol");

contract('CustomToken', function(accounts) {

  it("...should have initial value set to 1000", function() {
    return CustomToken.deployed().then(function(instance) {
      customTokenInstance = instance;

      return customTokenInstance.balanceOf(accounts[0]);
    }).then(function(balance) {
      assert.equal(balance, 1000, "The initial value of the token (1000) was wrong");
    });
  });

});
