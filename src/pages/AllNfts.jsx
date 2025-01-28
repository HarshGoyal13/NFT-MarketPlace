


import React, { useContext, useEffect, useState } from 'react';
import Loader from "../components/Loader"
import { Web3Context } from "../context/Web3Context";
import { ethers } from 'ethers';
import NFTCard from '../components/NFTCard';
import toast from 'react-hot-toast';



const AllNfts = () => {

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const { selectedAccount, contractInstance } = useContext(Web3Context);
  const [Nfts, setNfts] = useState(null);

  const getAllNfts = async () => {
    if (!contractInstance || !selectedAccount) {
      console.log("ERROR : FETCHING OWNER NFTS");
      return;
    }
    try {
      setLoading(true);
      setMessage("Fetching Your NFTS..");
      const data = await contractInstance.allNFTs();

      const NFTSlist = data.map((nfts) => ({
        Id: nfts.tokenId,
        Owner: nfts.owner,
        title: nfts.title,
        category: nfts.category,
        description: nfts.description,
        price: ethers.formatEther(nfts.price),
        image: nfts.fileURI || 'https://via.placeholder.com/150', // Fallback image
        TimeStamp: nfts.timeStamp || 'Unknown',
        OnSale: nfts.isOnSale,
      }));


      setNfts(NFTSlist);
      setLoading(false);
      setMessage("");
    } catch (error) {
      console.log(error);
      toast.error("ERROR : FETCHING OWNER NFTs")
    }
  };

    useEffect(() => {
      if (selectedAccount) {
        getAllNfts();
      }
    }, [selectedAccount]);


  return (
    <div>

<div className="p-6">
        {loading && <Loader message={message}/>}

        <div className="mb-8 ">
      <h1 className="text-white font-bold  text-3xl sm:text-4xl md:text-5xl text-center mb-6">
        <span className='text-red-500'>All</span> <span className='text-purple-500'>NFTs</span> 
      </h1>
    </div>

      {Nfts && Nfts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Nfts.map((nft, index) => (
            <NFTCard key={index} nft={nft} />
          ))}
        </div>
      ) : (
        !loading && <p className="text-white text-center">No NFTs found.</p>
      )}
    </div>

    </div>
  )
}

export default AllNfts