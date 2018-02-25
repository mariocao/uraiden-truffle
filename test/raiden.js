var CustomToken = artifacts.require("./test/CustomToken.sol");
var RaidenMicroTransferChannels = artifacts.require(
  "./RaidenMicroTransferChannels.sol"
);

contract("RaidenMicroTransferChannels", function(accounts) {
  const receiver = accounts[0];
  const user = accounts[1];
  const deposit = 5;

  it("...requires a user with minted tokens", function() {
    return CustomToken.deployed()
      .then(instance => {
        token = instance;
        return token.mint({ from: user, value: web3.toWei("0.1", "ether") });
      })
      .then(() => {
        return token.balanceOf(user);
      })
      .then(balance => {
        assert.isAtLeast(
          tkn2num(balance),
          50,
          "The balance of the token is less than 50"
        );
      });
  });

  it("...should allow creating a channel with ERC20", function() {
    return CustomToken.deployed()
      .then(instance => {
        token = instance;
        return RaidenMicroTransferChannels.deployed();
      })
      .then(instance => {
        uraiden = instance;
        return token.approve(uraiden.address, deposit, { from: user });
      })
      .then(() => {
        return uraiden.createChannel(receiver, deposit, { from: user });
      })
      .then(result => {
        assert.equal(
          result.logs[0]["event"],
          "ChannelCreated",
          "No event for channel creation logged"
        );
      });
  });

  // it("...should allow creating a channel with ERC223 flow", function() {
  //   data = user.substring(2) + receiver;
  //   return CustomToken.deployed()
  //     .then(instance => {
  //       token = instance;
  //       return RaidenMicroTransferChannels.deployed();
  //     })
  //     .then(instance => {
  //       uraiden = instance;
  //       return token.transfer(uraiden.address, deposit, {
  //         from: user,
  //         data: data
  //       });
  //     });
  // });

  function tkn2num(bal) {
    const BigNumber = require("bignumber.js").BigNumber;
    return new BigNumber(bal).toNumber();
  }
});
