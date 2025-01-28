import React, { useContext, useEffect, useState } from 'react';
import { Web3Context } from "../context/Web3Context";
import toast from 'react-hot-toast';
import {ethers} from "ethers"
import Loader from "../components/Loader"

const AllTransactions = () => {
  const { selectedAccount, contractInstance } = useContext(Web3Context);
  const [transaction, setTransaction] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const getAlltransaction = async () => {
    if (!selectedAccount || !contractInstance) {
      console.log("ERROR: TRANSACTIONS");
      return;
    }
    try {
        setLoading(true);
        setMessage("FEtching Transactions..")
      const data = await contractInstance.getAllTransactions();
      const transactions = data.map((transaction) => ({
        Id: parseInt(transaction.transactionId, 10),
        from: transaction.from,
        to: transaction.to,
        nftTitle: transaction.nftTitle,
        transactionPrice: ethers.formatEther(transaction.transactionPrice),
        timestamp: new Date(Number(transaction.timestamp) * 1000).toLocaleString(),
      }));
      setTransaction(transactions);
      setLoading(false);
      setMessage("")
    } catch (error) {
      console.log(error);
      toast.error("ERROR: TRANSACTIONS NOT FOUND");
    }
  };

  useEffect(() => {
    if (selectedAccount && contractInstance) {
      getAlltransaction();
    }
  }, [contractInstance, selectedAccount]);

  return (
<div className="container mx-auto p-8 max-w-full">
    {loading && <Loader message={message}/>}
  <h2 className="text-3xl font-bold text-center text-white mb-6">
  <span className='text-red-500'>ALl</span> <span className='text-purple-500'>Transactions</span> 
  </h2>

  {/* If no transactions are found */}
  {transaction.length === 0 ? (
    <p className="text-center text-gray-400 text-lg">No transactions available.</p>
  ) : (
    <div className="overflow-x-auto rounded-lg shadow-xl custom-scrollbar">
      <table className="min-w-full bg-gray-800 text-white border border-gray-700 rounded-lg">
        <thead className="bg-gradient-to-r from-blue-900 via-purple-900 to-teal-700">
          <tr>
            <th className="py-4 px-6 text-left text-lg">Transaction ID</th>
            <th className="py-4 px-6 text-left text-lg">From</th>
            <th className="py-4 px-6 text-left text-lg">To</th>
            <th className="py-4 px-6 text-left text-lg">NFT Title</th>
            <th className="py-4 px-6 text-left text-lg">Transaction Price</th>
            <th className="py-4 px-6 text-left text-lg">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {transaction.map((tx, index) => (
            <tr key={index} className="hover:bg-gray-700 transition font-semibold duration-300">
              <td className="py-3 px-6 text-yellow-500">#{tx.Id}</td>
              <td className="py-3 px-6">{tx.from}</td>
              <td className="py-3 px-6">{tx.to}</td>
              <td className="py-3 text-green-400 px-6">{tx.nftTitle}</td>
              <td className="py-3 text-red-500 px-6">{tx.transactionPrice} ETH</td>
              <td className="py-3 px-6">{tx.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>




  );
};

export default AllTransactions;
