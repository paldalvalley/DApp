var DietManager = artifacts.require("./DietManager.sol");
var LoomyToken = artifacts.require("./LoomyToken.sol")
module.exports = function(deployer) {
  deployer.deploy(LoomyToken)
    .then(() => {
      return deployer.deploy(DietManager, LoomyToken.address)
    })
  // deployer.deploy(DietManager, LoomyToken.address)
  //
  // deployer.deploy(B).then(function() {
  //   return deployer.deploy(A, B.address);
  // });
}
