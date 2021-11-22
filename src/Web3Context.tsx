import React, { useContext, useEffect, useRef, useState } from 'react'
import Web3 from 'web3'

export type Web3ContextState = {
  isWeb3: boolean
  isLoaded: boolean
  web3: Web3 | null
  accounts: string[]
  network: string
  networkId: number
  explorerUrl: string
  currentAddress: string
  error: Error | null
}

const Web3Context = React.createContext({} as Web3ContextState)

const Web3ContextProvider: React.FC = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isWeb3, setIsWeb3] = useState(false)
  const [accounts, setAccounts] = useState<string[]>([])
  const [network, setNetwork] = useState('')
  const [networkId, setNetworkId] = useState(0)
  const [explorerUrl, setExplorerUrl] = useState('')
  const [currentAddress, setCurrentAddress] = useState('0x0')
  const [error, setError] = useState<Error | null>(null)

  const web3Ref = useRef<Web3 | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        let web3: Web3
        let ethAccounts: string[]

        //  For most modern browsers
        if (window.ethereum) {
          web3 = new Web3(window.ethereum)
          window.web3 = web3
          ethAccounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
          })
        }
        // Legacy browsers, Using MetaMask's provider.
        else if (window.web3) {
          web3 = window.web3
          ethAccounts = await web3.eth.getAccounts()
        } else {
          throw new Error('No Ethereum providers found. Install Metamask first')
        }

        web3Ref.current = web3
        setAccounts(ethAccounts)
        setCurrentAddress(ethAccounts[0])
        const network = await web3.eth.net.getNetworkType()
        setNetwork(network)
        const ethExploredUrl = `https://${
          network !== 'main' ? `${network}.` : ''
        }etherscan.io`
        setExplorerUrl(ethExploredUrl)
        const networkId = await web3.eth.net.getId()
        setNetworkId(networkId)
        setIsWeb3(true)
        setIsLoaded(true)
      } catch (error) {
        setIsWeb3(false)
        setIsLoaded(false)
        setError(error as Error)
        console.error('Web3 Hook Error', error)
      }
    })()
    return () => {}
  }, [])

  return (
    <Web3Context.Provider
      value={{
        isLoaded,
        isWeb3,
        accounts,
        network,
        networkId,
        explorerUrl,
        currentAddress,
        web3: web3Ref.current,
        error
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}

const useWeb3 = () => {
  const context = useContext(Web3Context)

  return context
}

export { Web3Context, Web3ContextProvider, useWeb3 }
