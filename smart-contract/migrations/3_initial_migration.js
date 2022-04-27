const AbdoToken = artifacts.require("AbdoToken.sol");

module.exports = function (deployer) {
  deployer.deploy(AbdoToken).then(() => {
    if (AbdoToken._json) {
        fs.writeFile("ABI", JSON.stringify(AbdoToken._json.abi), (err) => {
            if (err) throw err;
            console.log("ABI Success");
        });

        fs.writeFile("address", AbdoToken.address, (err) => {
            if (err) throw err;
            console.log("Address Success");
        });
    }
});
};
