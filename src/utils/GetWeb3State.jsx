
import {ethers} from "ethers"
import contractAbi from "../constant/abi.json"



const GetWeb3State = async () => {

try{
    if(!window.ethereum){
        throw new Error("Metamask Not Installed");
    }

   
    const accounts = await window.ethereum.request({
        method:"eth_requestAccounts"
    })
    const selectedAccount = accounts[0];

    const chainIdHex = await window.ethereum.request({
         method:"eth_chainId"
    })
    const chainId = parseInt(chainIdHex, 16);
    
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contractAddress = "0x637Ca6eEF1a78cdae695aBe15D840bBBEb51173f";
    const contractInstance = new ethers.Contract(contractAddress,contractAbi, signer );

    return {selectedAccount, chainId, contractInstance, signer};

}catch(error){
    console.log(error);
    console.log("ERROR: GETING WEB 3 StaTE");
}
    
}

export default GetWeb3State

