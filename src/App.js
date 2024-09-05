import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Navigation from './components/Navigation'
import Section from './components/Section'
import Product from './components/Product'
import Footer from './components/Footer'

// ABIs
import CryptoBasket from './abis/CryptoBasket.json'

// Config
import config from './config.json'


function App() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [cryptobasket, setCryptoBasket] = useState(null);

  const [electronics, setElectronics] = useState(null)
  const [clothing, setClothing] = useState(null)
  const [toys, setToys] = useState(null)

  const [item, setItem] = useState({})
  const [toggle, setToggle] = useState(false)

  const togglePop = (item) => {
    setItem(item)
    toggle ? setToggle(false) : setToggle(true)
  }

  const loadBlockchainData = async () => {
    // Connect to blockchain
      // ## Connect to the blockchain via any web3-compatible provider,
      //    like the one injected by MetaMask (i.e., window.ethereum).
      // 'window.ethereum' is an object injected into the browser by 
      //    Ethereum-compatible browsers or browser extensions like MetaMask.
    const provider = new ethers.providers.Web3Provider(window.ethereum);  // ## MetaMask is the provider
    setProvider(provider)  // ## MetaMask (via the provider) connects the application to the blockchain.

    const network = await provider.getNetwork()  // ## Hardhat Network


    // Connect to smart contract (Create JS Versions)
    const cryptobasket = new ethers.Contract(
      config[network.chainId].cryptobasket.address, 
      CryptoBasket, 
      provider
    );
    setCryptoBasket(cryptobasket)


    // Load products
    const items = []

    for (var i = 0; i < 9; i++) {
      const item = await cryptobasket.items(i+1);
      items.push(item);
    }

    const electronics = items.filter((item) => item.category === "electronics")
    const clothing = items.filter((item) => item.category === 'clothing')
    const toys = items.filter((item) => item.category === 'toys')

    setElectronics(electronics)
    setClothing(clothing)
    setToys(toys)
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  return (
    <div className='app'>
      <Navigation account={account} setAccount={setAccount} provider={provider} cryptobasket={cryptobasket}/>

      <h2 className='text-white'>CryptoBasket Best Sellers</h2>

      {electronics && clothing && toys && (
        <>
          <Section title={"Electronics & Gadgets"} items={electronics} togglePop={togglePop} />
          <Section title={"Clothing & Accessories"} items={clothing} togglePop={togglePop} />
          <Section title={"Toys & Gaming"} items={toys} togglePop={togglePop} />
        </>
      )}

      {toggle && (
        <Product item={item} provider={provider} account={account} cryptobasket={cryptobasket} togglePop={togglePop} />
      )}

      <Footer />
    </div>
  );
}

export default App;
