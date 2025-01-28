import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import NFTminting from "./pages/NFTminting";
import { useContext, useEffect } from "react";
import { Web3Context } from "./context/Web3Context";
import OwnerNfts from "./pages/OwnerNfts";
import NFTDetails from "./pages/NFTDetails";
import AllNfts from "./pages/AllNfts";
import Footer from "./components/Footer";
import AllTransactions from "./pages/AllTransactions";


function App() {
  const navigate = useNavigate();
  const { selectedAccount } = useContext(Web3Context);

  useEffect(() => {
    if (selectedAccount) {
      navigate("/mint-nft");
    } else {
      navigate("/");
    }
  }, [selectedAccount]);

  return (
    <div className="bg-[#121212] min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center  justify-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mint-nft" element={<NFTminting />} />
          <Route path="/my-nfts" element={<OwnerNfts />} />
          <Route path="/nft-details/:id" element={<NFTDetails />} />
          <Route path="/all-nfts" element={<AllNfts />} />
          <Route path="/Transactions" element={< AllTransactions />} />
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
