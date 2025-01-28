import React, { useContext, useEffect, useRef, useState } from 'react';
import Loader from "../components/Loader"
import { Web3Context } from "../context/Web3Context";
import { ethers } from 'ethers';
import toast from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom'

const NFTDetails = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const { selectedAccount, contractInstance } = useContext(Web3Context);
    const [Nfts, setNfts] = useState(null);
    const [tokenuri, settokenUri] = useState(null);
    const [price, setPrice] = useState("");

    const getNftDetail = async () => {
        if (!contractInstance || !selectedAccount) {
            console.log("ERROR : FETCHING OWNER NFTS");
            return;
        }
        try {
            setLoading(true);
            setMessage("Fetching Your NFTS..");
            const data = await contractInstance.getNFTDetails(id);

            // Assuming data is an array and mapping it
            const NFT = data.map((nfts) => ({
                Id: nfts.tokenId,
                Owner: nfts.owner,
                title: nfts.title,
                category: nfts.category,
                description: nfts.description,
                price: ethers.formatEther(nfts.price || "0"), // Default to "0" if invalid price
                image: nfts.fileURI || 'https://via.placeholder.com/150', // Fallback image
                TimeStamp: new Date(Number(nfts.timeStamp) * 1000).toLocaleString(),
                OnSale: nfts.isOnSale,
            }));

            setNfts(NFT);
            setLoading(false);
            setMessage("");
        } catch (error) {
            console.log(error);
            toast.error("ERROR : FETCHING OWNER NFTs");
        }
    };


  
    const buyToken = async (nft) => {
        // Check if the selected account and contract instance are set
        if (!selectedAccount || !contractInstance) {
            console.log("ERROR: Missing selected account or contract instance");
            return;
        }
    
        try {
            setLoading(true);
            setMessage("Wait For Transaction...");

            console.log(nft.price)
    
            // Ensure the user is sending enough ether
            const value = ethers.parseEther(nft.price);  // Accessing nft.price directly
            console.log(value)
            // Initiating the transaction to buy the NFT
            const tx = await contractInstance.buyNFT(nft.Id, {
                value: value, // Sending the correct ether amount for purchase
                from: selectedAccount, // The address of the user buying the NFT
            });
    
            await tx.wait();
            setLoading(false);
            setMessage("NFT Purchased Successfully!");
            console.log(`Transaction successful: ${tx.hash}`);
    
        } catch (error) {
            // Handle any errors
            setLoading(false);
            console.error("Error during NFT purchase:", error);
            setMessage("Transaction failed, please try again.");
        }
    };

    const tokenUri = async () => {
        if (!selectedAccount || !contractInstance) {
            console.log("ERROR: Missing selected account or contract instance");
            return;
        }
    
        try {
            // Fetch the token URI
            const ipfsUrl = await contractInstance.viewTokenURI(id);
            console.log("Token URI:", ipfsUrl);
    
            settokenUri(ipfsUrl)
        } catch (error) {
            console.error("Error fetching token URI or metadata:", error);
        }
    };
    
   
    const handlePriceChange = (e) => {
        setPrice(e.target.value);  
    };



    const setNftPrice = async (ID) => {
        // Validation
        if (!contractInstance || !selectedAccount) {
            console.error("ERROR: Contract instance or account not available.");
            return;
        }
        if (!price || price < 0) {
            console.error("ERROR: Invalid amount.");
            return;
        }
        const amountInWei = ethers.parseEther(price);

        try {
            setLoading(true);
            setMessage("Wait for Set Price..")
            const data = await contractInstance.setprice(ID, amountInWei);
            setLoading(false);
            setMessage("")
            toast.success("SET PRICE SUCCESSFULLY ")
            console.log("Transaction successful:", data);
        } catch (error) {
            setLoading(false)
            console.error("Error setting price:", error);
        }
    };
    
    


    useEffect(() => {
        if (selectedAccount) {
            getNftDetail();
            tokenUri();
        }
    }, [selectedAccount]);

    return (
        <>
        <div className="min-h-screen py-11   overflow-x-hidden">
            {loading && <Loader message={message} />}
            <div className="container mx-auto px-6">
                {Nfts && Nfts.length > 0 ? (
                    Nfts.map((nft, index) => (
                        <div
                            key={index}
                            className="flex flex-col gap-6 mb-6 p-6 rounded-2xl transition-all duration-500 transform hover:scale-105 sm:w-full lg:w-[600px] mx-auto"
                        >
                            {/* NFT Image */}
                            <div className="group relative overflow-hidden rounded-2xl mb-6">
                                <img
                                    src={nft.image}
                                    alt={nft.title}
                                    className="w-[300] h-[400px] object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 opacity-25 group-hover:opacity-0 transition-all duration-300 rounded-2xl" />
                            </div>
    
                            {/* NFT Info */}
                            <div className="flex flex-col justify-between p-6 rounded-2xl hover:border-purple-500 transition-all duration-300">
                                <p className="text-gray-500">
                                    {tokenuri ? (
                                        <Link to={tokenuri} target="_blank" rel="noopener noreferrer">
                                            # {parseInt(nft.Id, 10)}
                                        </Link>
                                    ) : (
                                        "Loading token URI..."
                                    )}
                                </p>
    
                                <h1 className="text-3xl font-semibold text-white mb-4">{nft.title}</h1>
                                <div className="flex flex-wrap mb-4">
                                    <p className="text-lg text-gray-300 mr-6">
                                        Category:{" "}
                                        <span className="font-medium text-purple-400">
                                            {nft.category}
                                        </span>
                                    </p>
                                    <p className="text-lg text-gray-300">
                                        Owner:{" "}
                                        <span className="font-medium text-purple-400">
                                            {nft.Owner}
                                        </span>
                                    </p>
                                </div>
                                <p className="text-xl text-gray-200 mb-4">
                                    Price:{" "}
                                    <span className="font-semibold text-green-500">
                                        {nft.price} ETH
                                    </span>
                                </p>
                                <p
                                    className={`text-lg mb-4 ${
                                        nft.OnSale ? "text-green-400" : "text-red-400"
                                    }`}
                                >
                                    {nft.OnSale ? "For Sale" : "Not Listed"}
                                </p>
                                <p className="text-sm text-gray-500 mb-6">{nft.description}</p>
                                <p className="text-xs text-gray-400 mb-6">Timestamp: {nft.TimeStamp}</p>
                                
                                {selectedAccount.toLowerCase() !== nft.Owner.toLowerCase() && (
                                <button
                                    className={`w-full py-3 rounded-lg text-white text-xl ${
                                        nft.OnSale
                                            ? "bg-purple-600 hover:bg-purple-700 transform hover:scale-105 transition-all duration-200"
                                            : "bg-gray-500 cursor-not-allowed"
                                    }`}
                                    disabled={!nft.OnSale}
                                    onClick={() => buyToken(nft)}
                                >
                                    {nft.OnSale ? "Buy Now" : "Not Available"}
                                </button> 

                                )}


    
                                {selectedAccount.toLowerCase() === nft.Owner.toLowerCase() && (
                                    <form
                                        className="bg-gray-800 p-4 mt-6 rounded-xl shadow-md"
                                        onSubmit={(e) => {
                                            e.preventDefault(); // Prevent page reload
                                            setNftPrice(parseInt(nft.Id, 10)); // Pass the NFT ID to the function
                                        }}
                                    >
                                        <div className="mb-4">
                                            <label
                                                htmlFor="price"
                                                className="block text-sm font-medium text-gray-300 mb-2"
                                            >
                                                Set Price (ETH)
                                            </label>
                                            <input
                                                type="number"
                                                id="price"
                                                name="price"
                                                value={price}
                                                placeholder="Enter the price"
                                                className="w-full p-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                                onChange={handlePriceChange}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-all duration-300"
                                        >
                                            Set Price
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-300 text-center text-xl">No NFTs found.</p>
                )}
            </div>
        </div>
    </>
    
    
    );
    
};

export default NFTDetails;
