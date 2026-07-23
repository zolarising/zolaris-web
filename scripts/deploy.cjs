const hre = require("hardhat");

async function main() {
  // ethers v6 uses hre.ethers.getSigners directly
  const signers = await hre.ethers.getSigners();
  const deployer = signers[0];
  
  console.log("Desplegando el contrato con la cuenta:", deployer.address);
  
  // Get balance
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Balance de la cuenta:", hre.ethers.formatEther(balance), "BNB");

  // Deploy the contract
  const ZolarisToken = await hre.ethers.getContractFactory("ZolarisToken");
  const token = await ZolarisToken.deploy(deployer.address);

  await token.waitForDeployment();

  const contractAddress = await token.getAddress();
  console.log("¡ÉXITO! ZolarisToken (ZOL) desplegado en la dirección:", contractAddress);
  console.log("Guarda esta dirección y actualiza dashboard-web3.html");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
