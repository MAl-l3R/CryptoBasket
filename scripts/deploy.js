const hre = require("hardhat")
const { items } = require("../src/items.json")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
  // Setup Accounts
  const [deployer] = await ethers.getSigners()

  // Deploy CryptoBasket
  const CryptoBasket = await hre.ethers.getContractFactory("CryptoBasket")
  const cryptobasket = await CryptoBasket.deploy()
  await cryptobasket.deployed()

  console.log(`Deployed CryptoBasket Contract at: ${cryptobasket.address}\n`)
  console.log(`Deployed By (Owner): ${deployer.address}\n`)

  // Listing items...
  for (let i = 0; i < items.length; i++) {
    const transaction = await cryptobasket.connect(deployer).list(
      items[i].id,
      items[i].name,
      items[i].category,
      items[i].image,
      tokens(items[i].price),
      items[i].rating,
      items[i].stock,
    )

    await transaction.wait()

    console.log(`Listed item ${items[i].id}: ${items[i].name}`)
  }
}

// Handle errors
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
