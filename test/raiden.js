var CustomToken = artifacts.require("./test/CustomToken.sol");
var RaidenMicroTransferChannels = artifacts.require(
  "./RaidenMicroTransferChannels.sol"
);

contract("RaidenMicroTransferChannels", function(accounts) {
  const receiver = accounts[0];
  const user = accounts[1];
  const deposit = 5;

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

  it("...should allow creating a channel", function() {
    return CustomToken.deployed().then(function(token) {
      return RaidenMicroTransferChannels.deployed().then(function(uraiden) {
        console.log("\nuRaiden addr: ", uraiden.address);
        token
          .approve(uraiden.address, deposit, {
            from: user
          })
          .then(() => {
            // assert.equal(approval, "", "rm -The value 89 was not stored.");
            return uraiden
              .createChannel(receiver, deposit, {
                from: user
              })
              .then(result => {
                assert.equal(
                  result.logs[0]["event"],
                  "ChannelCreated",
                  "No event for channel creation logged"
                );
              });
          });
      });
    });
  });
});
