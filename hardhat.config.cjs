require("@nomicfoundation/hardhat-ethers");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    bscMainnet: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      ...(process.env.PRIVATE_KEY ? { accounts: [process.env.PRIVATE_KEY] } : {})
    },
    bscTestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      chainId: 97,
      ...(process.env.PRIVATE_KEY ? { accounts: [process.env.PRIVATE_KEY] } : {})
    }
  },
  etherscan: {
    apiKey: process.env.BSCSCAN_API_KEY
  }
};
