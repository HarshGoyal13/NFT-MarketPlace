import React from 'react';

const About = () => {
  return (
    <div className=" bg-gradient-to-r from-purple-800 to-blue-900 opacity-60">
      {/* Background Gradient */}


      <div className="max-w-5xl mx-auto text-center relative z-10 px-4 py-16">
        {/* Heading */}
        <h2 className="text-5xl font-extrabold text-white mb-6">Welcome to Our NFT Marketplace</h2>


        {/* How It Works Section */}
        <div className='mt-[30px]'>
          <h3 className="text-3xl font-semibold text-white mb-4">How It Works</h3>
          <p className="text-lg text-gray-300 mb-8">
            Our marketplace makes it simple to mint, buy, sell, and earn royalties—all on the Ethereum blockchain. Here's how:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 text-left text-gray-300">
            <div>
              <h4 className="text-xl  font-semibold mb-2">1. Mint NFTs</h4>
              <p>Create unique NFTs with a small minting fee. Once created, they are permanently stored on the blockchain and owned by you.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2">2. Buy NFTs</h4>
              <p>Browse and purchase NFTs securely with ETH. Enjoy seamless transactions with the peace of mind that comes from blockchain security.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2">3. Sell NFTs</h4>
              <p>List your NFTs for sale at your desired price. Receive funds instantly after a successful transaction, minus a small royalty fee.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2">4. Earn Royalties</h4>
              <p>Earn royalties every time your NFT is resold, making it easy to generate ongoing income from your digital creations.</p>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default About;
