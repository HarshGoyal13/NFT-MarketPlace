import React, { useState, useContext } from 'react';
import toast from 'react-hot-toast';
import { uploadFileToPinata } from "../utils/Pinata";
import { Web3Context } from "../context/Web3Context";
import Loader from "../components/Loader";
import { ethers } from 'ethers';
import { FiUpload } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const NFTminting = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const { contractInstance } = useContext(Web3Context);
    console.log(contractInstance)
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        description: "",
        FileURI: "",
        price: "",
    });

    const handelChange = (fieldname, e) => {
        setFormData({ ...formData, [fieldname]: e.target.value });
    };

    const handelFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            setLoading(true);
            setMessage("Wait For Image Uploading");
            const ipfsHash = await uploadFileToPinata(file);
            setFormData({ ...formData, FileURI: `https://gateway.pinata.cloud/ipfs/${ipfsHash}` });
            setLoading(false);
            setMessage("");
            toast.success("Image uploaded successfully!");
        } catch (error) {
            setLoading(false);
            console.log(error);
            toast.error("Error in Uploading Image");
        }
    };



    const handelNFTminting = async (e) => {
      e.preventDefault();
      if (!contractInstance) {
          console.log("ERROR: CONTRACT INSTANCE NOT FOUND");
          return;
      }

      if (!formData.title || !formData.category || !formData.description || !formData.price || !formData.FileURI) {
          toast.error("All fields are required!");
          return;
      }
  
      const NFTPrice = ethers.parseEther(formData.price);
  
      try {
          setLoading(true);
          setMessage("Wait for NFT Minting");
        
          const mintingCost = 0.0001;
          const inwei = ethers.parseEther(mintingCost.toString());

          const tx = await contractInstance.mintNFT(
              formData.title,
              formData.category,
              formData.description,
              formData.FileURI,
              NFTPrice,
              {value:inwei}
          );
          await tx.wait(); 

         setFormData({
          title: "",
          category: "",
          description: "",
          FileURI: "",
          price: "",
         })
          navigate('/my-nfts')
          toast.success(`${formData.title} NFT Minted Successfully`);
          setLoading(false);
          setMessage("");
      } catch (error) {
          setLoading(false);
          console.log(error);
          toast.error("Error in NFT Minting");
      }
  };
  
  
    return (

<div className="text-white flex justify-center items-center p-8">
    {loading && <Loader message={message} />}
    <form
        onSubmit={handelNFTminting}
        className="lg:w-[600px] max-w-4xl p-8 bg-[#1a1a1a] rounded-2xl shadow-xl border border-[#323232] space-y-8"
    >
        {/* Title */}
        <div>
            <label htmlFor="title" className="block text-lg font-semibold text-[#a78bfa]">
                Title
            </label>
            <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={(e) => handelChange("title", e)}
                required
                placeholder="Enter NFT Title"
                className="w-full px-4 py-3 mt-2 bg-[#292929] text-white border border-[#8c6dfd] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8c6dfd]"
            />
        </div>

        {/* Category */}
        <div>
            <label htmlFor="category" className="block text-lg font-semibold text-[#a78bfa]">
                Category
            </label>
            <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={(e) => handelChange("category", e)}
                required
                placeholder="e.g., Digital Art, Collectible"
                className="w-full px-4 py-3 mt-2 bg-[#292929] text-white border border-[#8c6dfd] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8c6dfd]"
            />
        </div>

        {/* Description */}
        <div>
            <label htmlFor="description" className="block text-lg font-semibold text-[#a78bfa]">
                Description
            </label>
            <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={(e) => handelChange("description", e)}
                required
                placeholder="Write a short description about your NFT..."
                className="w-full px-4 py-3 mt-2 bg-[#292929] text-white border border-[#8c6dfd] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8c6dfd] resize-none"
                rows="4"
            ></textarea>
        </div>

        {/* File Upload */}
        <div className="flex flex-col items-center">
            <label
                className="w-full flex justify-center items-center border-dashed border-2 border-[#8c6dfd] rounded-lg py-8 px-6 bg-[#292929] hover:bg-[#373737] cursor-pointer transition-all duration-200"
            >
                <FiUpload size={24} className="text-[#8c6dfd] mr-2" />
                <span className="text-sm font-medium text-white">Upload Image</span>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handelFileUpload}
                    className="hidden"
                />
            </label>
            {formData.FileURI && (
                <div className="mt-4 text-center">
                    <p className="text-white text-lg mb-2">Image Preview</p>
                    <img
                        src={formData.FileURI}
                        alt="Uploaded Campaign"
                        className="w-full max-w-[300px] h-auto object-cover rounded-lg shadow-lg"
                    />
                </div>
            )}
        </div>

        {/* Price */}
        <div>
            <label htmlFor="price" className="block text-lg font-semibold text-[#a78bfa]">
                Price (ETH)
            </label>
            <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={(e) => handelChange("price", e)}
                required
                placeholder="Enter Price in ETH"
                className="w-full px-4 py-3 mt-2 bg-[#292929] text-white border border-[#8c6dfd] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8c6dfd]"
            />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
            <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-[#7a5de5] to-[#8c6dfd] text-white font-bold rounded-lg shadow-lg hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-[#8c6dfd]"
            >
                Mint NFT
            </button>
        </div>
    </form>
</div>


    );
}

export default NFTminting;
