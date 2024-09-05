const { expect } = require("chai")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

// Global constants for listing an item
const ID = 1
const NAME = "Shoes"
const CATEGORY = "Clothing"
const IMAGE = "https://ipfs.io/ipfs/QmTYEboq8raiBs7GTUg2yLXB3PMz6HuBNgNfSZBx5Msztg/shoes.jpg"
const COST = tokens(1)
const RATING = 4
const STOCK = 5

describe("CryptoBasket", () => {
  let cryptobasket
  let deployer, buyer

  beforeEach(async () => {
    // Setup Accounts
      // ## deployer: The account that deploys the contract.
      // ## buyer: An additional account used for interacting with the contract during testing.
    [deployer, buyer] = await ethers.getSigners()

    // Deploy contract
    const CryptoBasket = await ethers.getContractFactory("CryptoBasket")
    cryptobasket = await CryptoBasket.deploy()
  })

  describe("Deployment", () => {
    it('Sets the owner', async () => {  // ## 'it' stands for 'individual test'
      const owner = await cryptobasket.owner()
      expect(owner).to.equal(deployer.address)
    })
  })

  describe("Listing", () => {
    let transaction

    beforeEach(async () => {
      // ## 'connect' allows you to change the account that is associated with the contract instance.
      transaction = await cryptobasket.connect(deployer).list(
        ID,
        NAME,
        CATEGORY,
        IMAGE,
        COST,
        RATING,
        STOCK,
      )

      await transaction.wait()
    })

    it('Returns item attributes', async () => {
      const item = await cryptobasket.items(ID)

      expect(item.id).to.equal(ID)
      expect(item.name).to.equal(NAME)
      expect(item.category).to.equal(CATEGORY)
      expect(item.image).to.equal(IMAGE)
      expect(item.cost).to.equal(COST)
      expect(item.rating).to.equal(RATING)
      expect(item.stock).to.equal(STOCK)
    })

    it('Emits List event', async () => {
      expect(transaction).to.emit(cryptobasket, "List")
    })
  })

  describe("Buying", () => {
    let transaction

    beforeEach(async () => {
      // List an item
      transaction = await cryptobasket.connect(deployer).list(ID, NAME, CATEGORY, IMAGE, COST, RATING, STOCK)
      await transaction.wait()

      // Buy an item
      transaction = await cryptobasket.connect(buyer).buy(ID, { value: COST })
    })

    it("Updates buyer's order count", async () => {
      const result = await cryptobasket.orderCount(buyer.address)
      expect(result).to.equal(1)
    })

    it("Adds the order", async () => {
      const order = await cryptobasket.orders(buyer.address, 1)
      expect(order.time).to.be.greaterThan(0)
      expect(order.item.name).to.equal(NAME)
    })

    it('Updates the contract balance', async () => {
      // ## ethers.provider.getBalance() is used to check the balance of anything on the Ethereum blockchain
      const result = await ethers.provider.getBalance(cryptobasket.address)
      expect(result).to.equal(COST)
    })

    it('Emits Buy event', async () => {
      expect(transaction).to.emit(cryptobasket, "Buy")
    })
  })

  describe("Withdrawing", () => {
    let balanceBefore, transaction

    beforeEach(async () => {
      // List a item
      transaction = await cryptobasket.connect(deployer).list(ID, NAME, CATEGORY, IMAGE, COST, RATING, STOCK)
      await transaction.wait()

      // Buy a item
      transaction = await cryptobasket.connect(buyer).buy(ID, { value: COST })
      await transaction.wait()

      // Get Deployer balance before
      balanceBefore = await ethers.provider.getBalance(deployer.address)

      // Withdraw
      transaction = await cryptobasket.connect(deployer).withdraw()
      await transaction.wait()
    })

    it('Updates the owner balance', async () => {
      const balanceAfter = await ethers.provider.getBalance(deployer.address)
      expect(balanceAfter).to.be.greaterThan(balanceBefore)
    })

    it('Updates the contract balance', async () => {
      const result = await ethers.provider.getBalance(cryptobasket.address)
      expect(result).to.equal(0)
    })
    it('Emits Withdraw event', async () => {
      expect(transaction).to.emit(cryptobasket, "Withdraw")
    })
  })

})
