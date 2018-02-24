
var CustomToken = artifacts.require("./test/CustomToken.sol");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(CustomToken, 1000, "GuanApps Token", "GUAN", 0);
};