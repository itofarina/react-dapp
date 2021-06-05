import './App.css';
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'
import { useState } from 'react';
import { ethers } from 'ethers';

const greeterAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3'

function App() {
  const [greetingValue, setGreetingValue] = useState('')

  const requestAccount = async () => {
    await window.ethereum.request({ method: 'eth_requestAccounts' })
  }

  const fetchGreeting = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider)
      try {
        const data = await contract.greet()
        console.log({ data })
      } catch (error) {
        console.log({ error })
      }
    }
  }

  const setGreeting = async () => {
    if (!greetingValue) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer)
      const transaction = await contract.setGreeting(greetingValue)
      await transaction.wait()
      fetchGreeting()
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={fetchGreeting}>Fetch Greeting</button>
        <button onClick={setGreeting}>Set Greeting</button>
        <input
          onChange={e => setGreetingValue(e.target.value)}
          placeholder="Set greeting "
          value={greetingValue}
        />
      </header>
    </div>
  );
}

export default App;
