const AbdoNFT = artifacts.require("AbdoNFT.sol");

module.exports = function (deployer) {
  deployer.deploy(AbdoNFT).then(() => {
    if (AbdoNFT._json) {
        fs.writeFile("ABI", JSON.stringify(AbdoNFT._json.abi), (err) => {
            if (err) throw err;
            console.log("ABI Success");
        });

        fs.writeFile("address", AbdoNFT.address, (err) => {
            if (err) throw err;
            console.log("Address Success");
        });
    }
});
};
