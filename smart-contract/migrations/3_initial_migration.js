const AbdoToken = artifacts.require("AbdoToken");

module.exports = function (deployer) {
  deployer.deploy(AbdoToken);
};
