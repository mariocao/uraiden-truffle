var CustomToken = artifacts.require("./test/CustomToken.sol");
var RaidenChannels = artifacts.require("./RaidenMicroTransferChannels.sol");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(RaidenChannels, CustomToken.address, 500, [accounts[0]]);
};
