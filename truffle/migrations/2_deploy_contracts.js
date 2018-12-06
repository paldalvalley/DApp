var DietManager = artifacts.require("./DietManager.sol");

module.exports = function(deployer) {
  deployer.deploy(DietManager)
}
