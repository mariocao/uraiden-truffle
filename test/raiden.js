var CustomToken = artifacts.require("./test/CustomToken.sol");
var RaidenMicroTransferChannels = artifacts.require(
  "./RaidenMicroTransferChannels.sol"
);

contract("RaidenMicroTransferChannels", function(accounts) {
  const receiver = accounts[0];
  const user = accounts[1];
  const deposit = 5;
  // console.log("deposit: ", deposit);
  // console.log("account[0] - receiver: ", receiver);
  // console.log("account[1] - sender: ", sender);

  it("...requires a user with minted tokens", function() {
    return CustomToken.deployed().then(function(token) {
      // console.log("token addr: ", tokenAddr);
      token.mint({ from: user, value: web3.toWei("0.1", "ether") }).then(() => {
        return token.balanceOf(user).then(balance => {
          assert.isAtLeast(
            balance,
            50,
            "The balance of the token is less than 50"
          );
        });
      });
    });
  });
});
