import { Button } from '@mui/material'
import { useWeb3Modal } from '@web3modal/wagmi/react'

// import ClearButton from '../ClearButton'
// import ClearButton from '@/components/ClearButton.vue'
// import MetaMaskOnboarding from '@metamask/onboarding'
// import { ethers } from 'ethers'
// import { useMetaMaskStore } from '@/stores/metamask'

const ConnectButton = () => {
  // const [isConnected, setIsConnected] = useState(false)
  //   const [metaMaskStore] = useMetaMaskStore()
  //   const onboarding = new MetaMaskOnboarding()

  //   useEffect(() => {
  //     init()

  //     return () => {
  //       window.ethereum.removeListener('accountsChanged', requestAccounts)
  //     }
  //   }, [])

  //   async function init() {
  //     console.log('init')

  //     if (MetaMaskOnboarding.isMetaMaskInstalled()) {
  //       if (metaMaskStore.account !== '') {
  //         console.log('CONNECTED', metaMaskStore.account)

  //         setIsConnected(true)
  //         onboarding.stopOnboarding()
  //       } else {
  //         console.log('DISCONNECTED')
  //       }

  //       window.ethereum.on('accountsChanged', requestAccounts)
  //     } else {
  //       console.log('METAMASK NOT INSTALLED')
  //     }
  //   }

  //   function requestAccounts() {
  //     console.log('requestAccounts')

  //     window.ethereum
  //       .request({ method: 'eth_requestAccounts' })
  //       .then((accounts) => {
  //         metaMaskStore.setAccount(accounts)

  //         setIsConnected(true)
  //       })
  //       .catch((e) => console.log(e))
  //   }

  //   function handleClickMetaMask() {
  //     if (isConnected) disconnectWallet()
  //     else connectWallet()
  //   }

  //   function connectWallet() {
  //     if (!isConnected) {
  //       requestAccounts()
  //     }
  //   }

  //   function disconnectWallet() {
  //     metaMaskStore.disconnect()

  //     setIsConnected(false)
  //   }

  //   async function depositAsset() {
  //     const contractAbi = ['function deposit(uint256 assets, address receiver) public returns (uint256)']

  //     const provider = new ethers.providers.Web3Provider(window.ethereum)
  //     const contractAddress = '0x9956150D4065892cC28b34C588Cb08e9eD01a2C9'
  //     const contract = new ethers.Contract(contractAddress, contractAbi, provider)
  //     const signer = provider.getSigner()
  //     const signerAddress = await signer.getAddress()
  //     const contractWithSigner = contract.connect(signer)

  //     await contractWithSigner.deposit(depositAmount, signerAddress)
  //   }

  const { open } = useWeb3Modal()

  return (
    // <ClearButton handleClickClearButton={() => console.log('init connection')}>
    //   {isConnected ? (
    //     <Grid container alignItems="center" spacing={1}>
    //       <Grid item>
    //         <img className="mr-1" src="@/assets/icons/metamask.png" alt="MetaMask Logo" />
    //       </Grid>
    //       <Grid item>
    //         <Typography>{metaMaskStore.account.slice(0, 5)}</Typography>
    //       </Grid>
    //       <Grid item>
    //         <Typography>...</Typography>
    //       </Grid>
    //       <Grid item>
    //         <Typography>{metaMaskStore.account.substring(metaMaskStore.account.length - 4)}</Typography>
    //       </Grid>
    //     </Grid>
    //   ) : (
    //     <Typography>CONNECT WALLET</Typography>
    //   )}
    // </ClearButton>
    <Button onClick={() => open()}>Connect Wallet</Button>
  )
}

export default ConnectButton
