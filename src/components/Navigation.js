import { ethers } from 'ethers'
import config from '../config.json'
import { useState } from 'react'

const Navigation = ({ account, setAccount, provider, cryptobasket }) => {
    const [isOwner, setIsOwner] = useState(false)
    const [isFundsWithdrawn, setIsFundsWithdrawn] = useState(false)

    const connectHandler = async () => {
        // ## window.ethereum accesses the MetaMask browser extension
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = ethers.utils.getAddress(accounts[0]);
        setAccount(account);

        // Check if it is the owner's account
        if (account === config["owner"].address) {
            setIsOwner(true);
        }
    }

    const withdrawFunds = async () => {
        const signer = await provider.getSigner()
        // Withdraw
        let transaction = await cryptobasket.connect(signer).withdraw()
        await transaction.wait()
        setIsFundsWithdrawn(true)
    }

    return (
        <nav>
            <div className='nav__brand'>
                <h1>CryptoBasket</h1>
            </div>

            <input
                type="text"
                className="nav__search"
                placeholder='Search...'
            />

            {account ? (
                <div className='buttons'>
                    <button
                        type="button"
                        className='nav__connect'
                    >
                        {account.slice(0, 6) + '...' + account.slice(38, 42)}
                    </button>
                    {isOwner ? (
                        <button
                            type="button"
                            className='nav__connect'
                            onClick={withdrawFunds}
                            disabled={isFundsWithdrawn}
                        >
                            {isFundsWithdrawn ? 'Funds Withdrawn' : 'Withdraw Funds'}
                        </button>
                    ) : null}
                </div>
            ) : (
                <div className='buttons'>
                    <button
                        type="button"
                        className='nav__connect'
                        onClick={connectHandler}
                    >
                        Connect
                    </button>
                    {isOwner ? (
                        <button
                            type="button"
                            className='nav__connect'
                            onClick={withdrawFunds}
                            disabled={isFundsWithdrawn}
                        >
                            {isFundsWithdrawn ? 'Funds Withdrawn' : 'Withdraw Funds'}
                        </button>
                    ) : null}
                </div>
            )}

            

            <ul className='nav__links'>
                <li><a href="#Electronics & Gadgets">Electronics & Gadgets</a></li>
                <li><a href="#Clothing & Accessories">Clothing & Accessories</a></li>
                <li><a href="#Toys & Gaming">Toys & Gaming</a></li>
            </ul>
        </nav>
    );
}

export default Navigation;
