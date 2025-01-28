



import { useEffect, useState } from "react"
import {Web3Context} from "./Web3Context"
import GetWeb3State from "../utils/GetWeb3State"
import HandelAccountChange from "../utils/HandelAccountChange"
import HandelChainChange from "../utils/HandelChainChange"

const Web3Provider = ({children}) => {

    const [web3State, setWeb3State] = useState({
        selectedAccount:null, 
        chainId:null, 
        contractInstance:null,
        signer:null
    })
    const handelWallet = async () => {
        try {
            const { selectedAccount, chainId, contractInstance, signer } = await GetWeb3State();
            console.log(selectedAccount, chainId, contractInstance,signer);
            setWeb3State({ selectedAccount, chainId, contractInstance,signer });
        } catch (error) {
            console.log("ERROR: HANDEL WALLET", error);
            throw new Error(error);
        }
    };


    useEffect(()=>{

        window.ethereum.on('accountsChanged', ()=> HandelAccountChange(setWeb3State));

        window.ethereum.on('chainChanged', ()=> HandelChainChange(setWeb3State));

        return () => {
            window.ethereum.removeListener('accountsChanged',()=> HandelAccountChange(setWeb3State));
            window.ethereum.removeListener('chainChanged',()=> HandelChainChange(setWeb3State));
        }

    })

  return (
    <Web3Context.Provider value={{...web3State, handelWallet}}>
    {children}
    </Web3Context.Provider>
  )
}

export default Web3Provider